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
import { DataTable } from '@/components/data-tables/data-table';
import FormViews from '@/components/data-tables/FormViews';
import TableLoading from '@/components/data-tables/loading';
import { Form } from '@/components/ui/form';
import { delivery, queuetype, status } from '@/constants/drug';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import useDataStore from '@/zustand';

import { columns } from './columns';
import { columnsTH } from './columnsTH';
import { delivery_options, status_options, type_options } from './filters';

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
  urgent: z.coerce.boolean(),
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
  const [matchingData, setMatchingData] = useState<any>(null); // กำหนด state สำหรับ matchingData
  const { toastError, toastWarning } = useToasts();

  const getApi = useApi({
    key: ['prescription'],
    method: 'GET',
    url: `medicine/prescription/screening?page=${page}&q=${q}`,
  })?.get;
  // const getmedudhApi = useApi({
  //   key: ['udh-med'],
  //   method: 'GET',
  //   url: `medicine/udh-med`,
  // })?.get;

  const postApi = useApi({
    key: ['prescription'],
    method: 'POST',
    url: `medicine/prescription`,
  })?.post;

  const updateApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `medicine/prescription`,
  })?.put;

  const deleteApi = useApi({
    key: ['prescription'],
    method: 'DELETE',
    url: `medicine/prescription`,
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
      urgent: false,
    },
  });

  useEffect(() => {
    if (postApi?.isSuccess || updateApi?.isSuccess || deleteApi?.isSuccess) {
      getApi?.refetch();
      // getmedudhApi?.refetch();
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
  // let interval: any;
  // const allowedPrivateIp = '172.16.2.110';
  // // const allowedPrivateIp = '172.16.2.223';
  // useEffect(() => {
  //   const getPrivateIp = async () => {
  //     const pc = new RTCPeerConnection({ iceServers: [] });

  //     // สร้าง Data Channel เพื่อเริ่มการเชื่อมต่อ
  //     pc.createDataChannel('');

  //     // สร้าง ICE Candidate เพื่อดึงข้อมูล IP
  //     pc.createOffer()
  //       .then(offer => pc.setLocalDescription(offer))
  //       .catch(err => console.error('Error creating offer: ', err));

  //     // ฟังการเปลี่ยนแปลง ICE Candidate
  //     pc.onicecandidate = (event) => {
  //       if (event.candidate) {
  //         const candidate = event.candidate.candidate;
  //         const ipMatch = /(?:\d{1,3}\.){3}\d{1,3}/.exec(candidate);
  //         if (ipMatch) {
  //           const privateIp = ipMatch[0];
  //           if (privateIp === allowedPrivateIp) {
  //             // eslint-disable-next-line react-hooks/exhaustive-deps
  //             interval = setInterval(() => {
  //               // getApi?.refetch();
  //               getmedudhApi?.refetch();
  //             }, 30000);
  //           } else {
  //             // ถ้า IP ไม่ตรงกับที่อนุญาต ให้หยุด setInterval
  //             clearInterval(interval);
  //           }
  //         }
  //       }
  //     };
  //   };

  //   getPrivateIp();
  // }, [getApi, getmedudhApi]);
  // let interval: any;
  // useEffect(() => {
  //   // Implementing the setInterval method
  //   const allowedIp = '172.16.2.254';
  //   const currentIp = window.location.hostname;
  //   // console.log(currentIp);
  //   if (currentIp === allowedIp) {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     interval = setInterval(() => {
  //       getmedudhApi?.refetch();
  //     }, 30000);
  //   }
  //   // Clearing the interval
  //   return () => clearInterval(interval);
  // }, [getmedudhApi]);

  const check = getApi?.data;
  const dataArray = Array.isArray(check?.data) ? check.data : [];
  // console.log('Data Array:', dataArray);
  const findMatchingData = (query: string, data: any[]) => {
    const searchInObject = (obj: any): boolean => {
      return Object.values(obj).some((value) => {
        if (typeof value === 'string') {
          return value === query; // ใช้ === เพื่อให้ตรงกันทั้งหมด
        }
        if (typeof value === 'object' && value !== null) {
          return searchInObject(value); // ค้นหาใน object ที่ซ้อนกัน
        }
        return false;
      });
    };

    return data.filter(item => searchInObject(item));
  };
  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!q || q.length < 2) {
      toastWarning('กรุณากรอกข้อมูล');
      setQ('');
      return;
    }
    // ค้นหาข้อมูลที่ตรงกับ q
    const matchingDatam = findMatchingData(q, dataArray);
    if (matchingDatam.length > 0
    ) {
      if (matchingDatam[0]) {
        setDialogOpen(true);
        setMatchingData({ ...matchingDatam[0] }); // ทำการคัดลอกข้อมูลใหม่
      } else {
        // alert('ไม่พบข้อมูล');
        toastWarning('ไม่พบข้อมูล');
      }
    } else {
      // console.log('No matching data found.');
      toastWarning('ไม่พบข้อมูล');
    }
    setQ('');
    getApi?.refetch();
    setPage(1);
    // console.log('qqq', q);
  };
  useEffect(() => {
    if (matchingData) {
      setId(matchingData.id!);
      setEdit(true);

      // form.reset(matchingData); // หรือ setValue ถ้าต้องการ
      form.setValue('hnCode', matchingData?.hnCode as string);
      // form.setValue('vnCode', matchingData?.vnCode as string);
      form.setValue('fullName', matchingData?.full_name as string);
      form.setValue('queueCode', matchingData?.queue_code as string);
      form.setValue('queueNum', matchingData?.queue_num as string);
      form.setValue('queueType', matchingData?.queue_type as string || '');
      form.setValue('queueStatus', matchingData?.prescrip_status as string);
      form.setValue('delivery', matchingData?.delivery as string);
      // form.setValue('medicineTotal', Number(matchingData?.medicine_total));
      // form.setValue('medicinePrice', Number(matchingData?.medicine_price));
      form.setValue('urgent', Boolean(matchingData?.urgent));
      setIdEdit(matchingData.id!);
      // console.log('Form after update:', form.getValues()); // ตรวจสอบค่าในฟอร์มหลังอัปเดต
    }
  }, [matchingData, form]);
  // const searchHandler = (e: FormEvent) => {
  //   e.preventDefault();
  //   getApi?.refetch();
  //   setQ('');
  //   setPage(1);
  // };

  const editHandler = (item: Prescription) => {
    setId(item.id!);
    setEdit(true);
    form.setValue('hnCode', item?.hnCode as string);
    // form.setValue('vnCode', item?.vnCode as string);
    form.setValue('fullName', item?.full_name as string);
    form.setValue('queueCode', item?.queue_code as string);
    form.setValue('queueNum', item?.queue_num as string);
    form.setValue('queueType', item?.queue_type as string || '');
    form.setValue('queueStatus', item?.prescrip_status as string);
    form.setValue('delivery', item?.delivery as string);
    // form.setValue('medicineTotal', Number(item?.medicine_total));
    // form.setValue('medicinePrice', Number(item?.medicine_price));
    form.setValue('urgent', Boolean(item?.urgent));
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

  const filterTitle2 = t('status') as string;
  const filterTitle1 = t('queue_type') as string;
  const filterTitle3 = t('delivery') as string;

  const formFields = (
    <Form {...form}>
      <CustomFormField
        form={form}
        name="hnCode"
        label={t('hn')}
        placeholder={t('hn')}
        type="text"
      />
      {/* <CustomFormField
        form={form}
        name="vnCode"
        label={t('vn')}
        placeholder={t('vn')}
        type="text"
      /> */}
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
        label={t('status')}
        placeholder={t('status')}
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
      {/* <CustomFormField
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
      /> */}
      <CustomFormField
        form={form}
        name="urgent"
        label={t('urgent')}
        placeholder={t('urgent')}
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

    // console.log(id, values);
  };

  const cols = locale === 'en' ? columns : columnsTH;

  return (
    <>
      <TopLoadingBar isFetching={getApi?.isFetching || getApi?.isPending} />

      <FormViews
        form={formFields}
        loading={updateApi?.isPending || postApi?.isPending}
        handleSubmit={form.handleSubmit}
        submitHandler={onSubmit}
        label={label}
        edit={edit}
        itemDetail={idEdit}
        width="max-w-[90%]"
        colum="grid grid-cols-8 gap-8 text-xs"
      />

      {getApi?.isPending ? (
        <TableLoading />
      ) : getApi?.isError ? (
        toastError(getApi?.error.message)
      ) : (
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
          hasAddp
          filter1="queue_type"
          filterTitle1={filterTitle1}
          option1={type_options}
          filter2="prescrip_status"
          filterTitle2={filterTitle2}
          option2={status_options}
          filter3="delivery"
          filterTitle3={filterTitle3}
          option3={delivery_options}
        />
      )}
    </>
  );
};

export default MainForm;
