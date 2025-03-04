/* eslint-disable no-console */
// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// import moph from '#/public/images/logo_MOPH.png';
// import logo from '#/public/images/LOGO2.png';
// import chock from '#/public/images/num1.png';

// const Header: React.FC = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     setInterval(() => setCurrentTime(new Date()), 1000);
//   }, []);

//   const today = currentTime.toLocaleString('th-TH', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     weekday: 'long',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: '2-digit',
//   });
//   return (
//     <header className="flex flex-col items-center bg-pink-500 p-4">
//       <div className="flex w-full justify-between">
//         <Image src={logo} alt="Logo" width={130} height={130} />
//         <Image src={chock} alt="Chock" width={130} height={130} />
//         <Image src={moph} alt="MOPH Logo" width={130} height={130} />
//       </div>
//       <div
//         className="mt-4 text-white md:text-xl lg:text-2xl"
//         suppressHydrationWarning
//       >
//         <b>{today}</b>
//       </div>
//     </header>
//   );
// };

// export default Header;

// export default Header;
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// import moph from '#/public/images/logo_MOPH.png';
// import logo from '#/public/images/LOGO2.png';
// import num1 from '#/public/images/num1.png';
// import num2 from '#/public/images/num2.png';
// import num3 from '#/public/images/num3.png';

// interface HeaderProps {
//   id?: string; // Optional prop
// }

// const Header: React.FC<HeaderProps> = ({ }) => {
//   const router = useRouter();
//   const [currentTime, setCurrentTime] = useState<string>('');

//   useEffect(() => {
//     const updateClock = () => {
//       setCurrentTime(new Date().toLocaleString('th-TH', {
//         year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
//         hour: 'numeric', minute: 'numeric', second: '2-digit',
//       }));
//     };
//     updateClock();
//     const intervalId = setInterval(updateClock, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const chockImage = router.asPath === '/2' ? num2 : router.asPath === '/3' ? num3 : num1;

//   return (
//     <header className="flex flex-col items-center bg-pink-500 p-2">
//       <div className="flex w-full items-center justify-between">
//         <Image src={logo} alt="Logo" width={90} height={90} />
//         <div className="flex items-center">
//           <span className="mx-2 text-7xl font-bold text-white">ตรวจสอบข้อมูล ที่นี่</span>
//           <Image src={chockImage} alt="Chock" width={90} height={90} />
//         </div>
//         <Image src={moph} alt="MOPH Logo" width={90} height={90} />
//       </div>
//       <div className="mt-4 text-white md:text-xl lg:text-2xl">
//         <b>{currentTime}</b>
//       </div>
//     </header>
//   );
// };

// export default Header;
// import num1 from '#/public/images/num1.png';
// import num2 from '#/public/images/num2.png';
// import num3 from '#/public/images/num3.png';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import moph from '#/public/images/logo_MOPH.png';
import logo from '#/public/images/LOGO2.png';

type HeaderProps = {
  params: { slug: string };
};

const Header: React.FC<HeaderProps> = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [AA, setAA] = useState<string>('num1');

  useEffect(() => {
    const currentUrl = window.location.pathname;
    console.log('URL ปัจจุบัน:', currentUrl);

    if (currentUrl.startsWith('/kiosk')) {
      const urlEndsWith = currentUrl.split('/').pop();
      console.log('ส่วนสุดท้ายของ URL:', urlEndsWith);

      if (urlEndsWith === '1') {
        setAA('num1');
        console.log('ตั้งค่า AA เป็น: num1');
      } else if (urlEndsWith === '2') {
        setAA('num2');
        console.log('ตั้งค่า AA เป็น: num2');
      } else if (urlEndsWith === '3') {
        setAA('num3');
        console.log('ตั้งค่า AA เป็น: num3');
      } else {
        setAA('num1');
        console.log('ไม่พบหมายเลข ตั้งค่า AA เป็น num1');
      }
    } else {
      setAA('num1');
      console.log('URL ไม่ตรงตามเงื่อนไข ตั้งค่า AA เป็น num1');
    }
  }, []);

  const today = currentTime.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: '2-digit',
  });
  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, [today]);
  // console.log('วันที่ปัจจุบัน:', today);

  return (
    <header className="flex flex-col items-center bg-pink-500 p-2">
      <div className="flex w-full items-center justify-between">
        <Image src={logo} alt="Logo" width={120} height={120} />

        <div className="flex items-center">
          <span className="mx-2 text-7xl font-bold text-white">
            ตรวจสอบข้อมูล ที่นี่
          </span>
          <Image src={`/images/${AA}.png`} alt="Chock" width={130} height={130} />
          {' '}

        </div>

        <Image src={moph} alt="MOPH Logo" width={120} height={120} />
      </div>
      <div className="mt-4 text-white md:text-xl lg:text-2xl" suppressHydrationWarning>
        <b>{today}</b>
      </div>
    </header>
  );
};

export default Header;
