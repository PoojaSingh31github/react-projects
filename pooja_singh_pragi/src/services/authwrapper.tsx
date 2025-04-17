// components/AuthWrapper.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  return <>{children}</>;
}
