'use client';
import { Link } from '@nextui-org/react';
import React, { useEffect } from 'react';

import { useCurrentUser } from '@/hooks/use-current-user';

import Navbars from './navbar';

const MedicineLayout = (props: {
  children: React.ReactNode;

}) => {
  const isLoggedIn = useCurrentUser();

  useEffect(() => {

  }, [isLoggedIn?.id]);
  return (

    <div className="relative flex h-screen flex-col">
      <Navbars />
      <main className="flex flex-1 justify-center overflow-y-auto overflow-x-hidden pt-1">
        {props.children}
      </main>
      <footer className="flex w-full items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://www.facebook.com/people/A-I-SMART-TECH/61559957321400"
          title="AI Smart Tech Fanpage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">A I Smart Tech</p>
        </Link>
      </footer>
    </div>
  );
};

export { MedicineLayout };
