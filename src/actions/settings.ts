'use server';

import bcrypt from 'bcryptjs';
import type * as z from 'zod';

import { unstable_update } from '@/auth';
import { currentUser } from '@/libs/auth';
import { sendVerificationEmail } from '@/libs/mail';
import { db } from '@/libs/prisma.db';
import { generateVerificationToken } from '@/libs/tokens';
import { getUserByEmail, getUserById } from '@/services/user';
import type { SettingsSchema } from '@/validations';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user: any = await currentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    // console.log(verificationToken)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: 'Verification email sent!' };
  }

  if (values.password && values.newPassword && dbUser.user?.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.user.password,
    );

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
    values.newPasswordConfirmation = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.user?.id },
    data: {
      email: values.email,
      password: values.password,
      name: values.name,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
      roleId: values.role,
    },
  });

  // Update session
  await unstable_update({ user: { ...updatedUser } });
  return { success: 'Settings Updated!' };
};
