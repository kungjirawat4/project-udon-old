// import { Button } from '@nextui-org/react';

// import useApi from '@/hooks/useApi';

// type ButtonUpdateProps = {
//   data: any; // Data from the row
// };

// export default function ButtonUpdate({ data }: ButtonUpdateProps) {
//   const updateApi = useApi({
//     key: ['prescription'],
//     method: 'PUT',
//     url: `medicine/drug`,
//   })?.put;

//   const handleClick = async () => {
//     try {
//       await updateApi?.mutateAsync({
//         id: data?.code?.trim(),
//         name: data?.gen_name?.trim(),
//         medicineName_th: data?.thai_name?.trim(),
//         medicineName_en: data?.name?.trim(),
//         medicinePackageSize: data?.package?.trim(),
//       });

//       // console.log('Update successful:', data);
//     } catch (error) {
//       console.error('Update failed:', error);
//     };
//   };
//   return (
//     <Button color="primary" onClick={handleClick} disabled={updateApi?.isPending}>
//       {/* Update */}
//       {updateApi?.isPending ? 'Loading...' : 'Update'}
//     </Button>
//   );
// }

import { Button } from '@nextui-org/react';

import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';

type ButtonUpdateProps = {
  data: any; // Data from the row
};

export default function ButtonUpdate({ data }: ButtonUpdateProps) {
  const updateApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `medicine/drug`,
  })?.put;
  const { toastSuccess, toastWarning } = useToasts();
  const handleClick = async () => {
    try {
      await updateApi?.mutateAsync({
        id: data?.code?.trim(),
        name: data?.gen_name?.trim(),
        medicineName_th: data?.thai_name?.trim(),
        medicineName_en: data?.name?.trim(),
        medicinePackageSize: data?.package?.trim(),
      });
      toastSuccess('อัพเดทยาสำเร็จ');
      // console.log('Update successful:', data);
    } catch {
      toastWarning('เกิดข้อผิดพลาดในการอัพเดท');
    };
  };
  return (
    <Button color="primary" onClick={handleClick} disabled={updateApi?.isPending}>
      {/* Update */}
      {updateApi?.isPending ? 'Loading...' : 'Update'}
    </Button>
  );
}
