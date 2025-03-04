/* eslint-disable react/no-array-index-key */

'use client';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
} from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import useApi from '@/hooks/useApi';
import { DateTimeLongTH } from '@/libs/dateTime';

import ConfrimAll from './[slug]/_components/confrimall';
import Autoprint from './[slug]/_components/printpage';

const Sidebar = () => {
  const [patient, setPatient] = useState<any[]>([]);
  const [selectedQueueType, setSelectedQueueType] = useState<string>('');
  const [isInvalid, setIsInvalid] = useState(true);
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const [isAutoPrintEnabled, setIsAutoPrintEnabled] = useState<boolean>(true);
  const [datap, setDatap] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  // const pathname = usePathname();

  const getApi = useApi({
    key: ['prescription'],
    method: 'GET',
    url: `medicine/prescription/station/${selectedQueueType}`,
  })?.get;

  useEffect(() => {
    if (selectedQueueType) {
      getApi?.refetch();
    }
  }, [getApi, selectedQueueType]);

  useEffect(() => {
    const data = getApi?.data?.data;
    const detail = getApi?.data?.detail;
    const savedQueueType = localStorage.getItem('selectedQueueType');
    const savedAutoPrintStatus = localStorage.getItem('isAutoPrintEnabled');

    if (savedQueueType) {
      setSelectedQueueType(savedQueueType);
      setIsInvalid(false);
    }
    if (savedAutoPrintStatus !== null) {
      setIsAutoPrintEnabled(JSON.parse(savedAutoPrintStatus));
    }

    if (data && detail) {
      // const filteredDetails = detail.filter(
      //   (detailItem: { print_status: number }) => detailItem.print_status === 0,
      // );

      // const matchedSets = data
      //   .filter((item: { id: any }) =>
      //     filteredDetails.some(
      //       (detailItem: { prescripId: any }) => detailItem.prescripId === item.id,
      //     ),
      //   )
      //   .map((matchedItem: { id: any }) => ({
      //     data: matchedItem,
      //     details: filteredDetails.filter(
      //       (detailItem: { prescripId: any }) => detailItem.prescripId === matchedItem.id,
      //     ),
      //   }));

      const filteredDetails = detail.filter((item: { print_status: number }) => item.print_status === 0);

      // ใช้ Map เพื่อจัดกลุ่ม filteredDetails ตาม prescripId
      const detailMap = new Map();
      filteredDetails.forEach((detailItem: { prescripId: any }) => {
        if (!detailMap.has(detailItem.prescripId)) {
          detailMap.set(detailItem.prescripId, []);
        }
        detailMap.get(detailItem.prescripId).push(detailItem);
      });

      // ใช้ Map นี้เพื่อจับคู่ข้อมูล
      const matchedSets = data.reduce((result: { data: any; details: any }[], item: { id: any }) => {
        if (detailMap.has(item.id)) {
          result.push({
            data: item,
            details: detailMap.get(item.id),
          });
        }
        return result;
      }, []);
      setCombinedData(matchedSets);
      // setDetail(matchedSets1[0]?.details || []);
      setData(matchedSets[0]?.details || []);
      setDatap(matchedSets[0]?.data || null);

      setPatient(data);
    }
  }, [getApi?.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      getApi?.refetch();
    }, 10000); // ตั้งเวลาให้เช็คทุก 10 วินาที

    // ทำการล้าง interval เมื่อคอมโพเนนต์จะถูกลบออกหรือเมื่อ getApi หรือข้อมูลมีการเปลี่ยนแปลง
    return () => clearInterval(interval);
  }, [getApi]);

  // useEffect(() => {
  //   if (pathname === '/medicine/station') {
  //     getApi?.refetch();
  //   }
  // }, [getApi, pathname]);

  const handleQueueTypeChange = (value: string) => {
    setSelectedQueueType(value);
    setIsInvalid(!value);
    localStorage.setItem('selectedQueueType', value);
  };

  const handleSwitchChange = (isSelected: boolean) => {
    setIsAutoPrintEnabled(isSelected);
    localStorage.setItem('isAutoPrintEnabled', JSON.stringify(isSelected));
  };
  const handleFetchAndPost = async (id: string) => {
    try {
      // ดึงข้อมูลจาก API
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/autoload/cabinet/${id}`);
      // const response = await axios.get(`http://localhost:3000/api/autoload/cabinet/${id}`);
      const data = response?.data;

      // console.log('sdadads', data);
      if (data) {
        // ถ้ามีข้อมูล ให้ POST ไปยัง URL
        const postResponse = await axios.post(`${process.env.UDH_KEY_API_URL}/Cabinet_Command`, data);
        // const postResponse = await axios.post(`http://192.168.3.20:1234/sendCommand/`, data);

        // แสดงผลลัพธ์จาก POST request
        // eslint-disable-next-line no-console
        console.log('POST Response:', postResponse.data);
      } else {
        console.error('No data received from GET request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // console.log(patient);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
      <div className="flex justify-center">
        <Switch
          isSelected={isAutoPrintEnabled}
          onValueChange={handleSwitchChange}
        >
          พิมพ์ ออโต้
        </Switch>
      </div>

      <div className="flex justify-center">
        <RadioGroup
          isRequired
          label="เลือกสเตชั่น"
          orientation="horizontal"
          className="items-center"
          isInvalid={isInvalid}
          value={selectedQueueType}
          onValueChange={handleQueueTypeChange}
          isDisabled={!!selectedQueueType}
        >
          {['A', 'B', 'C', 'D', 'E'].map(value => (
            <Radio key={value} value={value}>{value}</Radio>
          ))}
        </RadioGroup>
      </div>

      {selectedQueueType && patient.length > 0
        ? (
            patient.map((item, index) => (
              <Card shadow="sm" key={index} className="mx-4">
                <Link
                  href={`/medicine/station/${item.id}`}
                  onClick={() => {
                    handleFetchAndPost(item.id); // เรียกฟังก์ชันเมื่อคลิก
                  }}
                >

                  <CardHeader className="flex gap-3">
                    <Image
                      isZoomed
                      alt="nextui logo"
                      height={50}
                      radius="sm"
                      src="/avatar.jpg"
                      width={50}
                      className="h-[50px] w-full object-cover"
                      loading="lazy"
                    />
                    <div className="justify-between text-small">
                      <p className="text-medium">
                        {item.full_name}
                        {' '}
                        คิวที่:
                        {' '}
                        <b>
                          {item.queue_type}
                          {item.queue_code}
                        </b>
                        {' '}
                      </p>
                      <p className="text-small text-default-500">
                        HN:
                        {' '}
                        {item.hnCode}
                        {' '}
                        regNo:
                        {' '}
                        {item.prescripCode}
                      </p>
                      <p className="text-small text-default-500">
                        ห้องตรวจ:
                        {' '}
                        {item.dept_name}
                      </p>
                      <Checkbox isSelected={item.urgent}>ด่วน</Checkbox>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>
                      ยืนยันการจัดยา
                      <b>คลิกที่นี้</b>
                    </p>
                  </CardBody>
                  <CardFooter className="justify-between text-small">
                    วันเวลาลงทะเบียน:
                    {' '}
                    <b>{DateTimeLongTH(item?.createdAt)}</b>
                  </CardFooter>

                </Link>
                {/* <div className="justify-between">
                  <ConfrimAll data={item.id} location={selectedQueueType} />
                </div> */}
                <CardFooter className="flex justify-center">
                  <ConfrimAll data={item.id} location={selectedQueueType} />
                </CardFooter>

              </Card>
            ))
          )
        : (
            selectedQueueType && <Spinner label="รอใบสั่งยา..." color="danger" />
          )}

      {isAutoPrintEnabled && combinedData.length > 0 && <Autoprint data={data} datap={datap} />}
    </div>
  );
};

export default Sidebar;

// 'use client';

// import {
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   Checkbox,
//   Image,
//   Radio,
//   RadioGroup,
//   Spinner,
//   Switch,
// } from '@nextui-org/react';
// import axios from 'axios';
// import Link from 'next/link';
// import React, { useEffect, useMemo, useState } from 'react';

// import useApi from '@/hooks/useApi';
// import { DateTimeLongTH } from '@/libs/dateTime';

// import ConfrimAll from './[slug]/_components/confrimall';
// import Autoprint from './[slug]/_components/printpage';

// const Sidebar = () => {
//   const [patient, setPatient] = useState<any[]>([]);
//   const [selectedQueueType, setSelectedQueueType] = useState<string>('');
//   const [isInvalid, setIsInvalid] = useState(true);
//   const [combinedData, setCombinedData] = useState<any[]>([]);
//   const [isAutoPrintEnabled, setIsAutoPrintEnabled] = useState<boolean>(true);
//   const [datap, setDatap] = useState<any>(null);
//   const [data, setData] = useState<any>(null);

//   const getApi = useApi({
//     key: ['prescription'],
//     method: 'GET',
//     url: `medicine/prescription/station/${selectedQueueType}`,
//   })?.get;

//   useEffect(() => {
//     if (selectedQueueType) {
//       getApi?.refetch();
//     }
//   }, [getApi, selectedQueueType]);

//   useEffect(() => {
//     const data = getApi?.data?.data;
//     const detail = getApi?.data?.detail;
//     const savedQueueType = localStorage.getItem('selectedQueueType');
//     const savedAutoPrintStatus = localStorage.getItem('isAutoPrintEnabled');

//     if (savedQueueType) {
//       setSelectedQueueType(savedQueueType);
//       setIsInvalid(false);
//     }
//     if (savedAutoPrintStatus !== null) {
//       setIsAutoPrintEnabled(JSON.parse(savedAutoPrintStatus));
//     }

//     if (data && detail) {
//       setPatient(data);
//     }
//   }, [getApi?.data]);

//   const filteredDetails = useMemo(() => {
//     const detail = getApi?.data?.detail;
//     return detail?.filter((detailItem: { print_status: number }) => detailItem.print_status === 0);
//   }, [getApi?.data?.detail]);

//   const matchedSets = useMemo(() => {
//     const data = getApi?.data?.data;
//     if (!data || !filteredDetails) {
//       return [];
//     }
//     return data
//       .filter((item: { id: any }) =>
//         filteredDetails.some((detailItem: { prescripId: any }) => detailItem.prescripId === item.id),
//       )
//       .map((matchedItem: { id: any }) => ({
//         data: matchedItem,
//         details: filteredDetails.filter(
//           (detailItem: { prescripId: any }) => detailItem.prescripId === matchedItem.id,
//         ),
//       }));
//   }, [getApi?.data?.data, filteredDetails]);

//   useEffect(() => {
//     if (matchedSets.length > 0) {
//       setCombinedData(matchedSets);
//       setData(matchedSets[0]?.details || []);
//       setDatap(matchedSets[0]?.data || null);
//     }
//   }, [matchedSets]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       getApi?.refetch();
//     }, 10000); // เช็คทุก 10 วินาที

//     return () => clearInterval(interval);
//   }, [getApi]);

//   const handleQueueTypeChange = (value: string) => {
//     setSelectedQueueType(value);
//     setIsInvalid(!value);
//     localStorage.setItem('selectedQueueType', value);
//   };

//   const handleSwitchChange = (isSelected: boolean) => {
//     setIsAutoPrintEnabled(isSelected);
//     localStorage.setItem('isAutoPrintEnabled', JSON.stringify(isSelected));
//   };

//   const handleFetchAndPost = async (id: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/autoload/cabinet/${id}`);
//       const data = response?.data;
//       if (data) {
//         const postResponse = await axios.post(`http://192.168.3.20:1234/sendCommand/`, data);
//         console.log('POST Response:', postResponse.data);
//       } else {
//         console.error('No data received from GET request');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
//       <div className="flex justify-center">
//         <Switch
//           isSelected={isAutoPrintEnabled}
//           onValueChange={handleSwitchChange}
//         >
//           Automatic prints
//         </Switch>
//       </div>

//       <div className="flex justify-center">
//         <RadioGroup
//           isRequired
//           label="เลือกสเตชั่น"
//           orientation="horizontal"
//           className="items-center"
//           isInvalid={isInvalid}
//           value={selectedQueueType}
//           onValueChange={handleQueueTypeChange}
//         >
//           {['A', 'B', 'C', 'D', 'E'].map(value => (
//             <Radio key={value} value={value}>{value}</Radio>
//           ))}
//         </RadioGroup>
//       </div>

//       {selectedQueueType && patient.length > 0
//         ? (
//             patient.map((item, index) => (
//               <Card shadow="sm" key={index} className="mx-4">
//                 <Link
//                   href={`/medicine/station/${item.id}`}
//                   onClick={() => handleFetchAndPost(item.id)}
//                 >
//                   <CardHeader className="flex gap-3">
//                     <Image
//                       isZoomed
//                       alt="nextui logo"
//                       height={50}
//                       radius="sm"
//                       src="/avatar.jpg"
//                       width={50}
//                       className="h-[50px] w-full object-cover"
//                       loading="lazy"
//                     />
//                     <div className="justify-between text-small">
//                       <p className="text-medium">{item.full_name}</p>
//                       <p className="text-small text-default-500">
//                         HN:
//                         {' '}
//                         {item.hnCode}
//                         {' '}
//                         Que:
//                         {' '}
//                         {item.queue_code}
//                         {' '}
//                         regNo:
//                         {' '}
//                         {item.prescripCode}
//                       </p>
//                       <Checkbox isSelected={item.urgent}>ด่วน</Checkbox>
//                     </div>
//                   </CardHeader>
//                   <CardBody>
//                     <p>
//                       ยืนยันการจัดยา
//                       <b>คลิกที่นี้</b>
//                     </p>
//                   </CardBody>
//                   <CardFooter className="justify-between text-small">
//                     วันเวลาลงทะเบียน:
//                     {' '}
//                     <b>{DateTimeLongTH(item?.createdAt)}</b>
//                   </CardFooter>
//                 </Link>
//                 <ConfrimAll data={item.id} location={selectedQueueType} />
//               </Card>
//             ))
//           )
//         : (
//             selectedQueueType && <Spinner label="Loading..." color="danger" />
//           )}

//       {isAutoPrintEnabled && combinedData.length > 0 && <Autoprint data={data} datap={datap} />}
//     </div>
//   );
// };

// export default Sidebar;
