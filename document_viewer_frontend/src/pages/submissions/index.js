import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Submissions() {
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <label className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer">
            Upload More Data
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <button className="bg-gray-200 py-2 px-4 rounded-md">Search</button>
        </div>
        <div className="flex space-x-4">
          <button className="bg-gray-200 py-2 px-4 rounded-md">Filter</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md">Sort</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md">Select</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md">Delete</button>
        </div>
      </div>
      <p className="mb-4">Upload PDF up to 10MB</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map((doc, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md" onClick={() => router.push(`/projectView/${doc.name}`)}>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-bold ${getStatusColor(doc.overall_rating)}`}>{doc.overall_rating}</span>
              <span className="text-gray-500 text-sm">{doc.submission_time}</span>
            </div>
            <div className="text-center">
              <img src="/pdf-icon.png" alt="PDF" className="mx-auto w-16 h-16 mb-2" />
              <p className="text-gray-700 font-bold">{doc.name}</p>
              <p className="text-gray-500">{doc.status}</p>
            </div>
          </div>
        ))}
      </div>
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
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'Very Poor':
      return 'text-red-500';
    case 'Poor':
      return 'text-red-400';
    case 'Below Average':
      return 'text-yellow-500';
    case 'Average':
      return 'text-yellow-400';
    case 'Above Average':
      return 'text-green-500';
    case 'Good':
      return 'text-green-400';
    case 'Very Good':
      return 'text-blue-500';
    case 'Excellent':
      return 'text-green-600';
    case 'Needs Improvement':
      return 'text-orange-500';
    case 'Fair':
      return 'text-yellow-600';
    default:
      return 'text-gray-500';
  }
}
