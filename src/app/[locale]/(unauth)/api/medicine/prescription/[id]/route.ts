import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_req: NextRequest, { params }: Params) => {
  try {
    const presciptionObj = await db.prescription.findFirst({
      where: { id: params.id },
    });
    if (!presciptionObj) {
      return getErrorResponse('Presciption not found', 404);
    }

    return NextResponse.json({
      ...presciptionObj,
      message: 'Presciption has been select successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

export async function PUT(req: Request, { params }: Params) {
  try {
    const {
      hnCode,
      vnCode,
      queueCode,
      queueType,
      queueNum,
      fullName,
      queueStatus,
      // medicineTotal,
      // medicinePrice,
      delivery,
      basketId,
      urgent,
      station,
      medicine_service,
    } = await req.json();

    const presciptionObj = await db.prescription.findUnique({
      where: { id: params.id },
    });
    if (!presciptionObj) {
      return getErrorResponse('Presciption not found', 404);
    }
    if (station === true) {
      await db.prescription.update({
        where: { id: params.id },
        data: {
          medicine_service,
          prescrip_status: queueStatus as string,

        },
      });
    } else {
      await db.prescription.update({
        where: { id: params.id },
        data: {
          hnCode,
          vnCode,
          queue_num: queueNum,
          full_name: fullName as string,
          queue_code: queueCode as string,
          queue_type: queueType, // queueCode.slice(0, 1),
          prescrip_status: queueStatus as string,
          delivery,
          medicine_service,
          // medicine_total: medicineTotal,
          // medicine_price: medicinePrice,
          basketId: basketId as string,
          urgent: Boolean(urgent),
        },
      });
    }

    return NextResponse.json({
      ...presciptionObj,
      message: `Presciption has been updated successfully`,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const presciptionObj = await db.prescription.delete({
      where: { id: params.id },
    });
    if (!presciptionObj) {
      return getErrorResponse('Presciption not found', 404);
    }

    return NextResponse.json({
      ...presciptionObj,
      message: 'Presciption has been removed successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
