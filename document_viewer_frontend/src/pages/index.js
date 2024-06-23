import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/all-documents')
      .then((res) => res.json())
      .then((data) => setDocuments(data));
  }, []);
console.log(documents);
  return (
    <>
      <div className="flex flex-row flex-wrap gap-y-9 ">
        <div className="flex-initial w-44 flex-wrap from-purple-500 to-blue-500 text-white bg-gradient-to-r p-4 rounded-lg shadow-md text-center mr-4">
          <p className="text-lg">Total</p>
          <p className="text-3xl font-bold">200</p>
        </div>
        <div className="flex-initial w-64 bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-md text-center mr-4">
          <p className="text-lg">Percentage Assessed</p>
          <p className="text-3xl font-bold">100%</p>
          <p className="text-sm">18/18</p>
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-center mr-4">
          <p className="text-lg">Submission Quality</p>
          <div className="flex justify-center space-x-1 mt-2">
            <span className="bg-red-500 text-xs font-bold py-1 px-2 rounded-full text-white">2</span>
            <span className="bg-orange-500 text-xs font-bold py-1 px-2 rounded-full text-white">10</span>
            <span className="bg-yellow-500 text-xs font-bold py-1 px-2 rounded-full text-white">10</span>
            <span className="bg-green-500 text-xs font-bold py-1 px-2 rounded-full text-white">15</span>
            <span className="bg-blue-500 text-xs font-bold py-1 px-2 rounded-full text-white">15</span>
          </div>
        </div>
        <div className="w-48 p-4 rounded-lg shadow-md text-center">
          <p className="text-lg">Shortlist</p>
          <p className="text-3xl font-bold">20</p>
        </div>

      </div>
      <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap justify-between items-center mb-4 space-y-4 md:space-y-0">
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">All</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">Top 20</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">Excellent</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">Good</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">Satisfactory</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">Needs Improvement</button>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gray-200 py-2 px-4 rounded-md">Filter</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">Search</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
            <thead>
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Submission Time</th>
                <th className="px-6 py-3">Overall Score</th>
                <th className="px-6 py-3">Overall Rating</th>
                <th className="px-6 py-3">RAG Implementation</th>
                <th className="px-6 py-3">Fine Tuning</th>
                <th className="px-6 py-3">MultiModal AI</th>
                <th className="px-6 py-3">Python & Libraries</th>
                <th className="px-6 py-3">AI Modeling</th>
                <th className="px-6 py-3">Analyzing User Data</th>
                <th className="px-6 py-3">Problem Solving</th>
                <th className="px-6 py-3">Teamwork</th>
                <th className="px-6 py-3">Motivation</th>
                <th className="px-6 py-3">Add to shortlist</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 ">
                    <Link href={`/projectView/${doc.name}`} className="text-indigo-600 hover:text-indigo-900">
                      {doc.name}</Link></td>
                  <td className="px-6 py-4 ">{doc.submission_time}</td>
                  <td className="px-6 py-4 ">{doc.overall_score}</td>
                  <td className="px-6 py-4 ">{doc.overall_rating}</td>
                  <td className="px-6 py-4 ">
                    <span className="bg-blue-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-green-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-orange-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-blue-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-green-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-red-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-blue-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-green-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="bg-blue-500 w-4 h-4 rounded-full inline-block"></span>
                  </td>
                  <td className="px-6 py-4 ">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
