// PauseBasketModal.tsx
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

import Alert from './alert';
import Z1 from './form/z1';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onRefresh: () => void;
};

export default function BasketModal({ isOpen, onClose, data, onRefresh }: ModalProps) {
  // console.log(data);
  const handleClick = () => {
    onRefresh();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        <ModalHeader>
          เลือกตู้สำหรับพักยา
          <Alert />
        </ModalHeader>
        <ModalBody>
          <div className="flex w-full flex-col">

            <Z1 z1={data} />

          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="bordered"
            onPress={onClose}
            className="text-lg"
            onClick={() => {
              handleClick(); // เรียกฟังก์ชันเมื่อคลิก
            }}
          >
            ปิด
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
