'use client';

import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { newVerification } from '@/actions/new-verification';
import Spinner from '@/components/common/Spinner';

import CardWrapper from './card-wrapper';
import FormError from './form-error';
import FormSuccess from './form-success';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams: ReadonlyURLSearchParams | any = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError('Missing token!');
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <Spinner />}
        {!success && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
