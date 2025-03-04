'use server';

import type * as z from 'zod';

import { sendPasswordResetEmail } from '@/libs/mail';
import { generatePasswordResetToken } from '@/libs/tokens';
import { getUserByEmail } from '@/services/user';
import { ResetSchema } from '@/validations';

// import nodemailer from "nodemailer";

// (async () => {
// const credentials = await nodemailer.createTestAccount();
// // eslint-disable-next-line no-console
// console.log(credentials);
// })();

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'User email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  // console.log('Reset', passwordResetToken)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: 'Reset password email sent!' };
};
