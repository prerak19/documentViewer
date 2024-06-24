import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export default function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 pt-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-white text-lg font-semibold">binoloop</span>
          <span className="text-white mx-2">{`>`}</span>
          <span className="text-white text-lg font-semibold">Tally</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <span className="text-white hover:text-blue-300"> Home </span>
          <span className="text-white hover:text-blue-300"> All Projects </span>
          <span className="bg-white text-blue-600 pt-2 pb-2 px-4 rounded-t-lg"> Project View </span>
        </div>
        <div className="flex items-center">
          <FaUser className="text-white mr-2" />
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center font-semibold text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Prerak
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M4 5h16M4 12h16M4 19h16" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <span className="text-white hover:text-blue-300"> Home </span>
          <span className="text-white hover:text-blue-300"> All Projects </span>
          <span className="bg-white text-blue-600 pt-2 pb-2 px-4 rounded-t-lg"> Project View </span>
        </div>
      )}
    </nav>
  );
}
