import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();

  const routes = [
    { path: '/', label: 'Dashboard' },
    { path: '/submissions', label: 'Submissions' },
    { path: '/projectView', label: 'Project View' },
  ];

  const getLinkClass = (path) => {
    const isActive = router.pathname === path || (path !== '/' && router.pathname.startsWith(path));
    return isActive ? 'bg-blue-500 text-white' : 'bg-gray-200';
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
      <h1 className="text-3xl font-bold mb-4 lg:mb-0">Hiring UX Designer</h1>
      <div className="flex space-x-4">
        {routes.map((route) => (
          <Link key={route.path} href={route.path} className={`py-2 px-4 rounded-md ${getLinkClass(route.path)}`}>
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
