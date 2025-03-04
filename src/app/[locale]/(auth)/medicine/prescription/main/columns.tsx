// import PrintAll from '@/app/[locale]/(auth)/medicine/check/components/data-tables/_components/printall';
// import { PrintCProps } from '@/app/[locale]/(auth)/medicine/check/components/data-tables/printcabon';
// // import { Status } from '@/components/data-tables/buttonstatus';

// export const columns = () => {
//   return [
//     {
//       id: 'no',
//       header: 'No.',
//       with: 50,
//       // header: ({ column }) => (
//       //   <DataTableColumnHeader column={column} title='No.' />
//       // ),
//       cell: ({ row }: any) => <div>{Number(row.id) + 1}</div>,
//     },
//     { id: 'hn', header: 'HN Code', accessorKey: 'hnCode', active: true },
//     { id: 'name', header: 'Name', accessorKey: 'full_name', active: true },
//     // { id: 'vn', header: 'VN Code', accessorKey: 'vnCode', active: true },

//     { id: 'qcode', header: 'Queue', accessorKey: 'queue_code', active: true },

//     { id: 'dept_name', header: 'dept_name', accessorKey: 'dept_name', active: true },

//     {
//       id: 'total',
//       header: 'Total',
//       accessorKey: 'medicine_total',
//       active: true,
//     },
//     // {
//     //   id: 'price',
//     //   header: 'Amount',
//     //   accessorKey: 'medicine_price',
//     //   active: true,
//     // },
//     // {
//     //   id: 'created',
//     //   header: 'created At',
//     //   accessorKey: 'createdAt',
//     //   active: true,
//     //   cell: ({ row: { original } }: any) => DateTimeLongEN(original?.createdAt),
//     // },
//     {
//       header: 'Action',
//       active: true,
//       cell: ({ row: { original } }: any) => (
//         <div className="flex items-center space-x-2">
//           {/* {original.prescrip_status !== 'รอจับคู่ตะกร้า' && <Status row={original} />} */}
//           {/* <Status row={original} /> */}
//           <PrintCProps row={original} />
//           <PrintAll data={original?.arranged} datap={original} />
//         </div>

//       ),
//     },
//   ];
// };
import PrintAll from '@/app/[locale]/(auth)/medicine/check/components/data-tables/_components/printall';
import { PrintCProps } from '@/app/[locale]/(auth)/medicine/check/components/data-tables/printcabon';
// import { Status } from '@/components/data-tables/buttonstatus';

export const columns = () => {
  return [
    {
      id: 'no',
      header: 'ลำดับที่',
      with: 50,
      // header: ({ column }) => (
      //   <DataTableColumnHeader column={column} title='No.' />
      // ),
      cell: ({ row }: any) => <div>{Number(row.id) + 1}</div>,
    },
    { id: 'hn', header: 'HN Code', accessorKey: 'hnCode', active: true },
    { id: 'name', header: 'ชื่อ-นามสกุล', accessorKey: 'full_name', active: true },
    // { id: 'vn', header: 'VN Code', accessorKey: 'vnCode', active: true },

    { id: 'qcode', header: 'คิว', accessorKey: 'queue_code', active: true },

    { id: 'dept_name', header: 'ห้องตรวจ', accessorKey: 'dept_name', active: true },

    {
      id: 'total',
      header: 'จน.จ่าย',
      accessorKey: 'medicine_total',
      active: true,
    },
    // {
    //   id: 'price',
    //   header: 'Amount',
    //   accessorKey: 'medicine_price',
    //   active: true,
    // },
    // {
    //   id: 'created',
    //   header: 'created At',
    //   accessorKey: 'createdAt',
    //   active: true,
    //   cell: ({ row: { original } }: any) => DateTimeLongEN(original?.createdAt),
    // },
    {
      header: 'การกระทำ',
      active: true,
      cell: ({ row: { original } }: any) => (
        <div className="flex items-center space-x-2">
          {/* {original.prescrip_status !== 'รอจับคู่ตะกร้า' && <Status row={original} />} */}
          {/* <Status row={original} /> */}
          <PrintCProps row={original} />
          <PrintAll data={original?.arranged} datap={original} />
        </div>

      ),
    },
  ];
};
