'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Permission as IPermission } from '@prisma/client';
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

const FormSchema = z.object({
  name: z.string().refine(value => value !== '', {
    message: 'Name is required',
  }),
  method: z.string().refine(value => value !== '', {
    message: 'Method is required',
  }),
  route: z.string().refine(value => value !== '', {
    message: 'Route is required',
  }),
  description: z.string().optional(),
});

const Page = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');

  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);

  const getApi = useApi({
    key: ['permissions'],
    method: 'GET',
    url: `admin/permissions?page=${page}&q=${q}&limit=${limit}`,
  })?.get;

  const postApi = useApi({
    key: ['permissions'],
    method: 'POST',
    url: `admin/permissions`,
  })?.post;

  const updateApi = useApi({
    key: ['permissions'],
    method: 'PUT',
    url: `admin/permissions`,
  })?.put;

  const deleteApi = useApi({
    key: ['permissions'],
    method: 'DELETE',
    url: `admin/permissions`,
  })?.deleteObj;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      method: '',
      route: '',
      description: '',
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

  const editHandler = (item: IPermission) => {
    setId(item.id!);
    setEdit(true);

    form.setValue('name', item?.name);
    form.setValue('description', item?.description || '');
    form.setValue('method', item?.method);
    form.setValue('route', item?.route);
  };

  const deleteHandler = (id: any) => deleteApi?.mutateAsync(id);

  const label = 'Permission';
  const modal = 'permission';

  useEffect(() => {
    if (!dialogOpen) {
      form.reset();
      setEdit(false);
      setId(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  const methods = [
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'DELETE', value: 'DELETE' },
  ];

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
        name="method"
        label="Method"
        placeholder="Method"
        fieldType="command"
        data={methods}
      />
      <CustomFormField
        form={form}
        name="route"
        label="Route"
        placeholder="Route"
        type="text"
      />
      <CustomFormField
        form={form}
        name="description"
        label="Description"
        placeholder="Description"
        cols={3}
        rows={3}
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
                  // caption="Permissions List"
                />
              </div>
            )}
    </>
  );
};

export default Page;
