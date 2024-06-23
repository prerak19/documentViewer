import { useEffect, useState } from 'react';

export default function DocumentViewer({ documentMetadata: initialDocumentMetadata }) {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(initialDocumentMetadata?.name || '');
  const [documentMetadata, setDocumentMetadata] = useState(initialDocumentMetadata || null);
  const [activeTab, setActiveTab] = useState('assessment');

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
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="col-span-10 lg:col-span-7">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Select a document
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Use the dropdown below to select a document and view its assessment details.
              </p>
            </div>
            <div className="mt-5">
              <select
                onChange={(e) => handleDocumentSelect(e.target.value)}
                value={selectedDocument}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
          <div className="col-span-10 lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-900">Document Score</h3>
              <div className="flex items-center mt-4">
                <span className="text-5xl font-bold text-red-500">{documentMetadata.overall_score}</span>
                <span className="text-lg text-gray-500 ml-2">of 100</span>
              </div>
              <div className="w-full mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: `${documentMetadata.overall_score}%` }}></div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900">Summary</h3>
                <div className="flex items-center mt-2">
                  <p className="text-gray-600">{documentMetadata.summary}</p>
                  {/* <ClipboardCopyIcon className="w-5 h-5 ml-2 text-gray-400 cursor-pointer" /> */}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900">Feedback</h3>
                <div className="flex items-center mt-2">
                  <p className="text-gray-600">{documentMetadata.feedback}</p>
                  {/* <ClipboardCopyIcon className="w-5 h-5 ml-2 text-gray-400 cursor-pointer" /> */}
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900">Result Summary</h2>
              <div className="mt-4">
                <div className="flex items-center justify-between py-2 bg-gray-50 px-4 rounded-md">
                  <h3 className="text-md font-medium">Relevance to Critical Technology Areas</h3>
                  <span className="text-md font-bold text-orange-500">{documentMetadata.assessment_criteria.criteria_1.score}</span>
                </div>
                <div className="flex items-center justify-between py-2 bg-gray-50 px-4 rounded-md">
                  <h3 className="text-md font-medium">Impact and Value</h3>
                  <span className="text-md font-bold text-green-500">{documentMetadata.assessment_criteria.criteria_2.score}</span>
                </div>
                <div className="flex items-center justify-between py-2 bg-gray-50 px-4 rounded-md">
                  <h3 className="text-md font-medium">Innovation</h3>
                  <span className="text-md font-bold text-yellow-500">{documentMetadata.assessment_criteria.criteria_3.score}</span>
                </div>
                <div className="flex items-center justify-between py-2 bg-gray-50 px-4 rounded-md">
                  <h3 className="text-md font-medium">Connection to U.S DoD Programs</h3>
                  <span className="text-md font-bold text-red-500">{documentMetadata.assessment_criteria.criteria_4.score}</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Download Assessment</button>
            </div>
          </div>
        )}
      </div>
      {documentMetadata && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex border-b overflow-x-auto">
            <button
              className={`py-2 px-4 ${activeTab === 'assessment' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'} hover:text-gray-700 whitespace-nowrap text-sm font-medium`}
              onClick={() => setActiveTab('assessment')}
            >
              Assessment
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'rating' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'} hover:text-gray-700 whitespace-nowrap text-sm font-medium`}
              onClick={() => setActiveTab('rating')}
            >
              Rating Scale
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'document' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'} hover:text-gray-700 whitespace-nowrap text-sm font-medium`}
              onClick={() => setActiveTab('document')}
            >
              Document Properties
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'comments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'} hover:text-gray-700 whitespace-nowrap text-sm font-medium`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>
          {activeTab === 'assessment' && (
            <table className="w-full mt-4">
              <thead>
                <tr className='text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <th className="px-2">Assessment Criteria</th>
                  <th className="px-2">Score</th>
                  <th className="px-2">Weightage</th>
                  <th className="px-2">Justification</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(documentMetadata.assessment_criteria).map(
                  ([criteria, data], index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 text-sm font-medium text-gray-900">{criteria.replace('_', ' ').toUpperCase()}</td>
                      <td className="py-2">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">{data.score}</span>
                      </td>
                      <td className="py-2">50%</td> 
                      <td className="py-2">{data.justification}</td>
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
