// import { Resend } from "resend";

import { render } from '@react-email/components';

import { ResetPassword } from '@/emails/ResetPassword';
import { VerifyAccount } from '@/emails/VerifyAccount';
import VerifyEmail from '@/emails/VerifyEmail';

import sendEmail from './email';

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail({
    to: email,
    subject: 'Two Factor Authentication',
    html: render(
      VerifyEmail({
        verificationCode: token,
      }),
      { pretty: true },
    ),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Reset your password',
    html: render(
      ResetPassword({
        clientName: 'TesT',
        osName: 'Linux',
        token,
        company: 'A I Smart Tech',
        ip: '1.1.1.1',
        baseUrl: resetLink,
      }),
      { pretty: true },
    ),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Verify your email.',
    html: render(
      VerifyAccount({
        clientName: 'TesT',
        osName: 'Linux',
        token,
        company: 'A I Smart Tech',
        ip: '1.1.1.1',
        baseUrl: confirmLink,
      }),
      { pretty: true },
    ),
  });
};
