"use client";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../lib/firebase"
import { useEffect, useState } from "react";
import UpdateDocument from "./UpdateDocument";

export default function ShowAllDocumentsRT() {
	const [obj, setObj] = useState(null);
	const [modal, setModal] = useState(false);
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

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "test-collection", id))
	}

	const handleUpdate = (el) => {
		setObj(el);
		setModal(true)
	};

	return (
		<>
			<table className="text-center border border-separate border-spacing-4">
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
								<button className="bg-red-500 text-white rounded-sm p-1 hover:cursor-pointer hover:text-black mr-4" onClick={() => handleDelete(el.id)}>Delete</button>
								<button className="bg-green-500 text-white rounded-sm p-1 hover:cursor-pointer hover:text-black" onClick={() => handleUpdate(el)}>Update</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{modal &&
				(<div>
					<UpdateDocument obj={obj} modal={modal} setModal={setModal} />
				</div>)
			}
		</>
	)
}
