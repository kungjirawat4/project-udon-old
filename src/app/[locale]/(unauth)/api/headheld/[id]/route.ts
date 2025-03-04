import { NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_req: Request, { params }: Params) => {
  try {
    const queueObj = await db.prescription.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        hnCode: true,
        vnCode: true,
        queue_code: true,
        queue_num: true,
        full_name: true,
        delivery: true,
        prescrip_status: true,
        createdAt: true,
        updatedAt: true,
        arranged: {
          select: {
            id: true,
            prescripId: true,
            medicineCode: true,
            medicine_name: true,
            medicine_amount: true,
            medicinePackageSize: true,
            medicine_method: true,
            medicine_condition: true,
            medicine_unit_eating: true,
            medicine_frequency: true,
            user_arrang: true,
            user_arrang_time: true,
            medicine: {
              select: {
                id: true,
                medicineCode: true,
                medicineImage1: true,
                medicineImage2: true,
                medicineImage3: true,
                name: true,
                storageAdd: true,
                storageMin: true,
                storageMax: true,
                cabinet: {
                  select: {
                    HouseId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(queueObj);
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

export async function PUT(req: Request, { params }: Params) {
  try {
    const {
      prescrip_status,
      arranged,

    } = await req.json();

    const presciptionObj = await db.prescription.findFirst({
      where: { id: params.id },
    });
    if (!presciptionObj) {
      return getErrorResponse('Presciption not found', 404);
    }
    await arranged.map(async (med: any) => (
      await db.$transaction(async (db) => {
        await db.arranged.update({
          where: { id: med?.id },
          data: {
            user_arrang: med?.user_arrang,
            user_arrang_time: new Date(),
          },
        });
        await db.medicine.update({
          where: { id: med?.medicine?.id as string },
          data: {
            storageAdd: Number(med?.medicine?.storageAdd),
            storageMin: Number(med?.medicine?.storageMin),
            storageMax: Number(med?.medicine?.storageMax),
          },
        });
      })
    ));
    await db.$transaction(async (db) => {
      await db.prescription.update({
        where: { id: params.id as string },
        data: { prescrip_status: prescrip_status as string },
      });
    });

    return NextResponse.json({
      arranged,
      message: 'Basket has been updated successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    // await isAuth(req, params)
    const BasketObj = await db.basket.delete({
      where: { id: params.id },
    });
    if (!BasketObj) {
      return getErrorResponse('Cabinets not found', 404);
    }

    return NextResponse.json({
      ...BasketObj,
      message: 'Cabinets has been removed successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
