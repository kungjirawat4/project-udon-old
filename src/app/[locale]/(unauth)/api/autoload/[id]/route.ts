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
    // if (req.auth) {
    const autoLoadObj = await db.autoLoad.findFirst({
      where: { load_number: Number(params.id) },
      include: {
        prescrip: {
          select: {
            hnCode: true,
            vnCode: true,
            full_name: true,
            queue_type: true,
            queue_code: true,
            medicine_total: true,
            urgent: true,
          },
        },
        basket: {
          select: {
            qrCode: true,
            basket_color: true,
          },
        },
      },
    });

    return NextResponse.json(autoLoadObj);
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

export const PUT = async (req: Request, { params }: Params) => {
  try {
    const { drugCount } = await req.json();

    await db.autoLoad.updateMany({
      where: { load_number: Number(params.id) },
      data: {
        drug_count: Number(drugCount),
      },
    });

    return NextResponse.json({
      message: `AutoLoad has been updated successfully`,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
