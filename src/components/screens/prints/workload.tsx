'use client';

// import { useRouter } from 'next/navigation';
import React from 'react';

// import { useIsClient } from '@/hooks/use-is-client';
// import useAuthorization from '@/hooks/useAuthorization';
import { socketClient } from '@/services/sockio';

// import useUserInfoStore from '@/zustand/userStore';
import { RecentUserTop } from '../dashboard/recent-user-top';
import Navbars from './navbar';

export default function WorkloadView() {
  // const isClient = useIsClient();
  // const path = useAuthorization();
  // const router = useRouter();

  // const [config, setConfig] = React.useState('');
  // const [dashboard, setDashboard] = React.useState<any>([]);
  const [session, setSession] = React.useState<any>([]);
  const [todate, setTodate] = React.useState('');

  // const { userInfo } = useUserInfoStore(state => state);
  React.useEffect(() => {
    socketClient.on('todate', (arg: React.SetStateAction<string>) => {
      setTodate(arg); // arg คือ data ที่มาจาก Server
    });

    socketClient.on('users', (arg) => {
      setSession(arg.session); // arg คือ data ที่มาจาก Server
    });

    return () => {
      socketClient.off('today');
      socketClient.off('users');
      socketClient.disconnect();
    };
  }, []);

  return (
    // eslint-disable-next-line react/no-useless-fragment
    <>
      <div className="m-2 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white p-8 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none">
        <Navbars />
        <div className="hidden items-center space-x-2 md:flex">
          <div suppressHydrationWarning>
            {todate}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 text-xs">
          <RecentUserTop data={session} />
        </div>
      </div>
    </>
  );
}
