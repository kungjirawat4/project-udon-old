import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useEffect } from 'react';

import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import { DateTimeLongTH } from '@/libs/dateTime';
import { publishMessage } from '@/libs/mqttservice';

type DataProps = {
  cabinets: any;
  pId: any;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
};
export default function Edit({ isOpen, onClose, cabinets, pId, onRefresh }: DataProps) {
  const { toastWarning, toastError } = useToasts();
  const getApiZ1 = useApi({
    key: ['cabinetz1'],
    method: 'GET',
    url: `appqueue/cabinet/Z1`,
  })?.get;
  const getApiZ2 = useApi({
    key: ['cabinetz2'],
    method: 'GET',
    url: `appqueue/cabinet/Z2`,
  })?.get;
  const getApiZ3 = useApi({
    key: ['cabinetz3'],
    method: 'GET',
    url: `appqueue/cabinet/Z3`,
  })?.get;
  const getApiZ4 = useApi({
    key: ['cabinetz4'],
    method: 'GET',
    url: `appqueue/cabinet/Z4`,
  })?.get;
  const updateApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `medicine/prescription`,
  })?.put;
  const updateApic = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `appqueue/cabinet`,
  })?.put;
  // console.log(cabinets?.storage_position);
  // console.log(pId?.queue_type);
  const handleupdate = () => {
    try {
      const existingItem = getApiZ1?.data?.data?.find((item: { prescripId: any }) => item.prescripId === pId?.id);
      const existingItemz2 = getApiZ2?.data?.data?.find((item: { prescripId: any }) => item.prescripId === pId?.id);
      const existingItemz3 = getApiZ3?.data?.data?.find((item: { prescripId: any }) => item.prescripId === pId?.id);
      const existingItemz4 = getApiZ4?.data?.data?.find((item: { prescripId: any }) => item.prescripId === pId?.id);
      // console.log(existingItem);
      if (existingItem || existingItemz2 || existingItemz3 || existingItemz4) {
        // ถ้าพบว่ามีข้อมูลตรงกัน
        // alert('มีข้อมูลตะกร้านี้อยู่แล้ว!');
        toastWarning(`มีข้อมูลตะกร้านี้อยู่ในตู้${existingItem?.storage_location || existingItemz2?.storage_location || existingItemz3?.storage_location || existingItemz4?.storage_location}ช่องที่${existingItem?.storage_position || existingItemz2?.storage_position || existingItemz3?.storage_position || existingItemz4?.storage_position}แล้ว`);

        return; // หยุดการดำเนินการถ้ามีข้อมูลตรงกัน
      }
      if (pId?.id == null
        || cabinets?.id == null
        || pId?.queue_type == null
        || pId?.queue_code == null
        || pId?.hnCode == null
        || pId?.updatedAt == null) {
        toastWarning(`ไม่มีข้อมูลตะกร้ายา`);
        return;
      }
      // อัพเดทข้อมูล
      updateApi?.mutateAsync({
        id: pId?.id,
        station: true,
        queueStatus: 'พักตะกร้า',
        cabinetId: cabinets?.id,
      });
      updateApic?.mutateAsync({
        id: cabinets?.id,
        prescripId: pId?.id,
        datacabinet: `${pId?.queue_type}${pId?.queue_code},${pId?.hnCode},${pId?.full_name},${pId?.updatedAt}`,
      });
      // ส่งข้อมูลไปยังตู้
      if (cabinets.cabinet === 'REST') {
        const topicRegex = /^UDH\/Z\/Z(\d)\/(\d)\.(\d)$/;
        const match = cabinets.mqtt_topic?.match(topicRegex);
        if (match) {
          const x = Number.parseInt(match[1] || '', 10);
          const y = Number.parseInt(match[2] || '', 10);
          const z = Number.parseInt(match[3] || '', 10);

          let slave;
          if (x === 1) {
            slave = (y - 1) * 5 + z;
          } else if (x === 2) {
            slave = 10 + (y - 1) * 5 + z;
          } else if (x === 3) {
            slave = 20 + (y - 1) * 5 + z;
          } else if (x === 4) {
            slave = (y - 1) * 3 + z;
          }
          if (slave !== undefined) {
            publishMessage(`${cabinets.mqtt_topic}`, JSON.stringify({
              mac: cabinets.plcId,
              slave: slave.toString(),
              data: `${pId?.queue_code}${','}${DateTimeLongTH(pId?.updatedAt)}`,
            }));
          } else {
            console.error('Invalid value of x in topic:', cabinets.mqtt_topic);
          }
        }
      }
      // console.log('OKOKOKO');
    } catch (error) {
      // console.error('Error:', error);
      // console.log('data:', datas);
      console.error('Error:', error);
      toastError(`เกิดข้อผิดพลาดในการอัพเดทข้อมูล`);
    }
  };
  const handleclear = () => {
    try {
      updateApi?.mutateAsync({
        id: cabinets?.prescripId,
        station: true,
        queueStatus: 'ยกเลิก',
        cabinetId: cabinets?.id,
      });
      updateApic?.mutateAsync({
        id: cabinets?.id,
        prescripId: '',
        datacabinet: '',
      });
      // getApi?.refetch();
    } catch (error) {
      // console.error('Error:', error);
      // console.log('data:', datas);
      console.error('Error:', error);
      toastError(`เกิดข้อผิดพลาดในการเคลียร์ตะกร้า`);
    }
  };
  useEffect(() => {
    if (updateApi?.isSuccess) {
      onRefresh();
    }
  }, [onRefresh, updateApi?.isSuccess]);
  // console.log(getApiZ1?.data?.data);
  return (

    <Modal
      isDismissable={false}
      // eslint-disable-next-line react/prefer-shorthand-boolean
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>

        <ModalHeader className="flex flex-col gap-1">
          ช่องที่
          {' '}
          {cabinets?.storage_position}
        </ModalHeader>
        <ModalBody>
          <div>
            {!cabinets?.datacabinet && (
              <>
                <p className="font-bold">ข้อมูล:</p>
                <p> ว่าง</p>
              </>
            )}
            {cabinets?.datacabinet && (
              <div>
                <p className="font-bold">ข้อมูล:</p>
                <p>
                  คิวที่ :
                  {' '}
                  <span>{cabinets?.datacabinet?.split(',')[0]}</span>
                </p>
                <p>
                  HN :
                  {' '}
                  <span>{cabinets?.datacabinet?.split(',')[1]}</span>
                </p>
                <p>
                  ชื่อ-นามสกุล :
                  {' '}
                  <span>{cabinets?.datacabinet?.split(',')[2]}</span>
                </p>
                <p>
                  เวลา :
                  {' '}
                  <span>{DateTimeLongTH(cabinets?.datacabinet?.split(',')[3])}</span>
                </p>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            ปิด
          </Button>
          <Button
            color="danger"
            variant="light"
            onClick={() => {
              handleclear(); // เรียกฟังก์ชันเมื่อคลิก
            }}
            onPress={onClose}
          >
            เคลียร์ตะกร้า
          </Button>
          {!cabinets?.datacabinet && (
            <Button
              color="primary"
              onClick={() => {
                handleupdate(); // เรียกฟังก์ชันเมื่อคลิก
              }}
              onPress={onClose}
            >
              พักตะกร้า
            </Button>
          )}

        </ModalFooter>

      </ModalContent>
    </Modal>

  );
}
