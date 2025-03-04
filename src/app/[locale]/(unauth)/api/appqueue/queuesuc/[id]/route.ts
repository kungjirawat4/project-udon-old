// import { type NextRequest, NextResponse } from 'next/server';

// import { getErrorResponse } from '@/libs/helpers';
// import { db } from '@/libs/prisma.db';

// type Params = {
//   params: {
//     id: string;
//   };
// };

// export const GET = async (_req: NextRequest, { params }: Params) => {
//   try {
//     const presciptionObj = await db.prescription.findFirst({
//       where: { id: params.id },
//     });
//     if (!presciptionObj) {
//       return getErrorResponse('Presciption not found', 404);
//     }

//     return NextResponse.json({
//       ...presciptionObj,
//       message: 'Presciption has been select successfully',
//     });
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status);
//   }
// };

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
        prescrip_status: {
          in: ['เรียกคิวแล้ว', 'พักตะกร้า'], // กรองสถานะ 2 ค่า
        },
        channel2: Number(params.id),
      },
      include: {
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
    });

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
    // let medicine: any = [];

    if (myArray && myDetail) {
      master = await db.prescription.findMany({
        where: { id: { in: myArray } },
        include: {
          arranged: {
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

      // medicine = await db.arranged.findMany({
      //   where: { prescripId: { in: myArray }, medicineId: { in: myDetail }, user_arrang_time: null },
      //   include: {
      //     autoload: {
      //       select: {
      //         load_number: true,
      //       },
      //     },
      //     medicine: {
      //       include: {
      //         cabinet: true,
      //       },
      //     },
      //   },
      // });
    }

    return NextResponse.json({
      data: master,
      // detail: medicine,
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
