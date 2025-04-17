
import Navbar from '@/components/Navbar/nav';
import AuthWrapper from '@/services/authwrapper';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
       <div className="min-h-screen bg-gray-100 flex flex-col items-center space-y-6">
        <Navbar/>
      <h1 className="text-3xl font-bold text-blue-800">📊 Dashboard</h1>
      <AuthWrapper>
      <div className="space-y-4">
        <Link
          href="/weather"
          className="block px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow"
        >
          🌤️ Weather Details
        </Link>
        <Link
          href="/news"
          className="block px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 shadow"
        >
          📰 news Details
        </Link>
        <Link
          href="/stock"
          className="block px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow"
        >
          📈 Stock Market Details
        </Link>
      </div>
      </AuthWrapper>
    </div>
  </div>
  );
}
