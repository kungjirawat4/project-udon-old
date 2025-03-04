import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user;
  return user;
};

export const useCurrentRole = () => {
  const session: any = useSession();

  return session.data?.user?.role;
};
