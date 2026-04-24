"use client";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { nanoid } from "nanoid";
import { useState } from "react";

const id = nanoid(4);

export default function AddDocument() {
	const [loading, setLoading] = useState(false);

	// add a new document in collection "test-collection"
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		const formData = new FormData(e.target);
		// console.log("formData:", formData)
		const data = Object.fromEntries(formData);
		// console.log("data:", data);

		// check empty fields
		const isEmpty = Object.values(data).every(el => el.trim() === "");

		if (isEmpty) {
			alert("No empty fields.")
			setLoading(false);
			return;
		}

		try {
			await setDoc(doc(db, "test-collection", id), data);
		} catch (error) {
			console.log(error)
		} finally {
			e.target.reset()
			setLoading(false)
		}
	}
	return (
		<div className="flex items-center flex-col">
			<form className="max-w-[700px] bg-white rounded-xl p-4 flex flex-col items-center" onSubmit={handleSubmit}>
				<h1 className="text-xl font-bold text-center">Form</h1>
				<div className="flex justify-between m-2 min-w-[275px]">
					<label htmlFor="name">Name:</label>
					<input type="text" name="name" label="name" placeholder="Input name" />
				</div>
				<div className="flex justify-between m-2 min-w-[275px]">
					<label htmlFor="age">Age:</label>
					<input type="text" name="age" label="age" placeholder="Input age" />
				</div>
				<button type="submit" disabled={loading} className="rounded bg-blue-300 hover:cursor-pointer w-[100px]">{loading ? "Pending..." : "Submit"}</button>
			</form>
		</div>
	)


}
