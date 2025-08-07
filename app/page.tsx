'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/home/dashboard');
    } else if (status === 'unauthenticated') {
      redirect(''); // Хэрвээ логин хийгээгүй бол логин хуудас руу
    }
  }, [status]);
}
