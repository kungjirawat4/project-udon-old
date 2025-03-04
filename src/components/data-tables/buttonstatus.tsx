// 'use client';

// import type { Row } from '@tanstack/react-table';
// // import { useRouter } from 'next/navigation';
// // import { useCallback, useEffect, useState } from 'react';
// import { FaRightLeft } from 'react-icons/fa6';

// import { Button } from '@/components/ui/button';
// import useToasts from '@/hooks/use-toast';
// import useApi from '@/hooks/useApi';

// type WithId = {
//   id: string;
// };

// type StatusProps<TData> = {
//   row: Row<TData> | any;
// };

// export function Status<TData extends WithId>({ row }: StatusProps<TData>) {
//   const drugId = row.id as string;
//   // const pId = row.original.prescripId as string;
//   const { toastSuccess, toastWarning } = useToasts();
//   // const [prescriptionData, setPrescriptionData] = useState<any>(null);
//   // console.log(row);
//   // console.log(drugId);
//   const getApi = useApi({
//     key: ['prescription'],
//     method: 'GET',
//     url: `medicine/prescription/screening`,
//   })?.get;

//   const updateApi = useApi({
//     key: ['prescription'],
//     method: 'PUT',
//     url: `medicine/prescription`,
//   })?.put;

//   const handleConfirm = async () => {
//     const updateData = {
//       station: true,
//       queueStatus: 'รอจับคู่ตะกร้า',
//     };

//     try {
//       const response = await updateApi?.mutateAsync({
//         id: drugId,
//         ...updateData,
//       });

//       if (response) {
//         toastSuccess('เปลี่ยนสถานะสำเร็จ');
//         // await checkArrangementStatus();
//         getApi?.refetch();
//       } else {
//         toastWarning('ไม่สำเร็จ');
//       }
//     } catch (error) {
//       console.error('Error confirming arrangement:', error);
//       toastWarning('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ');
//     }
//   };

//   return (
//     <div>
//       <Button onClick={handleConfirm} color="primary">
//         <FaRightLeft className="m-1" />
//         สถานะ
//       </Button>
//     </div>
//   );
// }

'use client';

import { Spinner } from '@nextui-org/react';
import type { Row } from '@tanstack/react-table';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCallback, useEffect, useState } from 'react';
import { FaRightLeft } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';

type WithId = {
  id: string;
};

type StatusProps<TData> = {
  row: Row<TData> | any;
};

export function Status<TData extends WithId>({ row }: StatusProps<TData>) {
  const drugId = row.id as string;
  // const pId = row.original.prescripId as string;
  const { toastSuccess, toastWarning } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  // const [prescriptionData, setPrescriptionData] = useState<any>(null);
  // console.log(row);
  // console.log(drugId);
  const getApi = useApi({
    key: ['prescription'],
    method: 'GET',
    url: `medicine/prescription/screening`,
  })?.get;

  const updateApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `medicine/prescription`,
  })?.put;

  const handleConfirm = async () => {
    setIsLoading(true);
    const updateData = {
      station: true,
      queueStatus: 'รอจับคู่ตะกร้า',
    };

    try {
      const response = await updateApi?.mutateAsync({
        id: drugId,
        ...updateData,
      });

      if (response) {
        toastSuccess('เปลี่ยนสถานะสำเร็จ');

        // await checkArrangementStatus();
        getApi?.refetch();
        setIsLoading(false);
      } else {
        toastWarning('ไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Error confirming arrangement:', error);
      toastWarning('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ');
    }
  };

  return (
    <div>
      {/* <Button onClick={handleConfirm} color="primary">
        <FaRightLeft className="m-1" />
        สถานะ
      </Button> */}
      <Button
        className="ml-auto capitalize"
        color="primary"
        onClick={handleConfirm}
        disabled={isLoading}
      >
        {isLoading
          ? (
              <div className="flex items-center">
                <Spinner color="default" />
                {' '}
                <span className="ml-2">Loading...</span>
              </div>
            )
          : (
              <>
                <FaRightLeft className="m-1" />
                <span className="ml-2">สถานะ</span>
              </>
            )}
      </Button>
    </div>
  );
}
