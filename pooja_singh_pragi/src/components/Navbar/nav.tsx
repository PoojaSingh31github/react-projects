// components/Navbar.tsx
'use client';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { logout } from '@/store/loginReducer';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="w-full p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">🌐 My Dashboard</h1>
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-2xl font-semibold">Hi, {user?.toUpperCase()}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </Link>
      )}
    </div>
  );
}
