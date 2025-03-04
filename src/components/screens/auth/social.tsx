'use client';

import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/ui/button';
import { LOGIN_DEFAULT_REDIRECT } from '@/utils/AppConfig';

const Social = () => {
  const searchParams: ReadonlyURLSearchParams | any = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: callbackUrl || LOGIN_DEFAULT_REDIRECT });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('github')}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};

export default Social;
