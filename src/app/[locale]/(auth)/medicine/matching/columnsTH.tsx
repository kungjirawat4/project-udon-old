import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { DateTimeLongTH } from '@/libs/dateTime';

export const columnsTH = () => {
  return [
    {
      id: 'number',
      header: 'ตะกร้าช่อง',
      accessorKey: 'load_number',
      active: true,
    },
    {
      id: 'qr',
      header: 'รหัสตะกร้า',
      accessorKey: 'basket.qrCode',
      active: true,
      // cell: ({ row: { original } }: any) => original?.basket.qrCode,
    },
    {
      id: 'hnCode',
      header: 'HN',
      accessorKey: 'prescrip.hnCode',
      active: true,
    },
    {
      id: 'vnCode',
      header: 'VN',
      accessorKey: 'prescrip.vnCode',
      active: true,
    },
    {
      id: 'full_name',
      header: 'ชื่อ สกุล',
      accessorKey: 'prescrip.full_name',
      active: true,
    },
    {
      id: 'medicine_total',
      header: 'จำนวนยา',
      accessorKey: 'prescrip.medicine_total',
      active: true,
    },
    {
      id: 'drug_count',
      header: 'คงเหลือปัด',
      accessorKey: 'drug_count',
      active: true,
    },
    {
      id: 'queue_code',
      header: 'คิวรับบริการ',
      accessorKey: 'prescrip.queue_code',
      active: true,
    },
    {
      header: 'ด่วน',
      accessorKey: 'prescrip.urgent',
      active: true,
      cell: ({ row: { original } }: any) => {
        return original?.prescrip?.urgent
          ? (
              <FaCircleCheck className="text-green-500" />
            )
          : (
              <FaCircleXmark className="text-red-500" />
            );
      },
    },
    {
      header: 'ปรับปรุงล่าสุด',
      accessorKey: 'updatedAt',
      active: true,
      cell: ({ row: { original } }: any) => DateTimeLongTH(original?.updatedAt),
    },
    // {
    //   header: 'Action',
    //   active: true,
    //   // cell: ({ row: { original } }: any) => (
    //   //   <ActionButton
    //   //     editHandler={editHandler}
    //   //     isPending={isPending}
    //   //     deleteHandler={deleteHandler}
    //   //     original={original}
    //   //   />
    //   // ),
    // },
  ];
};
