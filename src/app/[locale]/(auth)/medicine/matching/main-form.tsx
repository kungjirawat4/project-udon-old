/* eslint-disable react-refresh/only-export-components */
/* eslint-disable ts/no-unused-expressions */
/* eslint-disable style/multiline-ternary */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Prescription } from '@prisma/client';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// import Message from '@/components/common/Message';
import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import CustomFormField from '@/components/data-tables/CustomForm';
import { DataTable } from '@/components/data-tables/data-table-nofilter';
import FormView from '@/components/data-tables/FormView';
import TableLoading from '@/components/data-tables/loading';
import { Form } from '@/components/ui/form';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import useDataStore from '@/zustand';

import { columns } from './columns';
import { columnsTH } from './columnsTH';

const FormSchema = z.object({
  hnCode: z
    .string()
    .min(2, {
      message: 'hnCode must be at least 2 characters.',
    })
    .max(30, {
      message: 'hnCode must not be longer than 30 characters.',
    }),
  vnCode: z.string({
    required_error: 'Please select an vnCode to display.',
  }),
  fullName: z.string(),
  queueCode: z.string(),
  basketId: z.string(),
  urgent: z.boolean(),
});

const MainForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');
  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);
  const { toastError } = useToasts();
  const getApi = useApi({
    key: ['prescription'],
    method: 'GET',
    url: `autoload?page=${page}&q=${q}&limit=${limit}`,
  })?.get;

  const postApi = useApi({
    key: ['prescription'],
    method: 'POST',
    url: `autoload`,
  })?.post;

  const updateApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `autoload`,
  })?.put;

  const deleteApi = useApi({
    key: ['autoload'],
    method: 'DELETE',
    url: `autoload`,
  })?.deleteObj;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hnCode: '',
      vnCode: '',
      fullName: '',
      queueCode: '',
      basketId: '',
      urgent: false,
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

  const editHandler = (item: Prescription & { basket: { id: string } }) => {
    setId(item.id!);
    setEdit(true);
    form.setValue('hnCode', item?.hnCode as string);
    form.setValue('vnCode', item?.vnCode as string);
    form.setValue('fullName', item?.full_name as string);
    form.setValue('queueCode', item?.queue_code as string);
    form.setValue('basketId', item?.basket?.id as string);
    form.setValue('urgent', Boolean(item?.urgent));
  };

  const deleteHandler = (id: string) => {
    return deleteApi?.mutateAsync(id);
  };

  const label = t('Prescription.prescription');
  const modal = t('Prescription.prescription');

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
        name="hnCode"
        label={t('Prescription.hn')}
        placeholder="HN Code"
        type="text"
      />

      <CustomFormField
        form={form}
        name="vnCode"
        label={t('Prescription.vn')}
        placeholder="VN Code"
        type="text"
      />
      <CustomFormField
        form={form}
        name="fullName"
        label={t('Prescription.name')}
        placeholder="Name"
        type="text"
      />
      <CustomFormField
        form={form}
        name="queueCode"
        label={t('Prescription.queue')}
        placeholder={t('Prescription.queue')}
        type="text"
      />
      <CustomFormField
        form={form}
        name="queueNum"
        label={t('Prescription.queue_num')}
        placeholder={t('Prescription.queue_num')}
        type="text"
      />
      <CustomFormField
        form={form}
        name="basketId"
        label={t('Prescription.basket')}
        placeholder={t('Prescription.basket')}
        fieldType="command"
        data={[]}
        key="medicine"
        url="medicine/basket?page=1&limit=1000"
      />
      <CustomFormField
        form={form}
        name="urgent"
        label="Urgent"
        placeholder="urgent"
        fieldType="switch"
      />
    </Form>
  );

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    edit
      ? updateApi?.mutateAsync({
        id,
        ...values,
      })
      : postApi?.mutateAsync(values);

    // console.log(id, values);
  };

  const cols = locale === 'en' ? columns : columnsTH;

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
        width="max-w-[70%]"
        colum="grid grid-cols-2 gap-2"
      />

      {getApi?.isPending ? ( // caption='Cabinet List'
        <TableLoading />
      ) : getApi?.isError ? (
        // <Message value={getApi?.error} />
        toastError(getApi?.error.message)
      ) : (
        <div className="flex-1 space-y-4 p-4 pt-6">
          <DataTable
            data={getApi?.data}
            columns={cols({
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
            hasAdd={false}
            hasAddp={false}
          />
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(MainForm), { ssr: false });
