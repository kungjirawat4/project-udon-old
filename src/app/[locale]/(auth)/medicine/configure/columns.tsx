import { Image } from '@nextui-org/react';
import NextImage from 'next/image';

import { ActionButton } from '@/components/data-tables/CustomForm';
import { DateLongEN } from '@/libs/dateTime';

type Column = {
  editHandler: (item: any) => void;
  isPending: boolean;
  deleteHandler: (item: any) => void;
};

export const columns = ({ editHandler, isPending, deleteHandler }: Column) => {
  return [
    { header: 'รหัสโรงพยาบาล', accessorKey: 'hospital_code', active: true },
    {
      header: 'Logo',
      accessorKey: 'hospital_logo',
      active: true,
      cell: ({ row: { original } }: any) => (
        <div className="mt-2 flex items-end justify-center text-center">
          <Image
            isZoomed
            as={NextImage}
            src={original.hospital_logo || '/avatar.jpg'}
            width={30}
            height={30}
            alt="Drug Image1"
          />
        </div>
      ),
    },
    { header: 'ชื่อย่อ', accessorKey: 'hospital_initial', active: true },
    { header: 'ชื่อภาษาไทย', accessorKey: 'hospital_nameTH', active: true },
    { header: 'ชื่อภาษาอังกฤษ', accessorKey: 'hospital_nameEN', active: true },
    {
      header: 'จำนวนคิว',
      accessorKey: 'hospital_queue_day',
      active: true,
    },
    {
      header: 'วันที่ใบสั่งยา',
      accessorKey: 'hospital_date',
      active: true,
      cell: ({ row: { original } }: any) => DateLongEN(original?.hospital_date),
    },
    { header: 'ข้อความเรียกคิว', accessorKey: 'hospital_call_message', active: true },
    { header: 'ข้อความวิ่ง', accessorKey: 'hospital_message', active: true },
    // {
    //   header: 'Outside of hours',
    //   accessorKey: 'hospital_time',
    //   active: true,
    //   cell: ({ row: { original } }: any) =>
    //     DateLongEN(original?.hospital_time)
    // },
    {
      header: 'Action',
      active: true,
      cell: ({ row: { original } }: any) => (
        <ActionButton
          editHandler={editHandler}
          isPending={isPending}
          deleteHandler={deleteHandler}
          original={original}
        />
      ),
    },
  ];
};
