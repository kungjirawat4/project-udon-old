/* eslint-disable style/multiline-ternary */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Prescription } from '@prisma/client';
import { useLocale, useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import CustomFormField from '@/components/data-tables/CustomForm';
import { DataTable } from '@/components/data-tables/data-table-nofilterdrug';
import FormViews from '@/components/data-tables/FormViews';
import TableLoading from '@/components/data-tables/loading';
import { Form } from '@/components/ui/form';
import { delivery, queuetype, status } from '@/constants/drug';
import udhmedApi from '@/hooks/udhApi';
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
  queueNum: z.string(),
  queueType: z.string(),
  queueStatus: z.string(),
  delivery: z.string(),
  medicineTotal: z.coerce.number(),
  medicinePrice: z.coerce.number(),
});

const MainForm = () => {
  const t = useTranslations('Prescription');
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [idEdit, setIdEdit] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');
  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);

  const { toastError } = useToasts();

  const getUdhmedApi = udhmedApi({
    key: ['med-info'],
    method: 'GET',
    url: `udh/drug-info`,
  })?.get;

  const postApi = useApi({
    key: ['med-info'],
    method: 'POST',
    url: `udh/drug-info`,
  })?.post;

  const updateApi = useApi({
    key: ['med-info'],
    method: 'PUT',
    url: `udh/drug-info`,
  })?.put;

  const deleteApi = useApi({
    key: ['med-info'],
    method: 'DELETE',
    url: `udh/drug-info`,
  })?.deleteObj;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hnCode: '',
      vnCode: '',
      fullName: '',
      queueCode: '',
      queueNum: '',
      queueType: '',
      queueStatus: '',
      delivery: '',
      medicineTotal: 0,
      medicinePrice: 0,
    },
  });

  useEffect(() => {
    if (postApi?.isSuccess || updateApi?.isSuccess || deleteApi?.isSuccess) {
      getUdhmedApi?.refetch();
      setDialogOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess, updateApi?.isSuccess, deleteApi?.isSuccess]);

  useEffect(() => {
    getUdhmedApi?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!q) {
      getUdhmedApi?.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    getUdhmedApi?.refetch();
    setQ('');
    setPage(1);
  };

  const editHandler = (item: Prescription) => {
    setId(item.id!);
    setEdit(true);
    form.setValue('hnCode', item?.hnCode as string);
    form.setValue('vnCode', item?.vnCode as string);
    form.setValue('fullName', item?.full_name as string);
    form.setValue('queueCode', item?.queue_code as string);
    form.setValue('queueNum', item?.queue_num as string);
    form.setValue('queueType', item?.queue_type as string);
    form.setValue('queueStatus', item?.prescrip_status as string);
    form.setValue('delivery', item?.delivery as string);
    form.setValue('medicineTotal', Number(item?.medicine_total));
    form.setValue('medicinePrice', Number(item?.medicine_price));
    setIdEdit(item.id!);
  };

  const deleteHandler = (id: string) => {
    return deleteApi?.mutateAsync(id);
  };

  const label = t('prescription');
  const modal = t('prescription');

  useEffect(() => {
    if (!dialogOpen) {
      form.reset();
      setEdit(false);
      setId(null);
      setIdEdit(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  const formFields = (
    <Form {...form}>
      <CustomFormField
        form={form}
        name="hnCode"
        label={t('hn')}
        placeholder={t('hn')}
        type="text"
      />
      <CustomFormField
        form={form}
        name="vnCode"
        label={t('vn')}
        placeholder={t('vn')}
        type="text"
      />
      <CustomFormField
        form={form}
        name="fullName"
        label={t('name')}
        placeholder={t('name')}
        type="text"
      />
      <CustomFormField
        form={form}
        name="queueCode"
        label={t('queue')}
        placeholder={t('queue')}
        type="text"
      />
      <CustomFormField
        form={form}
        name="queueNum"
        label={t('queue_num')}
        placeholder={t('queue_num')}
        type="text"
      />
      <CustomFormField
        form={form}
        name="queueType"
        label={t('queue_type')}
        placeholder={t('queue_type')}
        fieldType="command"
        data={queuetype}
      />
      <CustomFormField
        form={form}
        name="queueStatus"
        label={t('queue_type')}
        placeholder={t('queue_type')}
        fieldType="command"
        data={status}
      />
      <CustomFormField
        form={form}
        name="delivery"
        label={t('delivery')}
        placeholder={t('delivery')}
        fieldType="command"
        data={delivery}
      />
      <CustomFormField
        form={form}
        name="medicineTotal"
        label={t('amount')}
        placeholder={t('amount')}
        type="number"
      />
      <CustomFormField
        form={form}
        name="medicinePrice"
        label={t('service_charge')}
        placeholder={t('service_charge')}
        type="number"
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

    // console.log(id, values);
  };

  const cols = locale === 'en' ? columns : columnsTH;

  // console.log(getUdhApi?.data);
  // useEffect(() => {
  //   fetch(`http://172.16.2.254:8080/udh/med-info`)
  //     .then(res => res.json())
  //     .then((data) => {
  //       console.log('sd', data);
  //     });
  // });
  return (
    <>
      {/* {deleteApi?.isSuccess && <Message value={deleteApi?.data?.message} />}
      {deleteApi?.isError && <Message value={deleteApi?.error} />}
      {updateApi?.isSuccess && <Message value={updateApi?.data?.message} />}
      {updateApi?.isError && <Message value={updateApi?.error} />}
      {postApi?.isSuccess && <Message value={postApi?.data?.message} />}
      {postApi?.isError && <Message value={postApi?.error} />} */}

      <TopLoadingBar isFetching={getUdhmedApi?.isFetching || getUdhmedApi?.isPending} />

      <FormViews
        form={formFields}
        loading={updateApi?.isPending || postApi?.isPending}
        handleSubmit={form.handleSubmit}
        submitHandler={onSubmit}
        label={label}
        edit={edit}
        itemDetail={idEdit}
        width="max-w-[90%]"
        colum="grid grid-cols-4 gap-4 text-xs"
      />

      {getUdhmedApi?.isPending ? (
        <TableLoading />
      ) : getUdhmedApi?.isError ? (
        // <Message value={getApi?.error} />
        toastError(getUdhmedApi?.error.message)
      ) : (
        // <div className="flex-1 space-y-4 p-4 pt-">
        <DataTable
          data={getUdhmedApi?.data}
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
          // filter1="queue_type"
          // filterTitle1={filterTitle1}
          // option1={type_options}
          // filter2="prescrip_status"
          // filterTitle2={filterTitle2}
          // option2={status_options}
          // filter3="delivery"
          // filterTitle3={filterTitle3}
          // option3={delivery_options}
        />
        // </div>
      )}
    </>
  );
};

export default MainForm;
