import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

type ResetPasswordProps = {
  company: string;
  token: string;
  clientName: string;
  osName: string;
  ip: string;
  baseUrl?: string;
};

export const ResetPassword = ({
  company,
  token,
  clientName,
  osName,
  ip,
  baseUrl,
}: ResetPasswordProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            primary: 'green',
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Preview>
        Password Reset Request
        {token}
      </Preview>
      <Body className="bg-white">
        <Container className="mx-auto px-3 font-sans">
          <Heading className="my-10 text-2xl font-bold text-black">
            Password Reset Request
          </Heading>

          <Text className="my-6 mb-4 text-gray-700">
            You recently requested to reset your password for your
            {' '}
            {company}
            {' '}
            account. Use the button below to reset it.
            {' '}
            <strong className="font-bold">
              This password reset is only valid for the next 10 minutes.
            </strong>
          </Text>

          <a
            href={baseUrl}
            target="_blank"
            className="cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white no-underline"
          >
            Reset your password
          </a>

          <Text className="mb-5 mt-3 text-gray-400">
            <strong className="font-bold text-gray-900">
              Didn&apos;t request this?
            </strong>

            <br />
            For security, this request was received from

            {ip}

            a

            {osName}

            device
            using

            {clientName}
            . If you did not request a password reset, please
            ignore this email.
          </Text>

          <Img
            height="32"
            src="https://github.com/noppadech.png"
            width="32"
            alt="Notion's Logo"
          />

          <Text className="mb-6 mt-3 text-xs text-gray-400">
            Thanks,
            <br />
            <strong>{company}</strong>
          </Text>

          <br />

          <Text className="mb-6 mt-3 text-xs text-gray-400">
            If you’re having trouble with the button above, copy and paste the
            URL below into your web browser.
            {' '}
            <br />
            <a href={baseUrl}>{baseUrl}</a>
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default ResetPassword;
