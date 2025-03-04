/* eslint-disable style/multiline-ternary */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from '@nextui-org/react';
import type { Configure } from '@prisma/client';
import { useLocale } from 'next-intl';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import CustomFormField, { Upload } from '@/components/data-tables/CustomForm';
import { DataTable } from '@/components/data-tables/data-table-nofilter';
import FormView from '@/components/data-tables/FormView';
import TableLoading from '@/components/data-tables/loading';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import { Form } from '@/ui/form';
import useDataStore from '@/zustand';

import { columns } from './columns';

const FormSchema = z.object({
  hospitalCode: z.string().refine(value => value !== '', {
    message: 'hospitalCode is required',
  }),
  hospitalInitial: z.string(),
  hospitalNameTh: z.string().refine(value => value !== '', {
    message: 'hospitalNameTh is required',
  }),
  hospitalNameEn: z.string().refine(value => value !== '', {
    message: 'hospitalNameEn is required',
  }),
  hospitalDate: z.coerce.date().transform(value => new Date(value)), // z.coerce.date().transform((value) => new Date(value)),
  // hospitalTime: z.string().time(),
  hospitalQueueDay: z.coerce.number().refine(value => value !== null, {
    message: 'Queue Day type is required',
  }),
  hospitalStation: z.string(),
  hospitalCallMessage: z.string(),
  hospitalMessage: z.string(),
});

const Pages = () => {
  // const t = useTranslations();
  const locale = useLocale();
  const [fileLink, setFileLink] = React.useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');
  const { toastError } = useToasts();

  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);
  const getApi = useApi({
    key: ['configures'],
    method: 'GET',
    url: `medicine/configures?page=${page}&q=${q}&limit=${limit}`,
  })?.get;

  const postApi = useApi({
    key: ['configures'],
    method: 'POST',
    url: `medicine/configures`,
  })?.post;

  const updateApi = useApi({
    key: ['configures'],
    method: 'PUT',
    url: `medicine/configures`,
  })?.put;

  const deleteApi = useApi({
    key: ['configures'],
    method: 'DELETE',
    url: `medicine/configures`,
  })?.deleteObj;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hospitalCode: '',
      hospitalInitial: '',
      hospitalNameTh: '',
      hospitalNameEn: '',
      hospitalDate: new Date(),
      hospitalQueueDay: 1,
      hospitalStation: '',
      hospitalCallMessage: '',
      hospitalMessage: '',
    },
  });

  useEffect(() => {
    if (postApi?.isSuccess || updateApi?.isSuccess || deleteApi?.isSuccess) {
      getApi?.refetch();
      setDialogOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteApi?.isSuccess, postApi?.isSuccess, updateApi?.isSuccess]);

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

  const editHandler = (item: Configure) => {
    setId(item.id!);
    setEdit(true);
    form.setValue('hospitalCode', item?.hospital_code as string);
    form.setValue('hospitalInitial', item?.hospital_initial as string);
    form.setValue('hospitalNameTh', item?.hospital_nameTH as string);
    form.setValue('hospitalNameEn', item?.hospital_nameEN as string);
    form.setValue('hospitalDate', new Date());
    form.setValue('hospitalQueueDay', Number(item?.hospital_queue_day));
    form.setValue('hospitalStation', item?.hospital_station as string);
    form.setValue('hospitalCallMessage', item?.hospital_call_message as string);
    form.setValue('hospitalMessage', item?.hospital_message as string);
    setFileLink(
      !getApi?.isPending ? [getApi?.data?.data[0]?.hospital_logo] : [],
    );

    // form.setValue('hospitalQueueDay', Number(item?.hospital_queue_day));
  };

  const deleteHandler = (id: string) => {
    return deleteApi?.mutateAsync(id);
  };

  const label = 'config';
  const modal = 'config';

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
        name="hospitalCode"
        label=""
        placeholder=""
        type="text"
      />
      <div className="columns-2">
        <Upload
          multiple={false}
          label="Logo"
          setFileLink={setFileLink}
          fileLink={fileLink}
          fileType="image"
          pageType="logo"
        />
        {fileLink.length > 0 && (
          <div className="mt-2 flex justify-center">
            <Image
              src={(fileLink?.[0] as string) || ''}
              alt="Logo"
              width={30}
              height={30}
              style={{ objectFit: 'cover' }}
              // className="rounded-full"
            />
          </div>
        )}
      </div>
      <CustomFormField
        form={form}
        name="hospitalInitial"
        label="hospitalInitial"
        placeholder="hospitalInitial"
        type="text"
      />
      <CustomFormField
        form={form}
        name="hospitalNameTh"
        label="hospitalNameTh"
        placeholder="hospitalNameTh"
        type="text"
      />
      <CustomFormField
        form={form}
        name="hospitalNameEn"
        label="hospitalNameEn"
        placeholder="hospitalNameEn"
        type="text"
      />
      <CustomFormField
        form={form}
        name="hospitalDate"
        label="hospitalDate"
        placeholder="hospitalDate"
        fieldType="date"
      />
      <CustomFormField
        form={form}
        name="hospitalQueueDay"
        label="hospitalQueueDay"
        placeholder="hospitalQueueDay"
        type="number"
      />
      <CustomFormField
        form={form}
        name="hospitalCallMessage"
        label="ข้อความเรียกคิว"
        placeholder="ข้อความเรียกคิว"
        type="text"
      />
      <CustomFormField
        form={form}
        name="hospitalMessage"
        label="ข้อความวิ่ง"
        placeholder="ข้อความวิ่ง"
        type="text"
      />
    </Form>
  );

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // eslint-disable-next-line ts/no-unused-expressions
    edit
      ? updateApi?.mutateAsync({
        id,
        ...values,
        hospitalLogo: fileLink[0] as string,
      })
      : postApi?.mutateAsync(values);
  };

  const cols = locale === 'en' ? columns : columns;

  return (
    <>
      {

      }
      {/* {updateApi?.isSuccess && toast.success('LoggedIn Successful')} */}
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
        colum="grid grid-cols-2 gap-2 text-xs"
      />

      {getApi?.isPending ? (
        <TableLoading />
      ) : getApi?.isError ? (
        // <Message value={getApi?.error} />
        toastError(getApi?.error.message)
      ) : (
        <div className="flex-1 space-y-4 p-4 pt-6">
          {/* <BreadCrumb items={breadcrumbItems} /> */}
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
            hasAddp={false}
            // caption="Basket List"
          />
        </div>
      )}
    </>
  );
};

export default Pages;
