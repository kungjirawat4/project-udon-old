// import { endOfDay, startOfDay } from 'date-fns'; // เพิ่มการ import ฟังก์ชัน date-fns
// import { type NextRequest, NextResponse } from 'next/server';

// import { getErrorResponse } from '@/libs/helpers';
// import { db, QueryMode } from '@/libs/prisma.db';

// export const GET = async (req: NextRequest) => {
//   try {
//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get('q');

//     // กำหนดช่วงเวลาวันปัจจุบัน
//     const todayStart = startOfDay(new Date());
//     const todayEnd = endOfDay(new Date());

//     // เพิ่มเงื่อนไขช่วงเวลา createdAt สำหรับวันปัจจุบัน
//     const query = {
//       id: q ? { contains: q, mode: QueryMode.insensitive } : {},
//       createdAt: {
//         gte: todayStart, // ตั้งแต่เวลาเริ่มต้นของวัน
//         lte: todayEnd, // จนถึงเวลาสิ้นสุดของวัน
//       },
//       prescrip_status: {
//         in: ['รอคัดกรอง', 'รอจับคู่ตะกร้า'], // กรองสถานะ 2 ค่า
//       },
//     };

//     const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
//     const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 3000;
//     const skip = (page - 1) * pageSize;

//     const [result, total] = await Promise.all([
//       db.prescription.findMany({
//         where: query,
//         include: {
//           autoload: true,
//           basket: true,
//           arranged: {
//             include: {
//               medicine: {
//                 include: {
//                   cabinet: true,
//                 },
//               },
//             },
//           },
//         },
//         skip,
//         take: pageSize,
//         orderBy: { createdAt: 'asc' },
//       }),
//       db.prescription.count({ where: query }),
//     ]);

//     const pages = Math.ceil(total / pageSize);
//     return NextResponse.json({
//       startIndex: skip + 1,
//       endIndex: skip + result.length,
//       count: result.length,
//       page,
//       pages,
//       total,
//       data: result,
//     });
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status);
//   }
// };

import { endOfDay, startOfDay } from 'date-fns';
import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    // กำหนดช่วงเวลาวันปัจจุบัน
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    // เพิ่มเงื่อนไขช่วงเวลา createdAt สำหรับวันปัจจุบัน
    const query = {
      id: q ? { contains: q, mode: QueryMode.insensitive } : {},
      createdAt: {
        gte: todayStart, // ตั้งแต่เวลาเริ่มต้นของวัน
        lte: todayEnd, // จนถึงเวลาสิ้นสุดของวัน
      },
      prescrip_status: {
        in: ['รอคัดกรอง', 'รอจับคู่ตะกร้า'], // กรองสถานะ 2 ค่า
      },
    };

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 3000;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.prescription.findMany({
        where: query,
        include: {
          autoload: true,
          basket: true,
          arranged: {
            include: {
              medicine: {
                include: {
                  cabinet: true,
                },
              },
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'asc' },
      }),
      db.prescription.count({ where: query }),
    ]);

    // ตรวจสอบและอัปเดต `medicineId` ใน `arranged` ถ้ายังไม่มี
    // for (const prescription of result) {
    //   for (const item of prescription.arranged) {
    //     // ถ้ามี `medicineId` อยู่แล้ว ให้ข้ามไปเลย
    //     if (item.medicineId) {
    //       continue; // ข้ามไปหาก `medicineId` มีอยู่แล้ว
    //     }

    //     // ตรวจสอบว่ามี `medicineCode` หรือไม่
    //     if (item.medicineCode) {
    //       // ค้นหา `medicineId` จากตาราง `medicine` โดยใช้ `medicineCode`
    //       const medicine = await db.medicine.findUnique({
    //         where: { medicineCode: item.medicineCode },
    //         select: { id: true },
    //       });

    //       // ถ้าพบ `medicineId` ให้อัปเดตใน `arranged`
    //       if (medicine) {
    //         item.medicineId = medicine.id;

    //         // ทำการอัปเดตข้อมูลในฐานข้อมูล
    //         await db.arranged.update({
    //           where: { id: item.id }, // ใช้ไอดีที่ถูกต้องของ `arranged`
    //           data: {
    //             medicineId: medicine.id,
    //           },
    //         });
    //       }
    //     }
    //   }
    // }

    const pages = Math.ceil(total / pageSize);
    return NextResponse.json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      data: result,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
