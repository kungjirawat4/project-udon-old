// import { type NextRequest, NextResponse } from 'next/server';

// import { getErrorResponse } from '@/libs/helpers';
// import { db } from '@/libs/prisma.db';
// // import { auth } from '@/auth';
// // import { orderBy, result } from 'lodash';

// type Params = {
//   params: {
//     id: string;
//   };
// };
// export const GET = async (_req: NextRequest, { params }: Params) => {
//   try {
//     // if (req.auth) {
//     const myArray: any = [];
//     const myDetail: any = [];

//     if (!params.id) {
//       return getErrorResponse('Hospital not found', 404);
//     }

//     const arrangeds = await db.prescription.findMany({
//       where: {
//         prescrip_status: 'กำลังจัดยา',
//       },
//       include: {
//         arranged: {
//           where: {
//             user_arrang_time: null,
//           },
//           include: {
//             medicine: {
//               include: {
//                 cabinet:
//                 {
//                   where: { storage_station: params.id },

//                 },
//               },
//             },
//           },
//         },
//       },
//     });

//     // console.log(arrangeds);

//     if (arrangeds) {
//       arrangeds.map(async (obj) => {
//         // console.log(obj);
//         obj.arranged.map(async (arrang) => {
//           const num = arrang?.medicine?.cabinet.length;

//           // console.log(arrang);
//           if (num) {
//             myArray.push(arrang.prescripId);
//             myDetail.push(arrang.medicineId);
//           }
//         });
//       });
//     }

//     let master: any = [];
//     let medicine: any = [];

//     if (myArray && myDetail) {
//       master = await db.prescription.findMany({
//         where: { id: { in: myArray } },
//         include: {
//           autoload: {
//             select: {
//               load_number: true,
//             },
//           },
//         },
//         orderBy: { urgent: 'desc' },
//       });

//       medicine = await db.arranged.findMany({
//         where: { medicineId: { in: myDetail } },
//         include: {
//           autoload: {
//             select: {
//               load_number: true,
//             },
//           },
//           medicine: {
//             include: {
//               cabinet: {
//                 where: { storage_station: params.id },
//               },
//             },
//           },
//         },
//       });
//     }

//     return NextResponse.json({
//       data: master,
//       detail: medicine,
//     });
//     // }
//     // return Response.json({ message: 'Not authenticated' }, { status: 401 });
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status);
//   }
// };

// import { endOfDay, startOfDay } from 'date-fns';
import { type NextRequest, NextResponse } from 'next/server';

// import { utcDate } from '@/libs/dateTime';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';
// import { auth } from '@/auth';
// import { orderBy, result } from 'lodash';

type Params = {
  params: {
    id: string;
  };
};
export const GET = async (_req: NextRequest, { params }: Params) => {
  // const todayStart = startOfDay(new Date());
  // const todayEnd = endOfDay(new Date());
  try {
    // if (req.auth) {
    const myArray: any = [];
    const myDetail: any = [];

    if (!params.id) {
      return getErrorResponse('Hospital not found', 404);
    }

    const arrangeds = await db.prescription.findMany({
      where: {
        prescrip_status: 'กำลังจัดยา',
        // createdAt: {
        //   gte: todayStart, // ตั้งแต่เวลาเริ่มต้นของวัน
        //   lte: todayEnd, // จนถึงเวลาสิ้นสุดของวัน
        // },

        autoLoad: {
          not: null, // เช็คว่า autoLoad ไม่เป็น null หรือค่าว่าง
        },
      },
      include: {
        arranged: {
          where: {
            user_arrang_time: null,
          },
          include: {
            medicine: {
              include: {
                cabinet:
                {
                  where: { storage_station: params.id },

                },
              },
            },
          },
        },
      },
    });

    // const arrangeds = await db.prescription.findMany({
    //   where: { prescrip_status: 'กำลังจัดยา', autoLoad: { not: null } },
    //   select: {
    //     id: true,
    //     hnCode: true,
    //     vnCode: true,
    //     queue_code: true,
    //     queue_num: true,
    //     full_name: true,
    //     delivery: true,
    //     prescrip_status: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     arranged: {
    //       select: {
    //         id: true,
    //         medicineId: true,
    //         prescripId: true,
    //         medicineCode: true,
    //         medicine_name: true,
    //         medicine_amount: true,
    //         medicinePackageSize: true,
    //         medicine_method: true,
    //         medicine_condition: true,
    //         medicine_unit_eating: true,
    //         medicine_frequency: true,
    //         user_arrang: true,
    //         user_arrang_time: true,
    //         medicine: {
    //           select: {
    //             id: true,
    //             medicineCode: true,
    //             name: true,
    //             storageAdd: true,
    //             storageMin: true,
    //             storageMax: true,
    //             cabinet: {
    //               where: { storage_station: params?.id as string },
    //               select: {
    //                 HouseId: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    // console.log(arrangeds);

    if (arrangeds) {
      arrangeds.map(async (obj) => {
        // console.log(obj);
        obj.arranged.map(async (arrang) => {
          const num = arrang?.medicine?.cabinet?.length;

          // console.log(arrang);
          if (num) {
            myArray.push(arrang.prescripId);
            myDetail.push(arrang.medicineId);
          }
        });
      });
    }

    let master: any = [];
    let medicine: any = [];

    if (myArray && myDetail) {
      master = await db.prescription.findMany({
        where: { id: { in: myArray } },
        include: {
          arranged: {
            where: { user_arrang_time: null }, // เงื่อนไขเดิมที่ต้องการ
            include: {
              autoload: {
                select: {
                  load_number: true,
                },
              },
            },

          },

        },
        orderBy: { urgent: 'desc' },
      });

      medicine = await db.arranged.findMany({
        where: { prescripId: { in: myArray }, medicineId: { in: myDetail }, user_arrang_time: null },
        include: {
          autoload: {
            select: {
              load_number: true,
            },
          },
          medicine: {
            include: {
              cabinet: {
                where: { storage_station: params?.id as string },
              },
            },
          },
        },
      });
    }

    return NextResponse.json({
      data: master,
      detail: medicine,
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
