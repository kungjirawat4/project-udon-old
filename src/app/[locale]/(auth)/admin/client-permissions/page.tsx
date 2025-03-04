'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@nextui-org/react';
import type { ClientPermission as IClientPermission } from '@prisma/client';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import * as z from 'zod';

import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import CustomFormField from '@/components/data-tables/CustomForm';
import { DataTable } from '@/components/data-tables/data-table';
import FormView from '@/components/data-tables/FormView';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import useDataStore from '@/zustand';

import { columns } from './columns';

const FormSchema = z.object({
  name: z.string().refine(value => value !== '', {
    message: 'Name is required',
  }),
  menu: z.string().refine(value => value !== '', {
    message: 'Menu is required',
  }),
  sort: z.string(),
  path: z.string().refine(value => value !== '', {
    message: 'Path is required',
  }),
  description: z.string().optional(),
});

const Page = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');

  // const path = useAuthorization();
  // const router = useRouter();

  // useEffect(() => {
  //   if (path) {
  //     router.push(path);
  //   }
  // }, [path, router]);

  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);

  const getApi = useApi({
    key: ['client-permissions'],
    method: 'GET',
    url: `admin/client-permissions?page=${page}&q=${q}&limit=${limit}`,
  })?.get;

  const postApi = useApi({
    key: ['client-permissions'],
    method: 'POST',
    url: `admin/client-permissions`,
  })?.post;

  const updateApi = useApi({
    key: ['client-permissions'],
    method: 'PUT',
    url: `admin/client-permissions`,
  })?.put;

  const deleteApi = useApi({
    key: ['client-permissions'],
    method: 'DELETE',
    url: `admin/client-permissions`,
  })?.deleteObj;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      menu: '',
      sort: '',
      path: '',
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

  const editHandler = (item: IClientPermission) => {
    setId(item.id!);
    setEdit(true);
    form.setValue('name', item?.name);
    form.setValue('description', item?.description || '');
    form.setValue('menu', item?.menu);
    form.setValue('path', item?.path);
    form.setValue('sort', item?.sort?.toString());
  };

  const deleteHandler = (id: any) => deleteApi?.mutateAsync(id);

  const label = 'Client Permission';
  const modal = 'clientPermission';

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
        name="menu"
        label="Menu"
        placeholder="Menu"
        type="text"
      />
      <CustomFormField
        form={form}
        name="sort"
        label="Sort"
        placeholder="Sort"
        type="number"
      />
      <CustomFormField
        form={form}
        name="path"
        label="Path"
        placeholder="Path"
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
                  // caption="Client Permissions List"
                />
              </div>
            )}
    </>
  );
};

export default Page;
