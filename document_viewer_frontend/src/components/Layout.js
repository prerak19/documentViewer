export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Document Viewer</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    );
  }
  