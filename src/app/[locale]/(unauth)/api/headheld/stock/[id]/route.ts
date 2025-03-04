import { NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: Request, { params }: Params) {
  try {
    const queueObj = await db.medicine.findFirst({
      where: { medicineCode: params?.id as string },
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
        cabinet: true,
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
      storageAdd,
      storageMin,
      storageMax,
    } = await req.json();

    const findMedicine = await db.medicine.findFirst({
      where: { medicineCode: params.id },
    });

    if (!findMedicine) {
      getErrorResponse('Error', 500);
    }

    // // eslint-disable-next-line no-console
    // console.log(storageMax);

    const updateMedicine = await db.medicine.update({
      where: { medicineCode: params.id },
      select: {
        id: true,
        medicineCode: true,
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
      data: {
        storageMin: Number(storageMin),
        storageMax: Number(storageMax),
        storageAdd: Number(storageAdd),
      },
    });

    return NextResponse.json({
      ...updateMedicine,
      message: 'Medicine has been updated successfully',
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
