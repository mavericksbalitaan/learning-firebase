"use client";

import { getDocs, collection } from "firebase/firestore";
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

	return (
		<>
			<table className="text-center">
				<thead>
					<tr>
						<th className="underline min-w-[300px]">Doc ID</th>
						<th className="underline min-w-[300px]">Name</th>
						<th className="underline min-w-[300px]">Age</th>
					</tr>
				</thead>
				<tbody>
					{users && users.map(el => (
						<tr key={el.id}>
							<td className="min-w-[300px]">{el.id}</td>
							<td className="min-w-[300px]">{el.name}</td>
							<td className="min-w-[300px]">{el.age}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
