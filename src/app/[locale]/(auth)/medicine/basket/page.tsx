/* eslint-disable style/multiline-ternary */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Basket } from '@prisma/client';
import { useLocale, useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import BreadCrumb from '@/components/common/breadcrumb';
// import Message from '@/components/common/Message';
import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import CustomFormField from '@/components/data-tables/CustomForm';
import { DataTable } from '@/components/data-tables/data-table';
import FormView from '@/components/data-tables/FormView';
import TableLoading from '@/components/data-tables/loading';
import { Form } from '@/components/ui/form';
import { baskeType, methods } from '@/constants/drug';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import useDataStore from '@/zustand';

import { columns } from './columns';
import { columnsTH } from './columnsTH';
import { basket_color, basket_floor } from './filters';

const FormSchema = z.object({
  qrCode: z.string().refine(value => value !== '', {
    message: 'QRCODE is required',
  }),
  basket_color: z.string().refine(value => value !== '', {
    message: 'Basket Clolor is required',
  }),
  basket_floor: z.string(),
  basket_status: z.boolean(),
  basket_type: z.string().refine(value => value !== '', {
    message: 'Basket type is required',
  }),
  // cabinet_note: z.string().optional(),
});

const Page = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');

  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);
  const { toastError } = useToasts();
  const breadcrumbItems = [
    { title: t('Basket.basket'), link: '/dashboard/admin/basket' },
  ];

  const getApi = useApi({
    key: ['basket'],
    method: 'GET',
    url: `medicine/basket?page=${page}&q=${q}`,
  })?.get;

  const postApi = useApi({
    key: ['basket'],
    method: 'POST',
    url: `medicine/basket`,
  })?.post;

  const updateApi = useApi({
    key: ['basket'],
    method: 'PUT',
    url: `medicine/basket`,
  })?.put;

  const deleteApi = useApi({
    key: ['basket'],
    method: 'DELETE',
    url: `medicine/basket`,
  })?.deleteObj;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      qrCode: '',
      basket_color: '',
      basket_floor: '2',
      basket_status: true,
      basket_type: '',
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

  const editHandler = (item: Basket) => {
    setId(item.id!);
    setEdit(true);
    form.setValue('qrCode', item?.qrCode as string);
    form.setValue('basket_color', item?.basket_color as string);
    form.setValue('basket_floor', item?.basket_floor!.toString());
    form.setValue('basket_status', item?.basket_status as boolean);
    form.setValue('basket_type', item?.basket_type as string);
    // form.setValue('cabinet_note', item?.cabinet_note || '')
  };

  const deleteHandler = (id: string) => {
    return deleteApi?.mutateAsync(id);
  };

  const label = t('Basket.basket');
  const modal = t('Basket.basket');

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
        name="qrCode"
        label={t('Basket.qr_code')}
        placeholder="QR CODE"
        type="text"
      />
      <CustomFormField
        form={form}
        name="basket_color"
        label={t('Basket.basket_color')}
        placeholder="Basket color"
        fieldType="command"
        data={methods}
      />
      <CustomFormField
        form={form}
        name="basket_floor"
        label={t('Basket.basket_floor')}
        placeholder="Basket floor"
        type="number"
      />
      <CustomFormField
        form={form}
        name="basket_status"
        label={t('Basket.basket_status')}
        placeholder="Basket status"
        fieldType="switch"
      />
      <CustomFormField
        form={form}
        name="basket_type"
        label={t('Basket.basket_type')}
        placeholder="basket type"
        fieldType="command"
        data={baskeType}
      />
      {/* <CustomFormField
        form={form}
        name='cabinet_note'
        label={t('Cabinet.note')}
        placeholder='cabinet_note'
        cols={3}
        rows={3}
      /> */}
    </Form>
  );

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // eslint-disable-next-line ts/no-unused-expressions
    edit
      ? updateApi?.mutateAsync({
        id,
        ...values,
        name: `${values.qrCode} - ${values.basket_color}`,
      })
      : postApi?.mutateAsync(values);
  };

  const cols = locale === 'en' ? columns : columnsTH;
  const filterTitle1 = t('Basket.basket_color') as string;
  const filterTitle2 = t('Basket.basket_floor') as string;

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

      {getApi?.isPending ? (
        <TableLoading />
      ) : getApi?.isError ? (
        // <Message value={getApi?.error} />
        toastError(getApi?.error.message)
      ) : (
        <div className="flex-1 space-y-4 p-4 pt-6">
          <BreadCrumb items={breadcrumbItems} />
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
            filter1="basket_color"
            filterTitle1={filterTitle1}
            option1={basket_color}
            filter2="basket_floor"
            option2={basket_floor}
            filterTitle2={filterTitle2}
            hasAdd
            hasAddp={false}
          />
        </div>
      )}
    </>
  );
};

export default Page;
