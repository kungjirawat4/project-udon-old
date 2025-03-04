// import { NextResponse } from 'next/server';

// import { auth } from '@/auth';
// import { getErrorResponse } from '@/libs/helpers';
// import { db } from '@/libs/prisma.db';

// export const GET = auth(async (_req) => {
//   try {
//     const [result] = await Promise.all([
//       db.cabinet.findMany({
//         orderBy: { createdAt: 'asc' },
//         select: {
//           id: true,
//           cabinet: true,
//           HouseId: true,
//           cabinet_size: true,
//           mqtt_topic: true,
//           storage_station: true,
//           storage_location: true,
//           storage_position: true,
//           storage_capacity: true,
//           userLevel: true,
//           cabinet_note: true,
//           storageMax: true,
//           storageMin: true,
//           createdAt: true,
//           medicine: {
//             select: {
//               id: true,
//               name: true,
//               medicineImage1: true,
//               medicineImage2: true,
//               medicineImage3: true,
//               storageMax: true,
//               storageMin: true,
//               storageAdd: true,
//               medicineName_th: true,
//               medicineName_en: true,
//               medicinePackageSize: true,
//             },
//           },
//         },
//       }),
//     ]);

//     return NextResponse.json({
//       data: result,
//     });
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status);
//   }
// }) as any;

// export async function POST(req: Request) {
//   try {
//     const {
//       hospitalId,
//       userId,
//       cabinet,
//       house_id,
//       cabinet_size,
//       userLevel,
//       storage_station,
//       storage_location,
//       storage_position,
//       cabinet_note,
//       medicineId,
//       storageMin,
//       storageMax,
//     } = await req.json();

//     const userObj = await db.cabinet.create({
//       data: {
//         hospitalId,
//         userId,
//         mqtt_topic: `UDH/${storage_station}/${storage_location}/${storage_position}`,
//         cabinet,
//         HouseId: house_id as string,
//         cabinet_size,
//         userLevel: userLevel as string,
//         storage_station,
//         storage_location,
//         storage_position,
//         cabinet_note,
//         medicineId: medicineId as string,
//         storageMin: Number(storageMin),
//         storageMax: Number(storageMax),
//       },
//     });

//     return NextResponse.json({
//       userObj,
//       message: 'Cabinet has been created successfully',
//     });
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status);
//   }
// }

import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = auth(async (_req) => {
  try {
    const [result] = await Promise.all([
      db.cabinet.findMany({
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          cabinet: true,
          HouseId: true,
          cabinet_size: true,
          mqtt_topic: true,
          storage_station: true,
          storage_location: true,
          storage_position: true,
          storage_capacity: true,
          userLevel: true,
          cabinet_note: true,
          storageMax: true,
          storageMin: true,
          createdAt: true,
          medicine: {
            select: {
              id: true,
              name: true,
              medicineCode: true,
              medicineImage1: true,
              medicineImage2: true,
              medicineImage3: true,
              storageMax: true,
              storageMin: true,
              storageAdd: true,
              medicineName_th: true,
              medicineName_en: true,
              medicinePackageSize: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: result,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}) as any;

export async function POST(req: Request) {
  try {
    const {
      hospitalId,
      userId,
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
    } = await req.json();

    const userObj = await db.cabinet.create({
      data: {
        hospitalId,
        userId,
        mqtt_topic: `UDH/${storage_station}/${storage_location}/${storage_position}`,
        cabinet,
        HouseId: house_id as string,
        cabinet_size,
        userLevel: userLevel as string,
        storage_station,
        storage_location,
        storage_position,
        cabinet_note,
        medicineId: medicineId as string,
        storageMin: Number(storageMin),
        storageMax: Number(storageMax),
      },
    });

    return NextResponse.json({
      userObj,
      message: 'Cabinet has been created successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
