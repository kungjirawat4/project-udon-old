'use client';

import { Button } from '@nextui-org/react';

import { logout } from '@/actions/logout';

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout} className="cursor-pointer">
      {children}
    </Button>
  );
};

export default LogoutButton;
