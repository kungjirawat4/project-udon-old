import { NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
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

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const CabinetObj = await db.cabinet.delete({
      where: { id: params.id },
    });
    if (!CabinetObj) {
      return getErrorResponse('Cabinets not found', 404);
    }

    return NextResponse.json({
      ...CabinetObj,
      message: 'Cabinets has been removed successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
