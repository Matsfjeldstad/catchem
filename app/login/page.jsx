'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogInForm from './LogInForm';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { checkSession } from '@/utils/auth';

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function checkAndRedirect() {
      const hasSession = await checkSession();
      if (hasSession) {
        router.push('/');
      }
    }
    checkAndRedirect();
  }, [router]);

  return (
    <main className="mx-auto flex h-screen w-full flex-col items-center gap-20 p-10 md:p-6 lg:flex-row">
      <div className="relative hidden h-full w-3/5 overflow-hidden rounded-3xl bg-gray-800 bg-login bg-cover p-8 after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-black/60 lg:block">
        <Link href="/signup">
          <button
            type="button"
            className="relative z-20 rounded-full border-2 px-6 py-2 text-white duration-200"
          >
            Sign up
          </button>
        </Link>
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
          <Image
            src="/catchem-logo.svg"
            height={300}
            width={300}
            alt="catchem-logo"
          />
        </div>
      </div>
      <Image
        src="/logo-dark.svg"
        height={160}
        width={160}
        className="lg:hidden"
        alt="catchem-logo"
      />
      <LogInForm />
    </main>
  );
}
