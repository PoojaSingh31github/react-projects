'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { login, logout } from '@/store/loginReducer';

export default function  LoginLogout() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login('user@example.com'));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow text-center">
      {auth.isAuthenticated ? (
        <>
          <p className="mb-2 text-black">Welcome, {auth.user}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </div>
  );
}
