/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';

import LoginForm from './login-form';

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto border-none bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={handleLogin} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
