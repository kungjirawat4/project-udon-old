'use server';

import { currentRole } from '@/libs/auth';
import { UserRole } from '@/libs/enum';

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN || UserRole.SUPER_ADMIN) {
    return { success: 'Allowed Server Action!' };
  }

  return { error: 'Forbidden Server Action!' };
};
