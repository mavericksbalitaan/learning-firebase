import AddDocument from "./components/AddDocument";
import ShowAllDocuments from "./components/ShowAllDocuments";
import ShowAllDocumentsRT from "./components/ShowAllDocumentsRT";
import ShowDocument from "./components/ShowDocument";

export default function Home() {

	return (
		<div className="flex flex-col min-w-[90%] m-auto">
			<h1 className="text-4xl font-bold text-center m-4">Learning Firebase</h1>
			<div className="bg-blue-300 min-h-[150px] mb-4 p-4 border">
				<h1 className="text-2xl font-bold text-center">Get single document</h1>
				<ShowDocument />
			</div>
			<div className="bg-yellow-300 min-h-[150px] mb-4 p-4 border">
				<h1 className="text-2xl font-bold text-center m-4">Add document</h1>
				<AddDocument />
			</div>
			<div className="bg-green-300 min-h-[150px] mb-4 p-4 border">
				<h1 className="text-2xl font-bold text-center m-4">Get multiple documents</h1>
				<ShowAllDocuments />
			</div>
			<div className="bg-green-300 min-h-[150px] mb-4 p-4 border">
				<h1 className="text-2xl font-bold text-center m-4">Real-time list</h1>
				<ShowAllDocumentsRT />
			</div>
		</div>
	);
}
