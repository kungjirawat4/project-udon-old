'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { wait } from '@/libs/wait';
import { Button } from '@/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Validation.email_required' })
    .email({ message: 'Validation.email_invalid' }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const t = useTranslations();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsPending(true);
    await wait(1);
    toast.success(`${t('ForgotPassword.success')}: ${values.email}`, {
      closeButton: true,
    });
    setIsPending(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>{t('Common.email')}</FormLabel>
              <FormControl>
                <Input
                  // startIcon={<MailIcon />}
                  // error={!!error?.message}
                  placeholder={t('Common.email')}
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <div className="mt-8">
          <Button disabled={isPending} className="h-12 w-full" type="submit">
            {isPending && (
              <Loader2 className="size-4 animate-spin ltr:mr-2 rtl:ml-2" />
            )}
            {t('Common.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
