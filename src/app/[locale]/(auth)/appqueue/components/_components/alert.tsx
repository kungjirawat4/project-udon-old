import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { FaCircleQuestion } from 'react-icons/fa6';

export default function Alert() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="light" className="mt-[-8px]">
        <FaCircleQuestion size="md" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">คำอธิบาย</ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-2 text-xl">
                  <div className="size-5 rounded-sm bg-green-500"></div>
                  <p>
                    ช่องพักตะกร้าว่างอยู่
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xl">
                  <div className="size-5 rounded-sm bg-red-500"></div>
                  <p>
                    มีตะกร้าพักอยู่
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xl">
                  <div className="size-5 rounded-sm bg-gray-500"></div>
                  <p>
                    ไม่พบข้อมูลช่องพัก
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className="text-lg">
                  ปิด
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
