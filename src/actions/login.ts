'use server';

import { AuthError } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import type * as z from 'zod';

import { signIn } from '@/auth';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/libs/mail';
import { db } from '@/libs/prisma.db';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/libs/tokens';
import { getTwoFactorConfirmationByUserId } from '@/services/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/services/two-factor-token';
import { getUserByEmail } from '@/services/user';
import { LOGIN_DEFAULT_REDIRECT } from '@/utils/AppConfig';
import { LoginSchema } from '@/validations';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string,
) => {
  const t = await getTranslations('Login');
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: t('not_register') };
  }

  if (!existingUser) {
    const verificationToken = await generateVerificationToken(
      existingUser,
    );

    // console.log(verificationToken);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: 'Verification email sent!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: 'Invalid code!' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: 'Code expired!' };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  // console.log('iollll', existingUser);
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || LOGIN_DEFAULT_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: t('invalid') };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
  return null;
};
