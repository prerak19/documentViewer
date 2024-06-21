import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentMetadata, setDocumentMetadata] = useState(null);

  useEffect(() => {
    // Fetch the list of documents
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents));
  }, []);

  const handleDocumentSelect = (documentName) => {
    setSelectedDocument(documentName);
    // Fetch the document metadata
    fetch(`/api/documents/${documentName}`)
      .then((res) => res.json())
      .then((data) => {
        setDocumentMetadata(data || null)
      });
  };

  return (
    <Layout>
 
    <div className="space-y-8">
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a document</option>
                {documents.map((doc) => (
                  <option key={doc} value={doc}>
                    {doc}
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
              ></iframe>
            </div>
          )}
        </div>
        {documentMetadata && (
          <div className="col-span-10 lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Document Score
                </h3>
                <span className="text-3xl font-bold text-red-500">{documentMetadata.overall_score}</span>
              </div>
              <div className="mt-4 w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${documentMetadata.overall_score}%` }}
                ></div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold">Summary</h3>
                <div className="flex items-center mt-2">
                  <p className="text-gray-600">{documentMetadata.summary}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold">Feedback</h3>
                <div className="flex items-center mt-2">
                  <p className="text-gray-600">{documentMetadata.feedback}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Result Summary</h2>
              <div className="mt-4">
                <div className="flex items-center justify-between py-2">
                  <h3 className="text-md font-medium">Relevance to Critical Technology Areas</h3>
                  <span className="text-md font-bold text-red-500">{documentMetadata.assessment_data.criteria_1.score}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <h3 className="text-md font-medium">Impact and Value</h3>
                  <span className="text-md font-bold text-green-500">{documentMetadata.assessment_data.criteria_2.score}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <h3 className="text-md font-medium">Innovation</h3>
                  <span className="text-md font-bold text-yellow-500">{documentMetadata.assessment_data.criteria_3.score}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <h3 className="text-md font-medium">Connection to U.S DoD Programs</h3>
                  <span className="text-md font-bold text-orange-500">{documentMetadata.assessment_data.criteria_4.score}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {documentMetadata && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Assessment Criteria</h2>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">Criterion</th>
                <th className="text-left">Score</th>
                <th className="text-left">Weightage</th>
                <th className="text-left">Justification</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(documentMetadata.assessment_data).map(
                ([criteria, data], index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{criteria.replace('_', ' ').toUpperCase()}</td>
                    <td className="py-2">{data.score}</td>
                    <td className="py-2">50%</td> {/* Assuming static weightage for now */}
                    <td className="py-2">{data.justification}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </Layout>
  );
}
