/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Spinner from '@/components/common/Spinner';
import CustomFormField, { FormButton, Upload } from '@/components/data-tables/CustomForm';
import { Form } from '@/components/ui/form';
import { useCurrentUser } from '@/hooks/use-current-user';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';

const Profile = () => {
  const [fileLink, setFileLink] = React.useState<string[]>([]);

  const getApi = useApi({
    key: ['profiles'],
    method: 'GET',
    url: `profile`,
  })?.get;
  const updateApi = useApi({
    key: ['profiles'],
    method: 'PUT',
    url: `profile`,
  })?.put;

  const FormSchema = z
    .object({
      name: z.string(),
      address: z.string(),
      mobile: z.string(),
      bio: z.string(),
      password: z.string().refine(val => val.length === 0 || val.length > 6, {
        message: 'Password can\'t be less than 6 characters',
      }),
      confirmPassword: z
        .string()
        .refine(val => val.length === 0 || val.length > 6, {
          message: 'Confirm password can\'t be less than 6 characters',
        }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Password do not match',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      address: '',
      mobile: '',
      bio: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    updateApi?.mutateAsync({
      ...values,
      id: getApi?.data?.id,
      image: fileLink ? fileLink[0] : getApi?.data?.image,
    });
  }

  useEffect(() => {
    if (updateApi?.isSuccess) {
      getApi?.refetch();
      // const { name, mobile, email, image } = updateApi?.data;
      setFileLink([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateApi?.isSuccess]);

  useEffect(() => {
    form.setValue('name', !getApi?.isPending ? getApi?.data?.name : '');
    form.setValue('address', !getApi?.isPending ? getApi?.data?.address : '');
    form.setValue('mobile', !getApi?.isPending ? getApi?.data?.mobile : '');
    form.setValue('bio', !getApi?.isPending ? getApi?.data?.bio : '');
    setFileLink(!getApi?.isPending ? [getApi?.data?.image] : []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getApi?.isPending, form.setValue]);

  const { toastError, toastSuccess }: any = useToasts();
  const userInfo = useCurrentUser();

  return (
    <div className="mx-auto mt-2 max-w-6xl bg-white p-3">
      {updateApi?.isError && toastError(updateApi?.error)}

      {getApi?.isError && toastError(getApi?.error)}
      {updateApi?.isSuccess && toastSuccess(updateApi?.data?.message)}

      {getApi?.isPending && <Spinner />}

      <div className="mx-auto max-w-4xl">
        <div className="text-center text-3xl uppercase">
          {' '}
          {userInfo?.name}
        </div>
        <div className="mb-10 text-center">
          <div className="mx-auto w-32 rounded-full bg-primary text-white">
            <span>
              {' '}
              {userInfo?.email}
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {getApi?.data?.image && (
              <div className="flex justify-center text-center">
                <div className="w-32">
                  <Image
                    src={getApi?.data?.image}
                    alt="avatar"
                    width={350}
                    height={350}
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-row flex-wrap gap-2">
              <div className="w-full md:w-[48%] lg:w-[32%]">
                <CustomFormField
                  form={form}
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                  type="text"
                />
              </div>
              <div className="w-full md:w-[48%] lg:w-[32%]">
                <CustomFormField
                  form={form}
                  name="address"
                  label="Address"
                  placeholder="Enter address"
                  type="text"
                />
              </div>

              <div className="w-full md:w-[48%] lg:w-[32%]">
                <CustomFormField
                  form={form}
                  name="mobile"
                  label="Mobile"
                  placeholder="Enter mobile"
                  type="text"
                  // step="0.01"
                />
              </div>

              <div className="w-full md:w-[48%] lg:w-[32%]">
                <CustomFormField
                  form={form}
                  name="bio"
                  label="Bio"
                  placeholder="Tell us about yourself"
                  type="text"
                  cols={30}
                  rows={5}
                />
              </div>

              <div className="w-full md:w-[48%] lg:w-[32%]">
                <Upload
                  label="Image"
                  setFileLink={setFileLink}
                  fileLink={fileLink}
                  fileType="image"
                />

                {fileLink.length > 0 && (
                  <div className="avatar mt-2 flex items-end justify-center text-center">
                    <div className="mask mask-squircle w-12">
                      <Image
                        src={(fileLink?.[0] as string) || ''}
                        alt="avatar"
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row flex-wrap justify-start gap-2">
                <div className="w-full">
                  <hr className="my-5" />
                </div>
                <div className="w-full md:w-[48%] lg:w-[32%]">
                  <CustomFormField
                    form={form}
                    name="password"
                    label="Password"
                    placeholder="Leave blank if you don't want to change"
                    type="password"
                  />
                </div>
                <div className="w-full md:w-[48%] lg:w-[32%]">
                  <CustomFormField
                    form={form}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </div>
              </div>
            </div>

            <div className="w-full pt-3 md:w-[48%] lg:w-[32%]">
              <FormButton
                loading={updateApi?.isPending}
                label="Update Profile"
                className="w-full"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
