// 'use client';

// import { Download } from 'lucide-react';
// import { useEffect } from 'react';
// // import { useSession } from 'next-auth/react';
// import { toast } from 'react-toastify';

// import Spinner from '@/components/common/Spinner';
// import MainForm from '@/components/screens/dashboard/prescriptions/main-form';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { useCurrentUser } from '@/hooks/use-current-user';
// import { useIsClient } from '@/hooks/use-is-client';
// import useApi from '@/hooks/useApi';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
// import { Textarea } from '@/ui/textarea';

// import { days, hours, pies, rotation } from './dashboard';
// import DrugPage from './drugs/page';
// import { ReactECharts } from './React-ECharts';
// import { RecentSales } from './recent-sales';

// export default function HomeView() {
//   const user = useCurrentUser();

//   const getApi = useApi({
//     key: ['dashboard'],
//     method: 'GET',
//     url: `dashboard`,
//   })?.get;

//   const isClient = useIsClient();

//   useEffect(() => {
//     getApi?.refetch();
//   }, [getApi]);

//   // useEffect(() => {
//   //   // Implementing the setInterval method
//   //   const interval = setInterval(() => {
//   //     getApi?.refetch();
//   //   }, 1000);

//   //   // Clearing the interval
//   //   return () => clearInterval(interval);
//   // }, [getApi]);

//   if (!isClient) {
//     return <Spinner />;
//   }

//   return (
//     <div className="flex-1 space-y-4 p-4">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-3xl font-bold tracking-tight">
//           สวัสดี
//           {' '}
//           {user ? user.name : ''}
//           , ยินดีตอนรับ 👋
//         </h2>
//         <div className="hidden items-center space-x-2 md:flex">
//           {/* <CalendarDateRangePicker /> */}
//           <Button
//             className="shadow-none"
//             variant="outline"
//             onClick={() =>
//               toast('Event has been created', {
//                 // description: 'Sunday, December 03, 2023 at 9:00 AM',
//                 data: {
//                   label: 'Undo',
//                   // eslint-disable-next-line no-console
//                   onClick: () => console.log('Undo'),
//                 },
//               })}
//           >
//             Add to Calendar
//           </Button>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm">
//                 <Download className="mr-2 size-4" />
//                 Download
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Confirm</DialogTitle>
//                 <DialogDescription>
//                   What do you want to get done today?
//                 </DialogDescription>
//               </DialogHeader>
//               <form id="todo-form" className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Input
//                     id="title"
//                     name="title"
//                     placeholder="Todo title..."
//                     className="col-span-4"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Textarea
//                     id="description"
//                     name="description"
//                     placeholder="Description..."
//                     className="col-span-4"
//                   />
//                 </div>
//               </form>
//               <DialogFooter>
//                 <DialogTrigger asChild>
//                   <Button type="submit" size="sm" form="todo-form">
//                     Confirm
//                   </Button>
//                 </DialogTrigger>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <Tabs defaultValue="overview" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
//           <TabsTrigger value="analytics">สถานะใบสั่งยา</TabsTrigger>
//           <TabsTrigger value="reports">ข้อมูลสต๊อกยา</TabsTrigger>
//           <TabsTrigger value="summary">Summary</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   กำลังคัดกรอง
//                 </CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="size-4 text-muted-foreground"
//                 >
//                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{getApi?.data ? getApi?.data?.data?.status1 : 0}</div>
//                 <p className="text-xs text-muted-foreground">
//                   +20.1% from last date
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">กำลังจับคู่ตะกร้า</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="size-4 text-muted-foreground"
//                 >
//                   <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//                   <circle cx="9" cy="7" r="4" />
//                   <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-[#ff646c]">{getApi?.data ? getApi?.data?.data?.status2 : 0}</div>
//                 <p className="text-xs text-muted-foreground">
//                   +180.1% from last hour
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   กำลังจัดยา
//                 </CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="size-4 text-muted-foreground"
//                 >
//                   <rect width="20" height="14" x="2" y="5" rx="2" />
//                   <path d="M2 10h20" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-[#11c678]">{getApi?.data ? getApi?.data?.data?.status3 : 0}</div>
//                 <p className="text-xs text-muted-foreground">
//                   +19% from last hour
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">กำลังตรวจสอบยา</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="size-4 text-muted-foreground"
//                 >
//                   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{getApi?.data ? getApi?.data?.data?.status4 : 0}</div>
//                 <p className="text-xs text-muted-foreground">
//                   +21 since last hour
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">กำลังเรียกคิว</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="size-4 text-muted-foreground"
//                 >
//                   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-[#11c678]">{getApi?.data ? getApi?.data?.data?.status5 : 0}</div>
//                 <p className="text-xs text-muted-foreground">
//                   +21 since last hour
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">จ่ายยาสำเร็จ</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="size-4 text-muted-foreground"
//                 >
//                   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-[#11c678]">{getApi?.data ? getApi?.data?.data?.status6 : 0}</div>
//                 <p className="text-xs text-muted-foreground">
//                   +21 since last hour
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//             <Card>
//               <CardHeader>
//                 <CardTitle>กลุ่มรับบริการ</CardTitle>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <ReactECharts option={pies} style={{ height: '350px' }} />
//               </CardContent>
//             </Card>
//             <Card className="sm:col-span-2 md:col-span-3 lg:col-span-1">
//               <CardHeader>
//                 <CardTitle>รับบริการรายชั่วโมง</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ReactECharts option={hours} style={{ height: '350px' }} />
//               </CardContent>
//             </Card>
//             <Card className="sm:col-span-4 lg:col-span-1">
//               <CardHeader>
//                 <CardTitle>รับบริการประจำวัน</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ReactECharts option={days} style={{ height: '350px' }} />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>รับบริการประจำเดือน</CardTitle>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <ReactECharts option={rotation} style={{ height: '420px' }} />
//               </CardContent>
//             </Card>
//             <Card className="col-span-4 md:col-span-3">
//               <CardHeader>
//                 <CardTitle>Recent Sales</CardTitle>
//                 <CardDescription>
//                   You made 265 sales this month.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ReactECharts option={days} style={{ height: '350px' }} />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Overview</CardTitle>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <ReactECharts option={days} style={{ height: '350px' }} />
//               </CardContent>
//             </Card>
//             <Card className="col-span-4 md:col-span-3">
//               <CardHeader>
//                 <CardTitle>Recent Sales</CardTitle>
//                 <CardDescription>
//                   You made 265 sales this month.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <RecentSales />
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//         <TabsContent value="analytics" className="space-y-4">
//           <MainForm />
//         </TabsContent>
//         <TabsContent value="reports" className="space-y-4">
//           <DrugPage />
//         </TabsContent>

//       </Tabs>
//     </div>
//   );
// }

'use client';

import { useEffect } from 'react';

// import { useSession } from 'next-auth/react';
import Spinner from '@/components/common/Spinner';
import MainForm from '@/components/screens/dashboard/prescription/page';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useIsClient } from '@/hooks/use-is-client';
import useApi from '@/hooks/useApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

import { days, rotation } from './dashboard';
import DrugPage from './drug/page';
import { ReactECharts } from './React-ECharts';
import { RecentSales } from './recent-sales';

export default function HomeView() {
  const user = useCurrentUser();

  const getApi = useApi({
    key: ['dashboard'],
    method: 'GET',
    url: `dashboard`,
  })?.get;

  const isClient = useIsClient();

  useEffect(() => {
    getApi?.refetch();
  }, [getApi]);

  useEffect(() => {
    // Implementing the setInterval method
    const interval = setInterval(() => {
      getApi?.refetch();
    }, 1000);

    // Clearing the interval
    return () => clearInterval(interval);
  }, [getApi]);

  if (!isClient) {
    return <Spinner />;
  }

  const pies = {
    // title: {
    //   text: 'รับบริการประจำวัน',
    //   // subtext: 'Fake Data',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    // },
    series: [
      {
        name: 'ห้องยา OPD',
        type: 'pie',
        radius: '50%',
        data: [
          {
            value: getApi?.data?.data?.a,
            name: 'A ทั่วไป 2',
            itemStyle: {
              color: '#5470c6',
            },
          },
          {
            value: getApi?.data?.data?.b,
            name: 'B รับคำปรึกษา 2',
            itemStyle: {
              color: '#ee6666',
            },
          },
          {
            value: getApi?.data?.data?.c,
            name: 'C ทั่วไป 3',
            itemStyle: {
              color: '#91cc75',
            },
          },
          {
            value: getApi?.data?.data?.d,
            name: 'D จิตเวช 3',
            itemStyle: {
              color: '#fac858',
            },
          },
          {
            value: getApi?.data?.data?.f,
            name: 'F',
            itemStyle: {
              color: '#fac858',
            },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const hours = {
    // title: {
    //   text: 'รับบริการรายชั่วโมง',
    //   subtext: 'Fake Data',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [getApi?.data?.data?.h8, getApi?.data?.data?.h9, getApi?.data?.data?.h10, getApi?.data?.data?.h11, getApi?.data?.data?.h12, getApi?.data?.data?.h13, getApi?.data?.data?.h14, getApi?.data?.data?.h15, getApi?.data?.data?.h16, getApi?.data?.data?.h17, getApi?.data?.data?.h18, getApi?.data?.data?.h19, getApi?.data?.data?.h20],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };

  // console.log(getApi?.data?.data);

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          สวัสดี
          {' '}
          {user ? user.name : ''}
          , ยินดีตอนรับ 👋
        </h2>
        <div className="hidden items-center space-x-2 md:flex">
          {/* <CalendarDateRangePicker /> */}
          {/* <Button
            className="shadow-none"
            variant="outline"
            onClick={() =>
              toast('Event has been created', {
                // description: 'Sunday, December 03, 2023 at 9:00 AM',
                data: {
                  label: 'Undo',
                  // eslint-disable-next-line no-console
                  onClick: () => console.log('Undo'),
                },
              })}
          >
            Add to Calendar
          </Button> */}
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Download className="mr-2 size-4" />
                Download
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm</DialogTitle>
                <DialogDescription>
                  What do you want to get done today?
                </DialogDescription>
              </DialogHeader>
              <form id="todo-form" className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="title"
                    name="title"
                    placeholder="Todo title..."
                    className="col-span-4"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description..."
                    className="col-span-4"
                  />
                </div>
              </form>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button type="submit" size="sm" form="todo-form">
                    Confirm
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
          <TabsTrigger value="analytics">สถานะใบสั่งยา</TabsTrigger>
          <TabsTrigger value="reports">ข้อมูลสต๊อกยา</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  กำลังคัดกรอง
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="size-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getApi?.data ? getApi?.data?.data?.status1 : 0}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last date
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">กำลังจับคู่ตะกร้า</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="size-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#ff646c]">{getApi?.data ? getApi?.data?.data?.status2 : 0}</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  กำลังจัดยา
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="size-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#11c678]">{getApi?.data ? getApi?.data?.data?.status3 : 0}</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">กำลังตรวจสอบยา</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="size-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getApi?.data ? getApi?.data?.data?.status4 : 0}</div>
                <p className="text-xs text-muted-foreground">
                  +21 since last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">กำลังเรียกคิว</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="size-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#11c678]">{getApi?.data ? getApi?.data?.data?.status5 : 0}</div>
                <p className="text-xs text-muted-foreground">
                  +21 since last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">จ่ายยาสำเร็จ</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="size-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#11c678]">{getApi?.data ? getApi?.data?.data?.status6 : 0}</div>
                <p className="text-xs text-muted-foreground">
                  +21 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>กลุ่มรับบริการ</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ReactECharts option={pies} style={{ height: '350px' }} />
              </CardContent>
            </Card>
            <Card className="sm:col-span-2 md:col-span-3 lg:col-span-1">
              <CardHeader>
                <CardTitle>รับบริการรายชั่วโมง</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactECharts option={hours} style={{ height: '350px' }} />
              </CardContent>
            </Card>
            <Card className="sm:col-span-4 lg:col-span-1">
              <CardHeader>
                <CardTitle>รับบริการประจำวัน</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactECharts option={days} style={{ height: '350px' }} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>รับบริการประจำเดือน</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ReactECharts option={rotation} style={{ height: '420px' }} />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>ผู้ใช้งานระบบ</CardTitle>
                <CardDescription>
                  login ล่าสุด
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ReactECharts option={days} style={{ height: '350px' }} />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div> */}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <MainForm />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <DrugPage />
        </TabsContent>

      </Tabs>
    </div>
  );
}
