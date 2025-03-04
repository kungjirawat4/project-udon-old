// 'use client';

// import type { Row } from '@tanstack/react-table';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { FaCheckToSlot } from 'react-icons/fa6';

// import { Button } from '@/components/ui/button';
// import useToasts from '@/hooks/use-toast';
// import useApi from '@/hooks/useApi';

// type WithId = {
//   id: string;
// };
// type ConfirmProps<TData> = {
//   row: Row<TData> | any;
// };

// export function Confirm<TData extends WithId>({
//   row,
// }: ConfirmProps<TData>) {
//   const drugId = row.original.id as string;
//   const pId = row.original.prescripId as string;
//   const { toastSuccess, toastWarning } = useToasts();
//   const [datap, setDatap] = useState<any>(null);
//   const getApi = useApi({
//     key: ['prescription'],
//     method: 'GET',
//     url: `medicine/prescription/station`,
//   })?.get;
//   const updateApi = useApi({
//     key: ['prescription'],
//     method: 'PUT',
//     url: `medicine/prescription/arranged`,
//   })?.put;
//   const updateApip = useApi({
//     key: ['prescription'],
//     method: 'PUT',
//     url: `medicine/prescription`,
//   })?.put;
//   useEffect(() => {
//     fetch(`/api/medicine/prescription?q=${pId}`)
//       .then(res => res.json())
//       .then((data) => {
//         setDatap(data?.data[0]);
//         // setLoading(false);
//       });
//   }, [pId]);
//   const router = useRouter();
//   const checkArrangStatus = async () => {
//     if (!datap?.arranged) {
//       // console.log('ข้อมูลไม่ถูกต้องหรือไม่พบการจัดเรียง');
//       return;
//     }
//     const id = datap.id;
//     // เช็คว่าทุก arrangement มีสถานะ 'จัดยาแล้ว' หรือไม่
//     const allArranged = datap?.arranged.every((arrangement: { arrang_status: any }) => {
//       const { arrang_status } = arrangement;
//       return arrang_status === 'จัดยาแล้ว' && arrang_status !== null && arrang_status !== '';
//     });

//     // ถ้าทุกสถานะเป็น 'จัดยาแล้ว'
//     if (allArranged) {
//       // console.log('ทุกสถานะจัดยาในข้อมูลที่จัดเรียงถูกต้อง');

//       const updatePrescriptionData = {
//         // prescrip_status: 'กำลังตรวจสอบ',
//         station: true,
//         queueStatus: 'กำลังตรวจสอบ',
//       };

//       // // อัปเดตข้อมูลที่นี่
//       await Promise.all([
//         updateApip?.mutateAsync({ id, ...updatePrescriptionData }),
//         // เพิ่มการอัปเดตอื่น ๆ ที่นี่
//       ]);
//       router.push('/medicine/station');
//     } else {
//       // console.log('มีสถานะจัดยาไม่ตรงตามเงื่อนไขในข้อมูลที่จัดเรียง');
//     }
//   };
//   const handleConfirm = async () => {
//     try {
//       // console.log('ข้อมูลตรงกัน:', trimmedinputValue);

//       const updateData = { arrang_status: 'จัดยาแล้ว', user_arrang_time: new Date().toISOString() };

//       const response = await updateApi?.mutateAsync({ ...updateData, id: drugId });

//       if (response) {
//         toastSuccess('ยืนยันยาแล้ว');
//         await checkArrangStatus();
//         getApi?.refetch();
//       } else {
//         toastWarning('ไม่พบข้อมูล');
//       };
//     // eslint-disable-next-line unused-imports/no-unused-vars
//     } catch (error) {
//       // router.push('/medicine/station');
//       toastWarning('เกิดข้อผิดพลาดในการอัพเดท');
//     }
//   };

//   return (
//     <div>
//       <Button onClick={handleConfirm} color="primary">
//         <FaCheckToSlot className="m-1" />
//         {' '}
//         ConFirm
//       </Button>
//     </div>
//   );
// }

'use client';

import type { Row } from '@tanstack/react-table';
// import { useRouter } from 'next/navigation';
// import { useCallback, useEffect, useState } from 'react';
import { FaCheckToSlot } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';

type WithId = {
  id: string;
};

type ConfirmProps<TData> = {
  row: Row<TData> | any;
};

export function Confirm<TData extends WithId>({ row }: ConfirmProps<TData>) {
  const drugId = row.original.id as string;
  // const pId = row.original.prescripId as string;
  const { toastSuccess, toastWarning } = useToasts();
  // const [prescriptionData, setPrescriptionData] = useState<any>(null);

  const getApi = useApi({
    key: ['prescription'],
    method: 'GET',
    url: `medicine/prescription/station`,
  })?.get;

  const updateArrangementApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `medicine/prescription/arranged`,
  })?.put;

  // const updatePrescriptionApi = useApi({
  //   key: ['prescription'],
  //   method: 'PUT',
  //   url: `medicine/prescription`,
  // })?.put;

  // const router = useRouter();

  // Fetch prescription data based on prescription ID
  // useEffect(() => {
  //   const fetchPrescriptionData = async () => {
  //     try {
  //       const response = await fetch(`/api/medicine/prescription?q=${pId}`);
  //       const data = await response.json();
  //       setPrescriptionData(data?.data?.[0] || null);
  //     } catch (error) {
  //       console.error('Error fetching prescription data:', error);
  //     }
  //   };

  //   if (pId) {
  //     fetchPrescriptionData();
  //   }
  // }, [pId]);
  // console.log('prescriptionData', prescriptionData?.arranged);
  // const checkArrangementStatus = useCallback(async () => {
  //   if (!prescriptionData?.arranged) {
  //     // toastWarning('ไม่พบข้อมูลการจัดเรียง');
  //     return;
  //   }

  //   const { arranged, id } = prescriptionData;

  //   const allArrangedCorrectly = arranged.every(
  //     (arrangement: { arrang_status: string }) =>
  //       arrangement.arrang_status === 'กำลังจัดยา',
  //   );

  //   if (allArrangedCorrectly) {
  //     const updateData = {
  //       station: true,
  //       queueStatus: 'กำลังตรวจสอบ',
  //     };

  //     try {
  //       await updatePrescriptionApi?.mutateAsync({ id, ...updateData });
  //       toastSuccess('สถานะอัปเดตสำเร็จ');
  //       router.push('/medicine/station');
  //     } catch (error) {
  //       console.error('Error updating prescription:', error);
  //       toastWarning('เกิดข้อผิดพลาดในการอัปเดต');
  //     }
  //   } else {
  //     // toastWarning('มีข้อมูลที่ยังไม่จัดยา');
  //   }
  // }, [prescriptionData, updatePrescriptionApi, router, toastSuccess, toastWarning]);

  const handleConfirm = async () => {
    const updateData = {
      arrang_status: 'จัดยาแล้ว',
      user_arrang_time: new Date().toISOString(),
    };

    try {
      const response = updateArrangementApi?.mutate({
        id: drugId,
        ...updateData,
      });

      if (response) {
        toastSuccess('ยืนยันยาแล้ว');
        // await checkArrangementStatus();
        getApi?.refetch();
      } else {
        toastWarning('ไม่พบข้อมูล');
      }
    } catch (error) {
      console.error('Error confirming arrangement:', error);
      toastWarning('เกิดข้อผิดพลาดในการยืนยัน');
    }
  };

  return (
    <div>
      <Button onClick={handleConfirm} color="primary">
        <FaCheckToSlot className="m-1" />
        ยืนยัน
      </Button>
    </div>
  );
}
