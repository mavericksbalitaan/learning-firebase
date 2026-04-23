"use client";

import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase"
import { useEffect, useState } from "react";

export default function ShowAllDocuments() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			const q = await getDocs(collection(db, "test-collection"));
			console.log("q", q.docs)

			if (q) {
				const userData = q.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				console.log(userData);
				setUsers(userData);
			}
		}
		fetchUsers()
	}, [setUsers])

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "test-collection", id))
	}

	return (
		<>
			<table className="text-center border-separate border border-spacing-4">
				<thead>
					<tr>
						<th className="underline min-w-[300px]">Doc ID</th>
						<th className="underline min-w-[300px]">Name</th>
						<th className="underline min-w-[300px]">Age</th>
						<th className="underline min-w-[300px]">Option</th>
					</tr>
				</thead>
				<tbody>
					{users && users.map(el => (
						<tr key={el.id}>
							<td className="min-w-[300px]">{el.id}</td>
							<td className="min-w-[300px]">{el.name}</td>
							<td className="min-w-[300px]">{el.age}</td>
							<td className="min-w-[300px]">
								<button className="bg-red-500 text-white rounded-sm p-1 hover:cursor-pointer hover:text-black" onClick={() => handleDelete(el.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
