import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { ActionButton } from '@/components/data-tables/CustomForm';
import { TimeOnlyTH, TimeOnlyTH7 } from '@/libs/dateTime';

import PrintAll from './components/data-tables/_components/printall';
// import { Status } from './components/data-tables/buttonstatus';
import { PrintCProps } from './components/data-tables/printcabon';
import { status_options, type_options } from './filters';

type Column = {
  editHandler: (item: any) => void;
  isPending: boolean;
  deleteHandler: (item: any) => void;
};

export const columns = ({ editHandler, isPending, deleteHandler }: Column) => {
  return [

    { id: 'basket.qrCode', header: 'QR Code', accessorKey: 'basket.qrCode', active: true },
    { id: 'hn', header: 'HN Code', accessorKey: 'hnCode', active: true },
    { id: 'name', header: 'ชื่อ-นามสกุล', accessorKey: 'full_name', active: true },
    // { id: 'vn', header: 'VN Code', accessorKey: 'vnCode', active: true },
    {
      header: 'ด่วน',
      accessorKey: 'urgent',
      active: true,
      cell: ({ row: { original } }: any) =>
        original?.urgent
          ? (
              <FaCircleCheck className="text-green-500" />
            )
          : (
              <FaCircleXmark className="text-red-500" />
            ),
    },
    {
      header: 'ประเภทคิว',
      accessorKey: 'queue_type',
      active: true,
      cell: ({ row }: any) => {
        const type = type_options.find(
          type => type.value === row.getValue('queue_type'),
        );

        if (!type) {
          return null;
        }

        // กำหนดสีตามประเภทคิว
        const colorMap: Record<string, string> = {
          A: 'text-blue-500 font-bold', // สีน้ำเงิน
          B: 'text-red-500 font-bold', // สีแดง
          C: 'text-green-500 font-bold', // สีเขียว
          D: 'text-yellow-500 font-bold', // สีเหลือง
        };

        const colorClass: string = colorMap[row.getValue('queue_type')] || 'text-gray-500';

        return (
          <div className="flex items-center">
            {type.icon && (
              // <type.icon className="mr-2 size-4 text-muted-foreground" />
              <type.icon className={`mr-2 size-4 ${colorClass}`} />
            )}
            <span className={colorClass}>{type.label}</span>
          </div>
        );
      },
      filterFn: (row: any, id: string, value: string) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      // id: 'qcode',
      header: 'คิว',
      accessorKey: 'queue_code',
      active: true,
    },
    {
      header: 'สถานะ',
      accessorKey: 'prescrip_status',
      active: true,
      cell: ({ row }: any) => {
        const status = status_options.find(

          status => status.value === row.getValue('prescrip_status'),
        );

        if (!status) {
          return null;
        }
        const colorMap: Record<string, string> = {
          รอจับคู่ตะกร้า: 'text-yellow-500 font-bold',
          กำลังจัดยา: 'text-yellow-500 font-bold',
          กำลังตรวจสอบ: 'text-yellow-500 font-bold',
          รอเรียกคิว: 'text-orange-500 font-bold',
          จ่ายยาสำเร็จ: 'text-green-500 font-bold',
        };

        const colorClass: string = colorMap[row.getValue('prescrip_status')] || 'text-gray-500';
        return (
          <div className="flex items-center">
            {status.icon && (
              // <status.icon className="mr-2 size-4 text-muted-foreground" />
              <status.icon className={`mr-2 size-4 text-muted-foreground ${colorClass}`} />
            )}
            <span className={colorClass}>{status.label}</span>
          </div>
        );
      },
      filterFn: (row: any, id: string, value: string) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      // id: 'livery',
      header: 'สถานที่',
      accessorKey: 'delivery',
      active: true,
    },
    {
      // id: 'total',
      header: 'จำนวน',
      accessorKey: 'medicine_total',
      active: true,
    },
    {
      // id: 'total',
      header: 'ช่องตะกร้า',
      accessorKey: 'autoload',
      active: true,
      cell: ({ row: { original } }: any) => {
        // console.log('Original Data:', original); // Log ค่า original ออกมา

        return original?.autoload?.load_number;
      },
    },
    { id: 'dept_name', header: 'ห้องตรวจ', accessorKey: 'dept_name', active: true },
    { id: 'pay_type', header: 'สิทธิ์การรักษา', accessorKey: 'pay_type', active: true },
    {
      // id: 'price',
      header: 'แพ้ยา',
      accessorKey: 'drug_allergy',
      active: true,
    },
    {
      // id: 'price',
      header: 'เวลาตรวจ',
      accessorKey: 'firstIssTime',
      active: true,
      cell: ({ row: { original } }: any) => original?.firstIssTime ? TimeOnlyTH7(original?.firstIssTime) : '',
    },
    {
      // id: 'price',
      header: 'เวลาจ่าย',
      accessorKey: 'lastDispense',
      active: true,
      cell: ({ row: { original } }: any) => original?.lastDispense ? TimeOnlyTH(original?.lastDispense) : '',
    },
    {
      header: 'การกระทำ',
      active: true,
      cell: ({ row: { original } }: any) => {
        if (original?.prescrip_status !== 'กำลังตรวจสอบ' && original?.prescrip_status !== 'กำลังจัดยา') {
          return (
            <div className="flex items-center space-x-2">
              {original.prescrip_status === 'รอเรียกคิว' && <PrintAll data={original?.arranged} datap={original} />}
              {original.prescrip_status === 'รอเรียกคิว' && <PrintCProps row={original} />}
            </div>
          ); // Do not show ActionButton if status is not 'กำลังตรวจสอบ'
          // return null;
        }
        return (
          <div className="flex items-center space-x-2">
            <ActionButton
              editHandler={editHandler}
              isPending={isPending}
              deleteHandler={deleteHandler}
              original={original}
            />

          </div>
        );
      },
    },
  ];
};
