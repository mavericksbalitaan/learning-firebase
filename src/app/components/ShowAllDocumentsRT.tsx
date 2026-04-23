"use client";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../lib/firebase"
import { useEffect, useState } from "react";

export default function ShowAllDocumentsRT() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "test-collection"), (snapshot) => {
			const userData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}))
			setUsers(userData)
		});

		return () => unsubscribe()
	}, [])

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
