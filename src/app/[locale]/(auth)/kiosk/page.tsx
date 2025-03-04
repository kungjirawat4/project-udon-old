/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable unicorn/prefer-number-properties */

/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable style/multiline-ternary */
// 'use client';

// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import Marquee from 'react-fast-marquee';

// // import useApi from '@/hooks/useApi';
// import moph from '#/public/images/logo MOPH.png';
// import logo from '#/public/images/logoudh01.png';

// const Kiosk = ({ params }: { params: { slug: string } }) => {
//   // const getApi = useApi({
//   //   key: ['queue'],
//   //   method: 'GET',
//   //   url: `medicine/queue/${params.slug}`,
//   // })?.get;

//   // console.log(getApi?.data);
//   const chock = `${process.env.NEXT_PUBLIC_APP_URL}/images/num${params.slug}.png`;
//   // console.log(chock);

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
//   const handleCheckQueue = () => {
//     alert('Checking queue...');
//     // Add your logic here
//   };

//   const handlePrintQueue = () => {
//     alert('Printing queue...');
//     // Add your logic here
//   };
//   return (
//     <div className="flex h-screen flex-col">
//       <header className="h-1/5 bg-pink-500 text-center">
//         <div className="m-1 grid grow grid-cols-5 grid-rows-5 gap-2 text-white">
//           <div className="row-span-3 flex place-items-baseline justify-center">
//             <Image src={logo} alt="" width={175} height={175} />
//           </div>
//           <div className="col-span-2 row-span-2 flex place-items-baseline justify-center md:text-4xl lg:text-6xl xl:text-8xl">
//             <big>
//               <b>ช่องบริการ</b>
//             </big>
//             {params.slug}
//           </div>
//           <div className="z-20 col-start-4 row-span-3">
//             <Image src={chock} alt="" width={210} height={210} />
//           </div>
//           <div className="md:text-1xl col-span-2 col-start-2 row-start-3 flex justify-center text-amber-100 lg:text-2xl">
//             <b>
//               <div suppressHydrationWarning>{today}</div>
//             </b>
//           </div>
//           <div className="col-start-5 row-span-3 row-start-1 flex place-items-baseline justify-center">
//             <Image src={moph} alt="" width={175} height={175} />
//           </div>
//         </div>
//       </header>
//       <main className="m-1 flex h-3/4 bg-pink-100">
//         <div className="grid w-full grow grid-cols-3 grid-rows-12 gap-2 text-blue-800">
//           <div className="h-26 row-span-2 flex items-center justify-center rounded-lg bg-green-500 text-white md:text-2xl lg:text-4xl xl:text-6xl">
//             <b>
//               <big>กรุณาเลือก</big>
//             </b>
//           </div>
//           <div className="col-start-1 row-span-2 row-start-3 flex items-center justify-center rounded-lg bg-white md:text-4xl lg:text-7xl">
//             <big>
//               <b>ตรวจสอบคิว</b>
//             </big>
//           </div>
//           <div className="col-start-1 row-span-2 row-start-5 flex items-center justify-center rounded-lg bg-amber-100 md:text-4xl lg:text-7xl">
//             <big>
//               <b>พิมพ์คิว</b>
//             </big>
//           </div>
//           <div className="h-26 col-span-2 col-start-2 row-span-2 row-start-1 flex items-center justify-center rounded-lg bg-green-500 text-white md:text-2xl lg:text-4xl xl:text-6xl">
//             <b>
//               <big>ผู้รับบริการ</big>
//             </b>
//           </div>
//         </div>
//       </main>

//       <footer className="fixed inset-x-0 bottom-0 h-10 bg-pink-500 text-center text-2xl text-white">
//         <Marquee direction="left" autoFill={false} speed={50}>
//           ----- บริษัท เอ ไอ สมาร์ทเทค จำกัด
//           ทดสอบระบบบริหารการจัดยาห้องยาผู้ป่วยนอก โรงพยาบาลอุดรธานี.........
//         </Marquee>
//       </footer>
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(Kiosk), { ssr: false });

// 'use client';

// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import Marquee from 'react-fast-marquee';

// // import useApi from '@/hooks/useApi';
// import moph from '#/public/images/logo MOPH.png';
// import logo from '#/public/images/logoudh01.png';

// import Show from './_components/show';

// const Kiosk = ({ params }: { params: { slug: string } }) => {
//   // const getApi = useApi({
//   //   key: ['queue'],
//   //   method: 'GET',
//   //   url: `medicine/queue/${params.slug}`,
//   // })?.get;

//   // console.log(getApi?.data);
//   const chock = `${process.env.NEXT_PUBLIC_APP_URL}/images/num${params.slug}.png`;
//   // console.log(chock);

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

//   // Button click handlers
//   const handleCheckQueue = () => {
//     alert('Checking queue...');
//     // Add your logic here
//   };

//   const handlePrintQueue = () => {
//     alert('Printing queue...');
//     // Add your logic here
//   };

//   return (
//     <div className="flex h-screen flex-col">
//       <header className="h-1/5 bg-pink-500 text-center">
//         <div className="m-1 grid grow grid-cols-5 grid-rows-5 gap-2 text-white">
//           <div className="row-span-3 flex place-items-baseline justify-center">
//             <Image src={logo} alt="" width={175} height={175} />
//           </div>
//           <div className="col-span-2 row-span-2 flex place-items-baseline justify-center md:text-4xl lg:text-6xl xl:text-8xl">
//             <big>
//               <b>ช่องบริการ</b>
//             </big>
//             {params.slug}
//           </div>
//           <div className="z-20 col-start-4 row-span-3">
//             <Image src={chock} alt="" width={210} height={210} />
//           </div>
//           <div className="md:text-1xl col-span-2 col-start-2 row-start-3 flex justify-center text-amber-100 lg:text-2xl">
//             <b>
//               <div suppressHydrationWarning>{today}</div>
//             </b>
//           </div>
//           <div className="col-start-5 row-span-3 row-start-1 flex place-items-baseline justify-center">
//             <Image src={moph} alt="" width={175} height={175} />
//           </div>
//         </div>
//       </header>
//       <main className="m-1 flex h-3/4 bg-pink-100">
//         <div className="grid w-full grow grid-cols-3 grid-rows-12 gap-2 text-blue-800">
//           <div className="h-26 row-span-2 flex items-center justify-center rounded-lg bg-green-500 text-white md:text-2xl lg:text-4xl xl:text-6xl">
//             <b>
//               <big>กรุณาเลือก</big>
//             </b>
//           </div>

//           {/* Button for checking queue */}
//           <button
//             type="button"
//             onClick={handleCheckQueue}
//             className="col-start-1 row-span-2 row-start-3 flex items-center justify-center rounded-lg bg-white md:text-4xl lg:text-7xl"
//           >
//             <big>
//               <b>ตรวจสอบคิว</b>
//             </big>
//           </button>

//           {/* Button for printing queue */}
//           <button
//             type="button"
//             onClick={handlePrintQueue}
//             className="col-start-1 row-span-2 row-start-5 flex items-center justify-center rounded-lg bg-amber-100 md:text-4xl lg:text-7xl"
//           >
//             <big>
//               <b>พิมพ์คิว</b>
//             </big>
//           </button>

//           <div className="h-26 col-span-2 col-start-2 row-span-2 row-start-1 flex items-center justify-center rounded-lg bg-green-500 text-white md:text-2xl lg:text-4xl xl:text-6xl">
//             <b>
//               <big>ข้อมูลที่โชว์</big>
//             </b>
//             <Show />
//           </div>
//         </div>
//       </main>

//       <footer className="fixed inset-x-0 bottom-0 h-10 bg-pink-500 text-center text-2xl text-white">
//         <Marquee direction="left" autoFill={false} speed={50}>
//           ----- บริษัท เอ ไอ สมาร์ทเทค จำกัด
//           ทดสอบระบบบริหารการจัดยาห้องยาผู้ป่วยนอก โรงพยาบาลอุดรธานี.........
//         </Marquee>
//       </footer>
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(Kiosk), { ssr: false });

// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import Marquee from 'react-fast-marquee';
// import moph from '#/public/images/logo MOPH.png';
// import logo from '#/public/images/logoudh01.png';
// // Import components dynamically
// const Show = dynamic(() => import('./_components/show'), { ssr: false });
// const ShowQueue = dynamic(() => import('./_components/showqueue'), {
//   ssr: false,
// });
// const Kiosk = ({ params }: { params: { slug: string } }) => {
//   const chock = `${process.env.NEXT_PUBLIC_APP_URL}/images/num${params.slug}.png`;
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(
//     null,
//   );
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
//   // Button click handlers
//   const handleCheckQueue = () => {
//     setCurrentComponent(<Show />);
//   };
//   const handlePrintQueue = () => {
//     setCurrentComponent(<ShowQueue />);
//   };
//   return (
//     <div className="flex h-screen flex-col">
//       <header className="h-1/5 bg-pink-500 text-center">
//         <div className="m-1 grid grow grid-cols-5 grid-rows-5 gap-2 text-white">
//           <div className="row-span-3 flex place-items-baseline justify-center">
//             <Image src={logo} alt="" width={175} height={175} />
//           </div>
//           <div className="col-span-2 row-span-2 flex place-items-baseline justify-center md:text-4xl lg:text-6xl xl:text-8xl">
//             <big>
//               <b>ช่องบริการ</b>
//             </big>
//             {params.slug}
//           </div>
//           <div className="z-20 col-start-4 row-span-3">
//             <Image src={chock} alt="" width={210} height={210} />
//           </div>
//           <div className="md:text-1xl col-span-2 col-start-2 row-start-3 flex justify-center text-amber-100 lg:text-2xl">
//             <b>
//               <div suppressHydrationWarning>{today}</div>
//             </b>
//           </div>
//           <div className="col-start-5 row-span-3 row-start-1 flex place-items-baseline justify-center">
//             <Image src={moph} alt="" width={175} height={175} />
//           </div>
//         </div>
//       </header>
//       <main className="m-1 flex h-3/4 bg-pink-100">
//         <div className="grid w-full grow grid-cols-3 grid-rows-12 gap-2 text-blue-800">
//           <div className="h-26 row-span-2 flex items-center justify-center rounded-lg bg-green-500 text-white md:text-2xl lg:text-4xl xl:text-6xl">
//             <b>
//               <big>กรุณาเลือก</big>
//             </b>
//           </div>
//           {/* Button for checking queue */}
//           <button
//             type="button"
//             onClick={handleCheckQueue}
//             className="col-start-1 row-span-2 row-start-3 flex items-center justify-center rounded-lg bg-white md:text-4xl lg:text-7xl"
//           >
//             <big>
//               <b>ตรวจสอบคิว</b>
//             </big>
//           </button>
//           {/* Button for printing queue */}
//           <button
//             type="button"
//             onClick={handlePrintQueue}
//             className="col-start-1 row-span-2 row-start-5 flex items-center justify-center rounded-lg bg-amber-100 md:text-4xl lg:text-7xl"
//           >
//             <big>
//               <b>พิมพ์คิว</b>
//             </big>
//           </button>
//           <div className="h-26 col-span-2 col-start-2 row-span-2 row-start-1 flex items-center justify-center">
//             <div className="flex max-w-full items-center justify-center">
//               <div>{currentComponent}</div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <footer className="fixed inset-x-0 bottom-0 h-10 bg-pink-500 text-center text-2xl text-white">
//         <Marquee direction="left" autoFill={false} speed={50}>
//           ----- บริษัท เอ ไอ สมาร์ทเทค จำกัด
//           ทดสอบระบบบริหารการจัดยาห้องยาผู้ป่วยนอก โรงพยาบาลอุดรธานี.........
//         </Marquee>
//       </footer>
//     </div>
//   );
// };
// export default dynamic(() => Promise.resolve(Kiosk), { ssr: false });

// 'use client';

// import { Button, Card } from '@nextui-org/react';
// import dynamic from 'next/dynamic';
// import React, { useState } from 'react';

// import Footer from './_components/Footer';
// import Header from './_components/Header';
// import Sidebar from './_components/sidebar';
// // นำเข้า Card
// const Kiosk: React.FC = () => {
//   const [foundPatient, setFoundPatient] = useState<any>(null); // State สำหรับเก็บข้อมูลผู้ป่วย

//   const handleClose = () => {
//     setFoundPatient(''); // เคลียร์ค่า patientId
//   };
//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* ส่วนหัว */}
//       <Header />
//       <div className="flex grow">
//         {/* แถบด้านข้าง */}
//         <Sidebar setFoundPatient={setFoundPatient} />{' '}
//         {/* ส่งฟังก์ชันไปที่ Sidebar */}
//         <div className="h-full grow bg-white">
//           {foundPatient ? (
//             <Card className="p-4 shadow-lg">
//               {' '}
//               {/* ใช้ Card คลุมเนื้อหา */}
//               <div>
//                 <p>รหัสคิว: {foundPatient.queue_code}</p>
//                 <p>ชื่อ: {foundPatient.full_name}</p>
//                 <p>VN: {foundPatient.vnCode}</p>
//                 <p>HN: {foundPatient.hnCode}</p>
//                 <p>
//                   จำนวนยานำจ่าย:
//                   {foundPatient.arranged ? foundPatient.arranged.length : 0}
//                 </p>
//                 <p>สถานะ: {foundPatient.prescrip_status}</p>

//                 <Button
//                   onClick={handleClose}
//                   className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//                 >
//                   ปิด
//                 </Button>
//               </div>
//             </Card>
//           ) : (
//             'กรุณาเลือกทางด้านซ้าย'
//           )}
//         </div>
//       </div>
//       {/* ส่วนท้าย */}
//       <Footer />
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(Kiosk), { ssr: false });

// 'use client';
// import { Button } from '@nextui-org/react';
// import dynamic from 'next/dynamic';
// import React, { useState } from 'react';
// import Footer from './_components/Footer';
// import Header from './_components/Header';
// import Sidebar from './_components/sidebar';
// // นำเข้า Card
// const Kiosk: React.FC = () => {
//   const [foundPatient, setFoundPatient] = useState<any>(null); // State สำหรับเก็บข้อมูลผู้ป่วย
//   const handleClose = () => {
//     setFoundPatient(''); // เคลียร์ค่า patientId
//   };
//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* ส่วนหัว */}
//       <Header />
//       <div className="flex grow">
//         {/* แถบด้านข้าง */}
//         <Sidebar setFoundPatient={setFoundPatient} />
//         {/* ส่งฟังก์ชันไปที่ Sidebar */}
//         <div className="flex h-auto w-full flex-col items-center justify-center bg-gray-50 p-1">
//           {foundPatient ? (
//             <div className="flex h-auto w-full flex-col justify-start rounded-xl bg-white p-[10%] shadow-lg">
//               {/* Use Card to wrap the content */}
//               <div className="grow space-y-2">
//                 {' '}
//                 {/* Reduced space between elements */}
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2">
//                       <p className="text-[4vw] font-semibold text-black md:text-[3vw]">
//                         รหัสคิว:
//                         {' '}
//                         {foundPatient.queue_code || 'ไม่ทราบ'}
//                       </p>
//                     </div>

//                     <div className="flex w-full justify-between">
//                       <p className="text-[2.5vw] text-black md:text-[2vw]">
//                         HN:
//                         {' '}
//                         {foundPatient.hnCode || 'ไม่ทราบ'}
//                       </p>
//                     </div>

//                     <p className="text-[4vw] font-semibold text-black md:text-[3vw]">
//                       ชื่อ:
//                       {' '}
//                       {foundPatient.full_name}
//                     </p>

//                     <div className="flex items-center justify-between">
//                       <p className="text-[4vw] text-black md:text-[2.5vw]">
//                         จำนวนยานำจ่าย:
//                         {' '}
//                         {foundPatient.arranged ? foundPatient.arranged.length : 'ไม่ทราบ'}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-end">
//                     <p className="text-[5vw] font-semibold text-black md:text-[3.5vw]">
//                       {/* Larger font size for status */}
//                       สถานะ:
//                       {' '}
//                       {foundPatient.prescrip_status || 'ไม่ทราบ'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               {/* Move the Close button to the bottom */}
//               <div className="mt-4 flex justify-end">
//                 <Button
//                   onClick={handleClose}
//                   className="flex h-auto cursor-pointer items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-[4vw] text-white transition duration-200 ease-in-out hover:bg-red-600 md:text-[2.5vw]"
//                 >
//                   ปิด
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <p className="4xl:text-8xl px-6 py-4 text-black md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl">
//               กรุณาเลือกทางด้านซ้าย
//             </p>
//           )}
//         </div>
//       </div>
//       {/* ส่วนท้าย */}
//       <Footer />
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(Kiosk), { ssr: false });

// 'use client';
// import 'react-toastify/dist/ReactToastify.css';
// import dynamic from 'next/dynamic';
// import Image from 'next/image'; // สำหรับ Next.js
// import React, { useRef, useState } from 'react';
// import { FaPrint, FaTimes } from 'react-icons/fa';
// import { ReactBarcode, Renderer } from 'react-jsbarcode';
// import { useReactToPrint } from 'react-to-print';
// import { toast } from 'react-toastify';
// import { ReactNode } from 'react';

// import Qrcodeline from '#/public/images/qrcodeline.png';

// import Footer from './_components/Footer';
// import Header from './_components/Header';
// import Sidebar from './_components/sidebar';

// const Kiosk = ({id }: { children: ReactNode; id: string }) => {
//   const [, setQ] = useState('');
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const printRef = useRef(null);
//   const [foundPatient, setFoundPatient] = useState<any>(null);
//   const [foundPatientprint, setFoundPatientprint] = useState<any>(null);
//   const now = new Date();
//   const date = now.toLocaleDateString('th-TH');
//   const time = now.toLocaleTimeString('th-TH');

//   const handlePrintPatient = useReactToPrint({
//     content: () => printRef.current,
//     onAfterPrint: () => {
//       toast.success('ปริ้นสำเร็จ');
//     },
//   });

//   const handlePrintQueue = async () => {
//     if (!foundPatient) {
//       toast.warn('กรุณาค้นหาผู้ป่วยก่อน');
//       inputRef.current?.focus();
//       return;
//     }

//     setFoundPatientprint(foundPatient);

//     if (!printRef.current) {
//       toast.warn('ไม่มีข้อมูลสำหรับพิมพ์');
//       return;
//     }

//     try {
//       handlePrintPatient();

//       setQ('');
//       inputRef.current?.focus();
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.error(`เกิดข้อผิดพลาดในการพิมพ์: ${error.message}`);
//       } else {
//         toast.error(`เกิดข้อผิดพลาดในการพิมพ์: ${String(error)}`);
//       }
//     }
//   };

//   const handleClose = () => {
//     setFoundPatient(null);
//   };

//   const getStatusTextClass = () => {
//     if (window.innerWidth >= 1920) return 'text-7xl';
//     if (window.innerWidth >= 1536) return 'text-6xl';
//     if (window.innerWidth >= 1280) return 'text-5xl';
//     if (window.innerWidth >= 1024) return 'text-4xl';
//     return 'text-2xl';
//   };

//   const getStatusTextClass1 = () => {
//     if (window.innerWidth >= 1920) return 'text-6xl';
//     if (window.innerWidth >= 1536) return 'text-5xl';
//     if (window.innerWidth >= 1280) return 'text-4xl';
//     if (window.innerWidth >= 1024) return 'text-3xl';
//     return 'text-2xl';
//   };
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header id={id} />
//       <div className="flex grow">
//         <Sidebar setFoundPatient={setFoundPatient} id={id} />
//         <div className="flex h-auto w-[60vw] flex-col items-center justify-center bg-gray-50 p-4">
//           {foundPatient ? (
//             <div className="flex w-full flex-col rounded-xl bg-white p-6 shadow-lg md:p-10">
//               {/* การ์ดข้อมูล */}
//               <div className="space-y-4">
//                 <div className="flex flex-col space-y-6">
//                   {/* สถานะอยู่เหนือข้อมูลอื่น */}
//                   <div className="flex items-center justify-end">
//                     <div className="flex items-center rounded-lg border-2 border-black p-3">

//                       <p className={`font-semibold text-black ${getStatusTextClass()}`}>
//                         สถานะ :
//                         {' '}
//                         {foundPatient.prescrip_status || ' ไม่ทราบ'}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex flex-col space-y-3">
//                         <p className={`font-semibold text-black ${getStatusTextClass()}`}>
//                           หมายเลขรับบริการ :
//                           <span className={`font-semibold text-black ${getStatusTextClass()}`}>
//                             {foundPatient.queue_code || ' ไม่ทราบ '}
//                           </span>
//                         </p>

//                       </div>

//                       <p className={`font-semibold text-black ${getStatusTextClass1()}`}>

//                         {' '}
//                         {foundPatient.full_name}
//                       </p>
//                       <div className="mt-3 flex w-full justify-between">
//                         {/* <p className="w-1/3 text-[9vw] text-black md:text-4xl">
//                           VN :
//                           {' '}
//                           {foundPatient.vnCode || 'ไม่ทราบ'}
//                         </p> */}
//                         <p className={`font-semibold text-black ${getStatusTextClass()}`}>
//                           HN :
//                           {' '}
//                           {foundPatient.hnCode || 'ไม่ทราบ'}
//                         </p>
//                       </div>

//                       <div className="mt-3 flex w-full justify-between">
//                         <p className={`font-semibold text-black ${getStatusTextClass()}`}>
//                           คาดว่าได้รับยา
//                         </p>
//                       </div>
//                       <div className="mt-3 flex justify-between">
//                         <p className={`font-semibold text-black ${getStatusTextClass()}`}>
//                           {' '}
//                           {(() => {
//                             const createdAt = new Date(foundPatient.createdAt);
//                             const updatedAt = new Date(foundPatient.updatedAt);
//                             if (!isNaN(createdAt.getTime()) && !isNaN(updatedAt.getTime())) {
//                               // คำนวณระยะห่างระหว่าง `createdAt` และ `updatedAt`
//                               const diffTime = updatedAt.getTime() - createdAt.getTime();
//                               // คำนวณค่าเฉลี่ยของระยะเวลา และเพิ่มไปยัง `updatedAt`
//                               const estimatedTime = new Date(updatedAt.getTime() + diffTime / 2);
//                               return estimatedTime.toLocaleString('th-TH', {
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 day: 'numeric',
//                                 month: 'short',
//                                 year: 'numeric'
//                               });
//                             } else {
//                               return 'ไม่ทราบ';
//                             }
//                           })()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ปุ่มปิดและพิมพ์คิว */}

//                 <div className="mt-6 flex justify-end space-x-4">
//                   <div
//                     role="button"
//                     tabIndex={0}
//                     onClick={handleClose}

//                     className={`h-40 w-full max-w-4xl rounded-xl bg-red-600 text-white   items-center justify-center flex justify-center items-center ${window.innerWidth >= 1920
//                       ? 'text-8xl'
//                       : window.innerWidth >= 1536
//                         ? 'text-6xl'
//                         : window.innerWidth >= 1280
//                           ? 'text-5xl'
//                           : window.innerWidth >= 1024
//                             ? 'text-4xl'
//                             : 'text-2xl'
//                       }`}
//                   >
//                     <FaTimes className="text-20% text-white" />
//                   </div>
//                   <div
//                     role="button"
//                     tabIndex={0}
//                     onClick={handlePrintQueue}
//                     onKeyDown={event =>
//                       event.key === 'Enter' ? handlePrintQueue() : null}
//                     className={`h-40 w-full max-w-4xl rounded-xl bg-green-600 text-white   items-center justify-center flex justify-center items-center ${window.innerWidth >= 1920
//                       ? 'text-8xl'
//                       : window.innerWidth >= 1536
//                         ? 'text-6xl'
//                         : window.innerWidth >= 1280
//                           ? 'text-5xl'
//                           : window.innerWidth >= 1024
//                             ? 'text-4xl'
//                             : 'text-2xl'
//                       }`}
//                   >
//                     <FaPrint className="text-20% text-white" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="flex flex-col items-center">
//                 <p className={`text-black ${getStatusTextClass()}`}>
//                   กรุณาเลือกทางด้านซ้าย
//                 </p>

//               </div>

//             </div>
//           )}
//           {' '}
//           {/* Print Section */}
//           <div ref={printRef} className="hidden print:block">
//             {foundPatientprint && (
//               <div key={foundPatientprint.id} className="text-center">
//                 <div className="text-4xl font-bold leading-tight">คิวรับยา</div>
//                 <br />
//                 <div className="text-4xl font-bold leading-tight">
//                   {foundPatientprint.queue_code}
//                 </div>
//                 <br />
//                 <div className="text-3xl font-bold leading-tight">ห้องยาชั้น 2</div>
//                 <br />
//                 <div className="text-4xl font-bold leading-tight">HN: {foundPatientprint.hnCode}</div>
//                 <br />
//                 <div className="text-lg leading-tight">{foundPatientprint.full_name}</div>
//                 <p className="text-[10vw] font-semibold text-black md:text-xl">คาดว่าได้รับยา</p>
//                 <p className="text-[10vw] font-semibold text-black md:text-xl">
//                   {(() => {
//                     const createdAt = new Date(foundPatientprint.createdAt); // ใช้ foundPatientprint แทน foundPatient
//                     const updatedAt = new Date(foundPatientprint.updatedAt);

//                     if (!isNaN(createdAt.getTime()) && !isNaN(updatedAt.getTime())) {
//                       const diffTime = updatedAt.getTime() - createdAt.getTime();
//                       const estimatedTime = new Date(updatedAt.getTime() + diffTime / 2);
//                       return estimatedTime.toLocaleString('th-TH', {
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric'
//                       });
//                     } else {
//                       return 'ไม่ทราบ';
//                     }
//                   })()}
//                 </p>
//                 <br />
//                 <div className="text-2xl font-bold leading-tight">โรงพยาบาลอุดรธานี</div>
//                 <br />
//                 <div className="flex justify-center leading-tight">
//                   <ReactBarcode
//                     value={foundPatientprint.hnCode}
//                     options={{
//                       format: 'CODE128',
//                       width: 1,
//                       height: 40,
//                       displayValue: true,
//                       background: 'rgba(0, 0, 0, 0)',
//                     }}
//                     renderer={Renderer.SVG} // ใช้ Renderer.SVG ที่ถูกต้อง
//                   />
//                 </div>
//                 <br />
//                 <div className="text-lg leading-tight">{`${date} ${time}`}</div>
//                 <br />
//                 <div className="text-xl font-bold leading-tight">รับข้อความเรียกคิวผ่านออฟไลน์</div>
//                 <div className="flex justify-center leading-tight">
//                   <Image src={Qrcodeline} alt="" width={120} height={100} />
//                 </div>
//                 <div className="text-xl font-bold leading-tight">Official Line @udhospital</div>
//                 <div className="text-sm leading-tight">***ขั้นตอนการรับข้อความเรียกคิวผ่านไลน์***</div>
//                 <div className="px-3 text-left leading-tight">
//                   <div className="text-sm leading-tight">1. แสกนคิวอาร์โค้ดด้านบน หรือ แอดไลน์ @udhospital</div>
//                   <div className="text-sm leading-tight">2. เข้า Official Line โรงพยาบาลอุดรธานี</div>
//                   <div className="text-sm leading-tight">3. กดเมนูยืนยันตัวตนและทำการยืนยันตัวตน</div>
//                   <div className="text-sm leading-tight">4. เมื่อถึงเวลารับยาจะมีข้อความแจ้งเตือนไปยังไลน์โรงพยาบาลอุดรธานี</div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {' '}
//         </div>
//       </div>
//       {/* ส่วนท้าย */}
//       <Footer id={id} />
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(Kiosk), { ssr: false });

'use client';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FaPrint, FaTimes } from 'react-icons/fa';
import { ReactBarcode, Renderer } from 'react-jsbarcode';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

import Qrcodeline from '#/public/images/qrcodeline.png';

import Footer from './_components/Footer';
import Sidebar from './_components/sidebar';

const Kiosk: React.FC = () => {
  const [, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const printRef = useRef(null);
  const [foundPatient, setFoundPatient] = useState<any>(null);
  const [foundPatientprint, setFoundPatientprint] = useState<any>(null);
  const now = new Date();
  const date = now.toLocaleDateString('th-TH');
  const time = now.toLocaleTimeString('th-TH');

  const handlePrintPatient = useReactToPrint({
    contentRef: printRef,
    onAfterPrint: () => {
      toast.success('ปริ้นสำเร็จ');
    },
  });

  const handlePrintQueue = async () => {
    if (!foundPatient) {
      toast.warn('กรุณาค้นหาผู้ป่วยก่อน');
      inputRef.current?.focus();
      return;
    }

    setFoundPatientprint(foundPatient);

    if (!printRef.current) {
      toast.warn('ไม่มีข้อมูลสำหรับพิมพ์');
      return;
    }

    try {
      handlePrintPatient();

      setQ('');
      inputRef.current?.focus();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`เกิดข้อผิดพลาดในการพิมพ์: ${error.message}`);
      } else {
        toast.error(`เกิดข้อผิดพลาดในการพิมพ์: ${String(error)}`);
      }
    }
  };

  const handleClose = () => {
    setFoundPatient(null);
  };

  const getStatusTextClass = () => {
    if (window.innerWidth >= 1920) {
      return 'text-7xl';
    }
    if (window.innerWidth >= 1536) {
      return 'text-6xl';
    }
    if (window.innerWidth >= 1280) {
      return 'text-5xl';
    }
    if (window.innerWidth >= 1024) {
      return 'text-4xl';
    }
    return 'text-2xl';
  };

  const getStatusTextClass1 = () => {
    if (window.innerWidth >= 1920) {
      return 'text-6xl';
    }
    if (window.innerWidth >= 1536) {
      return 'text-5xl';
    }
    if (window.innerWidth >= 1280) {
      return 'text-4xl';
    }
    if (window.innerWidth >= 1024) {
      return 'text-3xl';
    }
    return 'text-2xl';
  };
  // console.log(`ตรวจสอบข้อมูล: ${window.location.href}`);
  const currentUrl = window.location.href;
  const lastSegment = currentUrl.split('/').pop();

  let kioskMessage = '  ';

  if (lastSegment === '1') {
    kioskMessage += 'K1';
  } else if (lastSegment === '2') {
    kioskMessage += 'K2';
  } else if (lastSegment === '3') {
    kioskMessage += 'K3';
  } else {
    kioskMessage += `K${lastSegment}`;
  }

  return (

    <div className="flex grow">
      <Sidebar setFoundPatient={setFoundPatient} />
      <div className="flex h-auto w-[60vw] flex-col items-center justify-center bg-gray-50 p-4">
        {foundPatient ? (
          <div className="flex w-full flex-col rounded-xl bg-white p-6 shadow-lg md:p-10">

            <div className="space-y-4">
              <div className="flex flex-col space-y-6">

                <div className="flex items-center justify-end">
                  <div className="flex items-center rounded-lg border-2 border-black p-3">

                    <p className={`font-semibold text-black ${getStatusTextClass()}`}>
                      สถานะ :
                      {' '}
                      {foundPatient.prescrip_status || ' ไม่ทราบ'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col space-y-3">
                      <p className={`font-semibold text-black ${getStatusTextClass()}`}>
                        หมายเลขรับบริการ :
                        <span className={`font-semibold text-black ${getStatusTextClass()}`}>
                          {foundPatient.queue_code || ' ไม่ทราบ '}
                        </span>
                      </p>

                    </div>

                    <p className={`font-semibold text-black ${getStatusTextClass1()}`}>

                      {' '}
                      {foundPatient.full_name}
                    </p>
                    <div className="mt-3 flex w-full justify-between">

                      <p className={`font-semibold text-black ${getStatusTextClass()}`}>
                        HN :
                        {' '}
                        {foundPatient.hnCode || 'ไม่ทราบ'}
                      </p>
                    </div>

                    <div className="mt-3 flex w-full justify-between">
                      <p className={`font-semibold text-black ${getStatusTextClass()}`}>
                        คาดว่าได้รับยา
                      </p>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <p className={`font-semibold text-black ${getStatusTextClass()}`}>
                        {' '}
                        {(() => {
                          const createdAt = new Date(foundPatient.createdAt);
                          const updatedAt = new Date(foundPatient.updatedAt);
                          if (!isNaN(createdAt.getTime()) && !isNaN(updatedAt.getTime())) {
                            const diffTime = updatedAt.getTime() - createdAt.getTime();

                            const estimatedTime = new Date(updatedAt.getTime() + diffTime / 2);
                            return estimatedTime.toLocaleString('th-TH', {
                              hour: '2-digit',
                              minute: '2-digit',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            });
                          } else {
                            return 'ไม่ทราบ';
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleClose}

                  className={`flex h-40 w-full max-w-4xl items-center   justify-center rounded-xl bg-red-600 text-white ${window.innerWidth >= 1920
                    ? 'text-8xl'
                    : window.innerWidth >= 1536
                      ? 'text-6xl'
                      : window.innerWidth >= 1280
                        ? 'text-5xl'
                        : window.innerWidth >= 1024
                          ? 'text-4xl'
                          : 'text-2xl'
                  }`}
                >
                  <FaTimes className="text-20% text-white" />
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handlePrintQueue}
                  onKeyDown={event =>
                    event.key === 'Enter' ? handlePrintQueue() : null}
                  className={`flex h-40 w-full max-w-4xl items-center   justify-center rounded-xl bg-green-600 text-white ${window.innerWidth >= 1920
                    ? 'text-8xl'
                    : window.innerWidth >= 1536
                      ? 'text-6xl'
                      : window.innerWidth >= 1280
                        ? 'text-5xl'
                        : window.innerWidth >= 1024
                          ? 'text-4xl'
                          : 'text-2xl'
                  }`}
                >
                  <FaPrint className="text-20% text-white" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center">
              <p className={`text-black ${getStatusTextClass()}`}>
                กรุณาเลือกทางด้านซ้าย
              </p>

            </div>

          </div>
        )}
        {' '}

        <div ref={printRef} className="hidden print:block">
          {foundPatientprint && (
            <div key={foundPatientprint.id} className="text-center">
              <div className="text-3xl font-bold leading-tight">คิวรับยา</div>
              <br />
              <div className="text-3xl font-bold leading-tight">
                {foundPatientprint.queue_code}
              </div>
              <br />
              <div className="text-2xl font-bold leading-tight">
                ห้องยาชั้น 2
              </div>
              <br />
              <div className="text-3xl font-bold leading-tight">
                HN:
                {' '}
                {foundPatientprint.hnCode}
              </div>
              <br />
              <div className="text-sm leading-tight">
                ชื่อ-นามสกุล:
                {' '}
                {foundPatientprint.full_name}
              </div>
              <br />
              <div className="text-base font-bold leading-tight">
                อายุรกรรมทั่วไป
              </div>
              <br />
              <div className="text-base font-bold leading-tight">
                โรงพยาบาลอุดรธานี
              </div>
              <br />
              <div className="flex justify-center leading-tight">
                <ReactBarcode
                  value={foundPatientprint.queue_code}
                  options={{
                    format: 'CODE128',
                    width: 1,
                    height: 40,
                    displayValue: true,
                    background: 'rgba(0, 0, 0, 0)',
                  }}
                  renderer={Renderer.SVG}
                />
              </div>
              <br />
              <div className="text-sm font-bold leading-tight">{`${date} ${time}`}</div>
              <br />
              <div className="text-base font-bold leading-tight">
                รับข้อความเรียกคิวผ่านแอฟไลน์
              </div>
              <div className="flex justify-center leading-tight">
                <Image src={Qrcodeline} alt="" width={120} height={100} />
                {' '}

              </div>
              <div className="text-base font-bold  leading-tight">
                Official Line @udhospital
              </div>
              <div className="text-xs font-bold leading-tight">
                ***ขั้นตอนการรับข้อความเรียกคิวผ่านไลน์***
              </div>
              <div className="px-3 text-left leading-tight">
                <div className="text-xs font-bold leading-tight">
                  1. แสกนคิวอาร์โค้ดด้านบน
                  <div className="px-3 text-left leading-tight">

                    หรือ แอดไลน์ @udhospital
                  </div>
                </div>
                <div className="text-xs font-bold leading-tight">
                  2. เข้า Official Line โรงพยาบาลอุดรธานี
                </div>
                <div className="text-xs font-bold leading-tight">
                  3. กดเมนูยืนยันตัวตนและทำการยืนยันตัวตน
                </div>
                <div className="text-xs font-bold leading-tight">
                  4.
                  เมื่อถึงเวลารับยาจะมีข้อความแจ้งเตือนไปยังไลน์โรงพยาบาลอุดรธานี
                </div>
              </div>

              <div className="px-3 text-left leading-tight">
                <div className="pr-5 text-right text-sm leading-tight">{kioskMessage}</div>
                {' '}

              </div>

            </div>
          )}
        </div>

        {' '}
      </div>

      <Footer />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Kiosk), { ssr: false });
