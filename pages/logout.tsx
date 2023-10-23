import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

import LoadingDots from '@/components/systems/LoadingDots';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function postLogout() {
      try {
        const session: any = await getSession();
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/logout`, {
          user_id: session?.id,
          token: session?.token,
        });
        if (res.status == 200) {
          signOut({ redirect: true, callbackUrl: '/' });
        }
      } catch (error) {
        console.error(error);
        router.push('/');
      }
    }

    postLogout();
  }, [router]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <LoadingDots medium />
    </div>
  );
}
