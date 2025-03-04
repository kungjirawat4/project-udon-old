// import { NextResponse } from 'next/server';

// import { auth } from '@/auth';
// import { endOfDay, startOfDay } from '@/libs/dateTime';
// import { getErrorResponse } from '@/libs/helpers';
// import { db } from '@/libs/prisma.db';

// export const GET = auth(async (_req) => {
//   try {
//     const [s1, s2, s3, s4, s5, s6] = await Promise.all([
//       db.prescription.count({
//         where: { prescrip_status: 'รอคัดกรอง', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { prescrip_status: 'รอจับคู่ตะกร้า', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { prescrip_status: 'กำลังจัดยา', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { prescrip_status: 'กำลังตรวจสอบ', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { prescrip_status: 'รอเรียกคิว', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { prescrip_status: 'จ่ายยาสำเร็จ', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//     ]);

//     // const result = await db.$queryRaw`SELECT MAX("createdAt") from "queues"`; // This works fine

//     // const result = await db.prescription.groupBy({
//     //   by: ['queue_type'],
//     //   _count: true,
//     //   where: { createdAt: {
//     //     gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//     //     lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//     //   } },
//     // });
//     const [a, b, c, d, f, all] = await Promise.all([
//       db.prescription.count({
//         where: { queue_type: 'A', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { queue_type: 'B', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { queue_type: 'C', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { queue_type: 'D', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { queue_type: 'F', createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//       db.prescription.count({
//         where: { queue_type: null, createdAt: {
//           gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
//           lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
//         } },
//       }),
//     ]);

//     // const result = await prisma.$queryRaw`select * from users where id in (${ids})`;
//     return NextResponse.json({
//       data: {
//         status1: s1,
//         status2: s2,
//         status3: s3,
//         status4: s4,
//         status5: s5,
//         status6: s6,
//         a,
//         b,
//         c,
//         d,
//         f,
//         all,
//       },
//     });
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status);
//   }
// });

import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

// import cron from 'node-cron';
import { auth } from '@/auth';
// import { dayjsEndDate, dayjsStartDate } from '@/libs/dateTime';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = auth(async (_req) => {
  try {
    const dayjsNow = dayjs();
    const dayjsStartDate = dayjsNow.startOf('day');
    const dayjsEndDate = dayjsNow.endOf('day');
    const [s1, s2, s3, s4, s5, s6] = await Promise.all([
      db.prescription.count({
        where: { prescrip_status: 'รอคัดกรอง', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { prescrip_status: 'รอจับคู่ตะกร้า', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { prescrip_status: 'กำลังจัดยา', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { prescrip_status: 'กำลังตรวจสอบ', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { prescrip_status: 'รอเรียกคิว', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { prescrip_status: 'จ่ายยาสำเร็จ', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
    ]);

    const [a, b, c, d, f, all] = await Promise.all([
      db.prescription.count({
        where: { queue_type: 'A', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { queue_type: 'B', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { queue_type: 'C', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { queue_type: 'D', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { queue_type: 'F', AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ] },
      }),
    ]);

    const [h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20] = await Promise.all([
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT08:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT08:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT09:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT09:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT10:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT10:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT11:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT11:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT12:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT12:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT13:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT13:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT14:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT14:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT15:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT15:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT16:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT16:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT17:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT17:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT18:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT18:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT19:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT19:59:ss')) } },
        ] },
      }),
      db.prescription.count({
        where: { AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDT20:00:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDT20:59:ss')) } },
        ] },
      }),

    ]);

    // const startOfWeek = dayjs().weekday(-7); // 13-09-2020
    // const getDate = dayjs(startOfWeek).day(5); // invalid

    const result: any[0] = await db.$queryRaw`SELECT count(*) as count, DATE_PART ('week' , "dateQueue") as days, CEILING((DATE_PART( 'day', "dateQueue" ) - DATE_PART( 'dow', "dateQueue" )) / 7) as week FROM sreenings group by days, week`; //

    const dayNum = Number(result[0].count);
    const dayofweek = Number(result[0].days);
    const dayweek = Number(result[0].week);

    return NextResponse.json({
      data: {
        status1: s1,
        status2: s2,
        status3: s3,
        status4: s4,
        status5: s5,
        status6: s6,
        a,
        b,
        c,
        d,
        f,
        all,
        h8,
        h9,
        h10,
        h11,
        h12,
        h13,
        h14,
        h15,
        h16,
        h17,
        h18,
        h19,
        h20,
        number: { dayNum, dayofweek, dayweek },
      },
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});
