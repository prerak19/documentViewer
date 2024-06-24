import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CiGrid41 } from "react-icons/ci";
import { BiSolidFilePdf } from "react-icons/bi";
import { TbArrowsSort } from 'react-icons/tb';
import { FaListUl, FaMousePointer, FaTrashAlt, FaSearch, FaUpload } from 'react-icons/fa';
import NavBar from '@/components/NavBar';

export default function Submissions() {
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [view, setView] = useState('grid');

  useEffect(() => {
    fetch('http://localhost:8000/all-documents')
      .then((res) => res.json())
      .then((data) => setDocuments(data));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handleFileUpload(e.target.files[0]);
  };

  const handleFileUpload = async (currentFile) => {
    const formData = new FormData();
    formData.append('file', currentFile);

    const res = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);
      setFile(null);
      fetch('http://localhost:8000/all-documents')
        .then((res) => res.json())
        .then((data) => setDocuments(data));
    } else {
      alert('File upload failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Very Poor':
        return 'text-red-500';
      case 'Poor':
        return 'text-red-400';
      case 'Needs Improvement':
        return 'text-yellow-400';
      case 'Fair':
        return 'text-yellow-500';
      case 'Good':
        return 'text-blue-400';
      case 'Very Good':
        return 'text-blue-500';
      case 'Above Average':
        return 'text-purple-400';
      case 'Excellent':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className='bg-gray-50 py-6 sm:px-6 lg:px-8 rounded-md'>
      <NavBar />
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <label className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer flex items-center justify-center sm:justify-start">
              <FaUpload className="mr-2" />
              Upload More Data
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
            <button className="bg-white py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center sm:justify-start">
              <FaSearch />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
            <button
              className={`bg-white py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center sm:justify-start ${view === 'grid' ? 'bg-blue-100' : ''}`}
              onClick={() => setView('grid')}
            >
              <CiGrid41 />
            </button>
            <button
              className={`bg-white py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center sm:justify-start ${view === 'list' ? 'bg-blue-100' : ''}`}
              onClick={() => setView('list')}
            >
              <FaListUl />
            </button>
            <button className="bg-white py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center sm:justify-start">
              <TbArrowsSort />
            </button>
            <button className="bg-white py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center sm:justify-start">
              <FaMousePointer className="mr-2" />
              Select
            </button>
            <button className="bg-white py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center sm:justify-start">
              <FaTrashAlt />
            </button>
          </div>
        </div>
        <p className="mb-4 text-center sm:text-left">Upload PDF up to 10MB</p>
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => router.push(`/projectView/${doc.name}`)}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-bold ${getStatusColor(doc.overall_rating)}`}>{doc.overall_rating}</span>
                  <span className="text-gray-500 text-sm">{doc.submission_time}</span>
                </div>
                <div className="text-center">
                  <BiSolidFilePdf className="mx-auto w-16 h-16 mb-2" />
                  <p className="text-gray-700 font-bold">{doc.name}</p>
                  <p className="text-gray-500">{doc.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc, index) => (
                  <tr key={index} onClick={() => router.push(`/projectView/${doc.name}`)} className="cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <BiSolidFilePdf className="w-6 h-6 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">Purvija Deshmukh</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{doc.submission_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{doc.status}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.overall_rating)}`}>
                        {doc.overall_rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <button className="bg-gray-200 py-2 px-4 rounded-md">Prev</button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">1</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">2</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">3</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">...</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">10</button>
            <button className="bg-gray-200 py-2 px-4 rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
