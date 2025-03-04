// import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
// import React, { useState } from 'react';
// import { FaQrcode } from 'react-icons/fa6';
// import { QrReader } from 'react-qr-reader';

// function QRscanner() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [qrscan, setQrscan] = useState('No result');
//   const handleScan = (data: React.SetStateAction<string>) => {
//     if (data) {
//       setQrscan(data);
//     }
//   };
//   // const handleError = (err: any) => {
//   //   console.error(err);
//   // };

//   return (
//     <div>
//       <Button onPress={onOpen} variant="light">
//         <FaQrcode size={100} />
//       </Button>
//       <Modal
//         isDismissable={false}
//         // eslint-disable-next-line react/prefer-shorthand-boolean
//         isKeyboardDismissDisabled={true}
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//       >
//         <ModalContent>
//           {onClose => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">แสกน QRcode</ModalHeader>
//               <ModalBody>
//                 <div className="flex justify-center">
//                   <QrReader
//                     onResult={(result) => {
//                       if (result) {
//                         handleScan(result.getText());
//                       }
//                       // if (error) {
//                       //   handleError(error);
//                       // }
//                     }}
//                     constraints={{
//                       facingMode: 'environment', // ใช้กล้องหลัง (หรือ 'user' สำหรับกล้องหน้า)
//                     }}
//                     containerStyle={{ width: '100%', height: 'auto', backgroundColor: 'lightgray' }}
//                     videoContainerStyle={{ border: '2px solid black' }} // กำหนดขอบของคอนเทนเนอร์วิดีโอ

//                     className="size-[300px]"

//                   />
//                 </div>

//                 <p>
//                   Result:
//                   {qrscan}
//                 </p>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>

//     </div>
//   );
// }

// export default QRscanner;

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import React, { useState } from 'react';
import { FaCameraRotate, FaQrcode } from 'react-icons/fa6';

type QRScannerProps = {
  onResult: (result: string) => void; // กำหนด props สำหรับ callback
};

function QRscanner({ onResult }: QRScannerProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [qrscan, setQrscan] = useState('No result');
  const [useFrontCamera, setUseFrontCamera] = useState(false); // สถานะสำหรับสลับกล้อง

  const toggleCamera = () => setUseFrontCamera(!useFrontCamera); // ฟังก์ชันสลับกล้อง
  return (
    <div>
      <Button onPress={onOpen} variant="light" className="mt-[10px]">
        <FaQrcode size={100} />
      </Button>
      <Modal
        isDismissable={false}
        // eslint-disable-next-line react/prefer-shorthand-boolean
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">แสกน QRcode</ModalHeader>
              <ModalBody>
                <div className="flex justify-center">
                  {isOpen && (
                    <Scanner
                      // onScan={result => setQrscan(String(result[0]?.rawValue))}
                      onScan={(result) => {
                        const scannedValue = String(result[0]?.rawValue);
                        onResult(scannedValue); // ส่งผลลัพธ์กลับ
                        // setQrscan(scannedValue);
                        onClose(); // ปิด Modal หลังสแกนสำเร็จ
                      }}
                      onError={error => console.error(error)} // แจ้งข้อผิดพลาดถ้ามี
                      constraints={{
                        facingMode: useFrontCamera ? 'user' : 'environment', // เปลี่ยนกล้องตามสถานะ
                        frameRate: { ideal: 60 },
                      }}
                      allowMultiple
                    />
                  )}
                </div>

                <div className="flex justify-center">
                  <Button onPress={toggleCamera} variant="light">
                    {/* ใช้กล้อง
                  {useFrontCamera ? 'หลัง' : 'หน้า'} */}
                    <FaCameraRotate size={150} />
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                {/* <p>
                  Result:
                  {qrscan}
                </p> */}
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default QRscanner;
