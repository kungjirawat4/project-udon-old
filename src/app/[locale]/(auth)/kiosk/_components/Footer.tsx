// import Marquee from 'react-fast-marquee';
// import { useRouter } from 'next/router';

// interface FooterProps {
//   id?: string; // เพิ่ม props ที่คุณต้องการรับ
// }

// const Footer: React.FC<FooterProps> = ({ }) => {
//   const router = useRouter();

//   // กำหนดข้อความที่จะใช้ตาม URL
//   const message =
//     router.asPath === '/2' ?
//       'ข้อความทดสอบการวิ่ง: ระบบคัดกรองข้อมูลผู้ป่วย © 2024 โรงพยาบาลอุดรธานี2' :
//     router.asPath === '/3' ?
//       'ข้อความวิ่งทดสอบความเร็ว: ระบบคัดกรองข้อมูลผู้ป่วย © 2024 โรงพยาบาลอุดรธานี3' :
//       'ข้อความวิ่ง: ระบบคัดกรองข้อมูลผู้ป่วย © 2024 โรงพยาบาลอุดรธานี1';

//   return (
//     <footer className="fixed inset-x-0 bottom-0 h-10 bg-pink-500 text-center text-white md:text-2xl lg:text-2xl xl:text-4xl">
//       <Marquee direction="left" autoFill={false} speed={50}>
//         {message}
//       </Marquee>
//     </footer>
//   );
// };

// export default Footer;

import Marquee from 'react-fast-marquee';

import useApi from '@/hooks/useApi';

const Footer: React.FC = () => {
  const getMsgApi = useApi({
    key: ['config'],
    method: 'GET',
    url: `medicine/configures`,
  })?.get;
  return (
    <footer className="fixed inset-x-0 bottom-0 h-8 bg-pink-500 text-center text-2xl text-white">
      <Marquee direction="left" autoFill={false} speed={50}>
        {getMsgApi?.data?.data[0].hospital_message || ''}

      </Marquee>
    </footer>
  );
};

export default Footer;
