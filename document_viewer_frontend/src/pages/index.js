import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaFilter } from 'react-icons/fa';
import { TbArrowsSort } from 'react-icons/tb';
import { HiOutlineSearch } from 'react-icons/hi';
import NavBar from '@/components/NavBar';

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/all-documents')
      .then((res) => res.json())
      .then((data) => setDocuments(data));
  }, []);

  const getStatusColor = (score) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-blue-500';
    if (score >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };
  return (
    <>
      <NavBar />
      <div className="flex flex-wrap justify-center lg:justify-start space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-initial content-center w-44 from-purple-500 to-blue-500 text-white bg-gradient-to-r p-4 rounded-lg shadow-md text-center">
          <p className="text-lg">Total</p>
          <p className="text-3xl font-bold">200</p>
        </div>
        <div className="bg-white flex-initial content-center w-56 text-gray-500 p-4 rounded-lg shadow-md text-center">
          <p className="text-lg">Percentage Assessed</p>
          <span className="text-3xl font-bold text-blue-500">100%</span>
          <span className="text-sm text-blue-500 ml-2">18/18</span>
        </div>
        <div className="bg-white p-4 content-center rounded-lg shadow-md text-sm font-bold w-full lg:flex-1 text-center">
          <h3 className="text-lg font-normal text-gray-500">Submission Quality</h3>
          <div className="flex">
            <div className="bg-red-100 rounded-l-lg p-2 text-center w-full lg:w-auto">
              <p className="text-red-500 font-semibold">Needs Improvement</p>
              <p className="text-red-500 font-bold text-xl">2</p>
            </div>
            <div className="bg-red-300 p-2 text-center">
              <span className="bg-red-500 w-4 h-4 rounded-full inline-block"></span>
              <p className="text-red-500">15</p>
            </div>
            <div className="bg-orange-300 p-2 text-center">
              <span className="bg-orange-500 w-4 h-4 rounded-full inline-block"></span>
              <p className="text-orange-500">10</p>
            </div>
            <div className="bg-yellow-300 p-2 text-center">
              <span className="bg-yellow-500 w-4 h-4 rounded-full inline-block"></span>
              <p className="text-yellow-500">10</p>
            </div>
            <div className="bg-purple-300 p-2 text-center">
              <span className="bg-purple-500 w-4 h-4 rounded-full inline-block"></span>
              <p className="text-purple-500">10</p>
            </div>
            <div className="bg-indigo-300 p-2 text-center">
              <span className="bg-indigo-500 w-4 h-4 rounded-full inline-block"></span>
              <p className="text-indigo-500">10</p>
            </div>
            <div className="bg-blue-300 p-2 text-center">
              <span className="bg-blue-500 w-4 h-4 rounded-full inline-block"></span>
              <p className="text-blue-500">15</p>
            </div>
            <div className="bg-cyan-300 p-2 text-center">
              <span className="bg-cyan-500 w-4 h-4 rounded-full inline-block"></span>
              <p className="text-cyan-500">15</p>
            </div>
            <div className="bg-green-300 rounded-r-lg p-2 text-center w-full lg:w-28">
              <p className="text-green-500 font-semibold">Excellent</p>
              <p className="text-green-500 font-bold text-xl">10</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full lg:w-52 p-4 content-center text-gray-500 rounded-lg shadow-md text-center">
          <p className="text-lg">Shortlist</p>
          <p className="text-3xl font-bold text-blue-500">20</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 mb-4">
        <div className="bg-white rounded-md flex flex-wrap justify-center sm:justify-start space-x-2 mb-4 sm:mb-0">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">All</button>
          <button className="py-2 px-4">Top 20</button>
          <button className="py-2 px-4">Excellent</button>
          <button className="py-2 px-4">Good</button>
          <button className="py-2 px-4">Satisfactory</button>
          <button className="py-2 px-4">Needs Improvement</button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 text-blue-500 py-2 px-4 bg-white rounded-lg shadow-md">
            <FaFilter className="w-4 h-4" />
            <span className="text-gray-700">Filter</span>
          </button>
          <button className="flex items-center text-blue-500 py-2 px-4 bg-white rounded-lg shadow-md">
            <TbArrowsSort className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 py-2 px-4 bg-white rounded-lg shadow-md border w-full max-w-sm">
            <HiOutlineSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-left text-xs font-medium text-gray-500 uppercase">
          <thead>
            <tr>
              <th className="px-2 py-3">Name</th>
              <th className="px-2 py-3">Submission Time</th>
              <th className="px-2 py-3">Overall Score</th>
              <th className="px-2 py-3">Overall Rating</th>
              <th className="px-2 py-3">RAG Implementation</th>
              <th className="px-2 py-3">Fine Tuning</th>
              <th className="px-2 py-3">MultiModal AI</th>
              <th className="px-2 py-3">Python & Libraries</th>
              <th className="px-2 py-3">AI Modeling</th>
              <th className="px-2 py-3">Analyzing User Data</th>
              <th className="px-2 py-3">Problem Solving</th>
              <th className="px-2 py-3">Teamwork</th>
              <th className="px-2 py-3">Motivation</th>
              <th className="py-3">Add to shortlist</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {documents.map((doc, index) => (
              <tr key={index}>
                <td className="px-2 py-3">
                  <Link href={`/projectView/${doc.name}`} className="text-indigo-600 hover:text-indigo-900">
                    {doc.name}</Link></td>
                <td className="px-2 py-3">{doc.submission_time}</td>
                <td className="px-2 py-3">{doc.overall_score}</td>
                <td className="px-2 py-3">{doc.overall_rating}</td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.rag_implementation_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.fine_tuning_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.multimodal_ai_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.python_and_libraries_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.ai_modeling_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.analyzing_user_data_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.problem_solving_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.teamwork_score)}`}></span>
                </td>
                <td className="px-2 py-3">
                  <span className={`w-4 h-4 rounded-full inline-block ${getStatusColor(doc.assessment_data.motivation_score)}`}></span>
                </td>
                <td className="py-3">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </>
  )
}
