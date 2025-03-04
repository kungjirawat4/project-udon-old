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
    // await isAuth(req, params);

    const {
      hospitalId,
      userId,
      qrCode,
      basket_color,
      basket_status,
      basket_type,
      basket_floor,
      name,
    } = await req.json();

    const basketObj = await db.basket.findUnique({
      where: { id: params.id },
    });
    if (!basketObj) {
      return getErrorResponse('Cabinet not found', 404);
    }

    await db.basket.update({
      where: { id: params.id },
      data: {
        hospitalId,
        userId,
        qrCode,
        basket_color,
        basket_status,
        basket_type,
        basket_floor: Number(basket_floor),
        name,
      },
    });

    return NextResponse.json({
      ...basketObj,
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
