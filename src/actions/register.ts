'use server';

import bcrypt from 'bcryptjs';
import type * as z from 'zod';

import { sendVerificationEmail } from '@/libs/mail';
import { db } from '@/libs/prisma.db';
import { generateVerificationToken } from '@/libs/tokens';
import { getUserByEmail } from '@/services/user';
import { RegisterSchema } from '@/validations';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { name, password, email } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'User email already exists.' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Successfully registered. Verify your email!' };
};
