'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { User as IUser } from '@prisma/client';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Spinner from '@/components/common/Spinner';
import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import CustomFormField from '@/components/data-tables/CustomForm';
import { DataTable } from '@/components/data-tables/data-table-nofilter';
import FormView from '@/components/data-tables/FormView';
import { Form } from '@/components/ui/form';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import useDataStore from '@/zustand';

import { columns } from './columns';

;

const FormSchema = z
  .object({
    name: z.string().refine(value => value !== '', {
      message: 'Name is required',
    }),
    email: z
      .string()
      .email()
      .refine(value => value !== '', {
        message: 'Email is required',
      }),
    roleId: z.string().refine(value => value !== '', {
      message: 'Role is required',
    }),
    confirmed: z.boolean(),
    blocked: z.boolean(),
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

const Page = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');

  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);

  const getApi = useApi({
    key: ['users'],
    method: 'GET',
    url: `admin/users?page=${page}&q=${q}&limit=${limit}`,
  })?.get;

  const postApi = useApi({
    key: ['users'],
    method: 'POST',
    url: `admin/users`,
  })?.post;

  const updateApi = useApi({
    key: ['users'],
    method: 'PUT',
    url: `admin/users`,
  })?.put;

  const deleteApi = useApi({
    key: ['users'],
    method: 'DELETE',
    url: `admin/users`,
  })?.deleteObj;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      roleId: '',
      password: '',
      confirmPassword: '',
      confirmed: false,
      blocked: false,
    },
  });

  useEffect(() => {
    if (postApi?.isSuccess || updateApi?.isSuccess || deleteApi?.isSuccess) {
      getApi?.refetch();
      setDialogOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess, updateApi?.isSuccess, deleteApi?.isSuccess]);

  useEffect(() => {
    getApi?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getApi?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  useEffect(() => {
    if (!q) {
      getApi?.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    getApi?.refetch();
    setPage(1);
  };

  const editHandler = (item: IUser & { role: { id: string } }) => {
    setId(item.id!);
    setEdit(true);
    form.setValue('blocked', Boolean(item?.blocked));
    form.setValue('confirmed', Boolean(item?.confirmed));
    form.setValue('name', item?.name);
    form.setValue('email', item?.email);
    // eslint-disable-next-line ts/no-non-null-asserted-optional-chain
    form.setValue('roleId', item?.role?.id!);
  };

  const deleteHandler = (id: any) => deleteApi?.mutateAsync(id);

  const label = 'User';
  const modal = 'user';

  useEffect(() => {
    if (!dialogOpen) {
      form.reset();
      setEdit(false);
      setId(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  const formFields = (
    <Form {...form}>
      <CustomFormField
        form={form}
        name="name"
        label="Name"
        placeholder="Name"
        type="text"
      />
      <CustomFormField
        form={form}
        name="email"
        label="Email"
        placeholder="Email"
        type="email"
      />
      <CustomFormField
        form={form}
        name="roleId"
        label="Role"
        placeholder="Role"
        fieldType="command"
        data={[]}
        key="roles"
        url="admin/roles?page=1&limit=10"
      />
      <CustomFormField
        form={form}
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
      />
      <CustomFormField
        form={form}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm password"
        type="password"
      />
      <CustomFormField
        form={form}
        name="confirmed"
        label="Confirmed"
        placeholder="Confirmed"
        fieldType="switch"
      />
      <CustomFormField
        form={form}
        name="blocked"
        label="Blocked"
        placeholder="Blocked"
        fieldType="switch"
      />
    </Form>
  );

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // eslint-disable-next-line ts/no-unused-expressions
    edit
      ? updateApi?.mutateAsync({
        id,
        ...values,
      })
      : postApi?.mutateAsync(values);
  };
  const { toastError }: any = useToasts();
  return (
    <>
      {/* {deleteApi?.isSuccess && <Message value={deleteApi?.data?.message} />}
      {deleteApi?.isError && <Message value={deleteApi?.error} />}
      {updateApi?.isSuccess && <Message value={updateApi?.data?.message} />}
      {updateApi?.isError && <Message value={updateApi?.error} />}
      {postApi?.isSuccess && <Message value={postApi?.data?.message} />}
      {postApi?.isError && <Message value={postApi?.error} />} */}

      <TopLoadingBar isFetching={getApi?.isFetching || getApi?.isPending} />

      <FormView
        form={formFields}
        loading={updateApi?.isPending || postApi?.isPending}
        handleSubmit={form.handleSubmit}
        submitHandler={onSubmit}
        label={label}
        edit={edit}
      />

      {getApi?.isPending
        ? (
            <Spinner />
          )
        : getApi?.isError
          ? (
              toastError(getApi?.error)
            )
          : (
              <div className="mt-2 overflow-x-auto bg-white p-3">
                <DataTable
                  data={getApi?.data}
                  columns={columns({
                    editHandler,
                    isPending: deleteApi?.isPending || false,
                    deleteHandler,
                  })}
                  setPage={setPage}
                  // setLimit={setLimit}
                  limit={limit}
                  q={q}
                  setQ={setQ}
                  searchHandler={searchHandler}
                  modal={modal}
                  // caption="Users List"
                />
              </div>
            )}
    </>
  );
};

export default Page;
