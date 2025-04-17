// app/login/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '@/store/loginReducer';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    const userInfo = { name, email };
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(login(name));
    router.push('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) router.push('/');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow space-y-4 w-[300px]">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          className="border px-3 py-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border px-3 py-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border px-3 py-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
