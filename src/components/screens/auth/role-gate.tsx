'use client';

import { useCurrentRole } from '@/hooks/use-current-user';
import type { UserRole } from '@/libs/enum';

import FormError from './form-error';

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role: any = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="Not allowed, you do not have permission to view this content!" />
    );
  }

  return { children };
};

export default RoleGate;
