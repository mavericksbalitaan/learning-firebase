"use client";

import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ShowDocument() {
	const [obj, setObj] = useState()
	useEffect(() => {
		const sample_doc = async () => {
			const docRef = doc(db, "test-collection", "test-document");
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				setObj(JSON.stringify(docSnap.data()));
			} else {
				console.log("No such document!");
			}
		}

		sample_doc()
	}, [])

	return (
		<div className="text-center m-2">
			{obj ? obj : "No document found."}
		</div>
	)
}
