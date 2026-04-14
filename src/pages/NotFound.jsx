import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <h1 className="text-8xl font-bold text-[#244d3f] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-sm">
        Oops! The page you're looking for doesn't exist. Maybe you took a wrong turn?
      </p>
      <Link
        to="/"
        className="bg-[#244d3f] text-white px-6 py-2.5 rounded-lg hover:bg-[#1a3c2f] transition font-medium"
      >
        Go Home
      </Link>
    </div>
  );
}
