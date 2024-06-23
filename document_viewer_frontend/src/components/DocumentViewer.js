import { useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';

export default function DocumentViewer({ documentMetadata: initialDocumentMetadata }) {
	const [documents, setDocuments] = useState([]);
	const [selectedDocument, setSelectedDocument] = useState(initialDocumentMetadata?.name || '');
	const [documentMetadata, setDocumentMetadata] = useState(initialDocumentMetadata || null);
	const [activeTab, setActiveTab] = useState('assessment');
	const [isOpen, setIsOpen] = useState(false);

	const criteriaTabs = [
		{ value: 'assessment', label: 'Assessment' },
		{ value: '/rating', label: 'Rating Scale' },
		{ value: '/document', label: 'Document Properties' },
		{ value: '/comments', label: 'Comments' },
	];

	const getLinkClass = (path) => {
		const isActive = activeTab === path;
		return isActive ? 'border-blue-500 bg-blue-500 text-white' : 'border-transparent text-gray-500 bg-white-200';
	};


	useEffect(() => {
		// Fetch the list of documents
		fetch('http://127.0.0.1:8000/all-documents')
			.then((res) => res.json())
			.then((data) => setDocuments(data));
	}, []);

	const handleDocumentSelect = (documentName) => {
		setSelectedDocument(documentName);

		// Filter the document metadata
		const data = documents.find((doc) => doc.name === documentName);
		setDocumentMetadata(data);
	};

	return (
		<>
			<div className="bg-gray-50 grid grid-cols-1 lg:grid-cols-10 rounded-lg shadow-md">
				<div className="col-span-10 lg:col-span-7 ml-2 mr-4">
					<div className="text-gray-700 mt-5 mb-4 flex items-center space-x-2">
						<span>Hiring UX Designer {`>`}</span>
						<div className="relative inline-block">
							<button
								type="button"
								className="inline-flex items-center font-semibold text-gray-700"
								onClick={() => setIsOpen(!isOpen)}
							>
								{selectedDocument || 'Select a document'}
								<svg
									className="-mr-1 ml-2 h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<select
								onChange={(e) => handleDocumentSelect(e.target.value)}
								value={selectedDocument}
								className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
							>
								<option value="">Select a document</option>
								{documents.map((doc) => (
									<option key={doc.name} value={doc.name}>
										{doc.name}
									</option>
								))}
							</select>
						</div>
					</div>
					{selectedDocument && (
						<div className="bg-white p-6 rounded-lg shadow-md mb-8">
							<iframe
								src={`http://localhost:8000/documents/view/${selectedDocument}`}
								width="100%"
								height="600"
								className="border-0"
								title="Document Preview"
							></iframe>
						</div>
					)}
				</div>
				{documentMetadata && (
					<div className="col-span-10 lg:col-span-3 mt-2 mr-4 ml-2">
						<div className="bg-white p-4 rounded-lg shadow-md mb-4">
							<h3 className="font-bold">Document Score</h3>
							<div className="text-center items-center mt-2">
								<p className="text-5xl font-bold text-red-500">{documentMetadata.overall_score}</p>
								<p className="text-lg text-gray-500 ml-2">of 100</p>
							</div>
							<div className="w-full mt-2 h-4 bg-gray-200 rounded-full overflow-hidden flex">
								<div className="bg-red-500" style={{ width: '10%' }}></div>
								<div className="bg-red-400" style={{ width: '10%' }}></div>
								<div className="bg-orange-500" style={{ width: '10%' }}></div>
								<div className="bg-orange-400" style={{ width: '10%' }}></div>
								<div className="bg-purple-500" style={{ width: '10%' }}></div>
								<div className="bg-purple-400" style={{ width: '10%' }}></div>
								<div className="bg-blue-500" style={{ width: '10%' }}></div>
								<div className="bg-blue-400" style={{ width: '10%' }}></div>
								<div className="bg-teal-500" style={{ width: '10%' }}></div>
								<div className="bg-green-500" style={{ width: '10%' }}></div>
							</div>

							<h3 className="font-bold mt-2 flex items-center justify-between">Summary:
								<FaRegCopy className="w-5 h-5 ml-2 cursor-pointer" />
							</h3>
							<div className="overflow-y-auto max-h-20">
								<div className="flex items-center mt-2">
									<p className="text-gray-600">{documentMetadata.summary}</p>
								</div>
							</div>
							<h3 className="font-bold mt-4 flex items-center justify-between">Feedback:
								<FaRegCopy className="w-5 h-5 ml-2 cursor-pointer" />
							</h3>
							<div className="overflow-y-auto max-h-20">
								<div className="flex items-center mt-2">
									<p className="text-gray-600">{documentMetadata.feedback}</p>
								</div>
							</div>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h2 className="font-bold">Result Summary</h2>
							<div className="mt-2 bg-gray-50">
								<div className="flex items-center justify-between py-2 px-4">
									<h3 className="text-md font-medium">Relevance to Critical Technology Areas</h3>
									<span className="text-md font-bold text-orange-500">{documentMetadata.assessment_criteria.criteria_1.score}</span>
								</div>
								<div className="flex items-center justify-between py-2 px-4">
									<h3 className="text-md font-medium">Impact and Value</h3>
									<span className="text-md font-bold text-green-500">{documentMetadata.assessment_criteria.criteria_2.score}</span>
								</div>
								<div className="flex items-center justify-between py-2 px-4">
									<h3 className="text-md font-medium">Innovation</h3>
									<span className="text-md font-bold text-yellow-500">{documentMetadata.assessment_criteria.criteria_3.score}</span>
								</div>
								<div className="flex items-center justify-between py-2 px-4">
									<h3 className="text-md font-medium">Connection to U.S DoD Programs</h3>
									<span className="text-md font-bold text-red-500">{documentMetadata.assessment_criteria.criteria_4.score}</span>
								</div>
							</div>
							<button className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Download Assessment</button>
						</div>
					</div>
				)}
			</div>
			{documentMetadata && (
				<div className="bg-gray-50 p-6 rounded-lg shadow-md mt-4">
					<div className="flex justify-center">
						{criteriaTabs.map((tab, index) => (
							<button
								key={index}
								className={`py-2 px-4 rounded-md ${getLinkClass(tab.value)}`}
								onClick={() => setActiveTab(tab.value)}
							>
								{tab.label}
							</button>
						))}
					</div>
					{activeTab === 'assessment' && (
						<table className="text-left min-w-full text-sm font-medium mt-5">
							<thead>
								<tr>
									<th className="px-3 py-3">Assessment Criteria</th>
									<th className="px-3 py-3">Score</th>
									<th className="px-3 py-3">Weightage</th>
									<th className="px-3 py-3">Justification</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(documentMetadata.assessment_criteria).map(
									([criteria, data], index) => (
										<tr key={index}>
											<td className="px-3 py-4">{criteria.replace('_', ' ').toUpperCase()}</td>
											<td className="px-3 py-4">
												<span className="inline-flex items-center px-3 py-0.5 rounded-full bg-green-500 text-white">{data.score}</span>
											</td>
											<td className="px-3 py-4">50%</td>
											<td className="px-3 py-4">{data.justification}</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					)}
				</div>
			)}
		</>
	);
}
