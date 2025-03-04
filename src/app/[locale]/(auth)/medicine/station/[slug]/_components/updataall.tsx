import { Button } from '@nextui-org/react';
import React from 'react';
import { FaCheckToSlot } from 'react-icons/fa6';

import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';

type UpdateAllProps = {
  data: any[]; // ข้อมูลที่ส่งเข้ามาเป็น Array
};

const UPDATEAll: React.FC<UpdateAllProps> = ({ data }) => {
  const getApi = useApi({
    key: ['prescription'],
    method: 'GET',
    url: `medicine/prescription/station`,
  })?.get;
  const updateApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `medicine/prescription/arranged`,
  })?.put;

  // console.log(data);
  const { toastSuccess, toastWarning } = useToasts();
  const handleConfirmAll = async () => {
    try {
      // อัปเดตข้อมูลทั้งหมดพร้อมกัน
      await Promise.all(
        data.map(item =>
          updateApi?.mutate({
            id: item.id as string, // ใช้ ID ของแต่ละรายการ
            arrang_status: 'จัดยาแล้ว',
            user_arrang_time: new Date().toISOString(),
          }),
        ),
      );

      toastSuccess('ยืนยันยาแล้ว');
      // ดึงข้อมูลใหม่หลังจากอัปเดตเสร็จ
      getApi?.refetch();
    } catch (error) {
      console.error('Error confirming arrangement:', error);
      toastWarning('เกิดข้อผิดพลาดในการยืนยัน');
    }
  };

  return (
    <div>
      <Button onClick={handleConfirmAll} color="primary" className="ml-auto capitalize">
        <FaCheckToSlot className="m-1" />
        ยืนยันทั้งหมด
      </Button>

    </div>
  );
};

export default UPDATEAll;
