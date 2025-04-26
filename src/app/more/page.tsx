import Link from 'next/link';

export default function More() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">More Options</h1>
      <div className="space-y-6">
        <Link
          href="/"
          className="block text-3xl font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-8 py-5 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Homepage
        </Link>
        <Link
          href="/contact"
          className="block text-3xl font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-8 py-5 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Contact
        </Link>
        <Link
          href="/flights"
          className="block text-3xl font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-8 py-5 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Available Flights
        </Link>
        <Link
          href="/offers"
          className="block text-3xl font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-8 py-5 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Available Hotels
        </Link>
      </div>
    </div>
  );
}
