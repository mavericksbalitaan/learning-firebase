"use client";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";

export default function UpdateDocument({ obj, modal, setModal }) {
	const { name, age, id } = obj;
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		const formData = new FormData(e.target);
		// console.log("formData:", formData)
		const data = Object.fromEntries(formData);
		console.log("data:", data);

		// check empty fields
		const isEmpty = Object.values(data).every(el => el.trim() === "");

		if (isEmpty) {
			alert("No empty fields.")
			setLoading(false);
			return;
		}

		try {
			await updateDoc(doc(db, "test-collection", id), data);
			setModal(false);
		} catch (error) {
			console.log(error)
		} finally {
			e.target.reset()
			setLoading(false)
		}
	}

	return (
		<div className="w-screen h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 flex flex-col items-center justify-center">
			<form className="max-w-[700px] bg-white rounded-xl p-4 flex flex-col items-center m-4" onSubmit={handleSubmit}>
				<h1 className="text-xl font-bold text-center">Update Form</h1>
				<div className="flex justify-between m-2 min-w-[275px]">
					<label htmlFor="name">Name:</label>
					<input type="text" name="name" label="name" placeholder="Input new name" defaultValue={name} />
				</div>
				<div className="flex justify-between m-2 min-w-[275px]">
					<label htmlFor="age">Age:</label>
					<input type="text" name="age" label="age" placeholder="Input new age" defaultValue={age} />
				</div>
				<button type="submit" disabled={loading} className="rounded bg-blue-300 hover:cursor-pointer hover:text-white w-[100px]">{loading ? "Pending..." : "Submit"}</button>
			</form>
			<button type="button" className="rounded bg-blue-300 hover:cursor-pointer hover:text-white w-[100px]" onClick={() => setModal(false)}>Close</button>
		</div >
	)
}
