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
//     const cabinetObj = await db.cabinet.findMany({
//       where: {
//         // id: params.id,
//         storage_location: String(params.id),
//       },

//     });
//     if (!cabinetObj) {
//       return getErrorResponse('Presciption not found', 404);
//     }

//     return NextResponse.json({
//       ...cabinetObj,
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

    const arrangeds = await db.cabinet.findMany({
      where: {
        storage_location: String(params.id),
      },
    });

    if (arrangeds) {
      arrangeds.map(async (obj) => {
        // console.log(obj);
        myArray.push(obj);
      });
    }

    let master: any = [];
    // let medicine: any = [];

    if (myArray && myDetail) {
      master = await db.cabinet.findMany({
        where: { storage_location: String(params.id) },
        orderBy: { storage_location: 'asc' },
      });
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

export async function PUT(req: Request, { params }: Params) {
  try {
    const {
      hospitalId,
      userId,
      mqtt_topic,
      cabinet,
      house_id,
      cabinet_size,
      userLevel,
      storage_station,
      storage_location,
      storage_position,
      cabinet_note,
      medicineId,
      storageMin,
      storageMax,
      storageAdd,
      medicineImage1,
      medicineImage2,
      medicineImage3,
      plcId,
      prescripId,
      datacabinet,
    } = await req.json();

    // console.log('sdfjakldfjak', plcId);

    const CabinetObj = await db.cabinet.findUnique({
      where: { id: params.id },
    });
    if (!CabinetObj) {
      return getErrorResponse('Cabinet not found', 404);
    }
    await db.$transaction(async () => {
      await db.cabinet.update({
        where: { id: params.id },
        data: {
          hospitalId,
          userId,
          mqtt_topic,
          cabinet,
          HouseId: house_id as string,
          cabinet_size: cabinet_size as string,
          userLevel: userLevel as string,
          storage_station,
          storage_location,
          storage_position,
          cabinet_note,
          medicineId: medicineId as string,
          plcId,
          prescripId,
          datacabinet,
        },
      });

      if (medicineId) {
        // console.log('sdkfjajsdfkaljf', medicineImage1, medicineImage2, medicineImage3);
        await db.medicine.update({
          where: { id: medicineId as string },
          data: {
            storageAdd: Number(storageAdd),
            storageMin: Number(storageMin),
            storageMax: Number(storageMax),
            medicineImage1: medicineImage1 || null,
            medicineImage2: medicineImage2 || null,
            medicineImage3: medicineImage3 || null,
          },
        });
      }
    });

    return NextResponse.json({
      ...CabinetObj,
      message: 'Cabinet has been updated successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
