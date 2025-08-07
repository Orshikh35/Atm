'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenKey = searchParams.get('tokenKey');
    console.log({tokenKey});
    if (tokenKey) {
      signIn('credentials', {
        tokenKey,
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          router.push('/home/dashboard');
        } else {
          console.error('Login failed:', res);
          setError('Login failed.');
        }
        setLoading(false);
      });
    } else {
      setError('No token key provided.');
      setLoading(false);
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
      </div>
    );
  }
}
