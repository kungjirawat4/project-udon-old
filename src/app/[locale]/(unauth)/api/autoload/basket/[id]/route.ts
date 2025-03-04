import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_req: Request, { params }: Params) => {
  try {
    // if (req.auth) {
    const basketObj = await db.basket.findUnique({
      where: { basket_status: true, id: params.id },
      select: {
        id: true,
        basket_color: true,
        basket_type: true,
        basket_floor: true,
        qrCode: true,
      },
    });

    return NextResponse.json(basketObj);
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const { basketId } = await req.json();

    const basket = await db.basket.findFirst({
      where: { qrCode: basketId, basket_match: true },
    });

    const autoload = await db.autoLoad.findFirst({
      where: { load_number: Number(params.id) },
    });

    if (basket) {
      const perscription = await db.prescription.findFirst({
        where: { createdAt: new Date(), basketId: basket.id },
      });

      await db.$transaction(async () => {
        await db.autoLoad.update({
          where: { id: autoload?.id },
          data: {
            basketId: basket?.id,
            orderId: perscription?.id,
          },
        });

        await db.prescription.update({
          where: { id: perscription?.id },
          data: {
            autoLoad: autoload?.id,
          },
        });

        await db.arranged.updateMany({
          where: { prescripId: perscription?.id },
          data: {
            autoLoad: autoload?.id,
          },
        });
      });

      return NextResponse.json({
        status: 200,
        message: `AutoLoad ${basketId} has been updated successfully`,
      });
    }

    return NextResponse.json({
      status: 500,
      message: `AutoLoad ${basketId} not has been updated error`,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
