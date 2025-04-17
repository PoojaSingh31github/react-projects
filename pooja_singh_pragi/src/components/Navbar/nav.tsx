'use client';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { login, logout } from '@/store/loginReducer';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(user)

  // On component mount, check localStorage for authentication info
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

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
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer">
          Login
        </Link>
      )}
    </div>
  );
}
