import dayjs from 'dayjs';
import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = auth(async (_req) => {
  const dayjsNow = dayjs();
  const dayjsStartDate = dayjsNow.startOf('day');
  const dayjsEndDate = dayjsNow.endOf('day');
  try {
    const prescriptionLoadObj = await db.prescription.findFirst({
      // select: {
      //   id: true,
      //   hnCode: true,
      //   basketId: true,
      //   medicine_total: true,
      //   queue_num: true,
      //   queue_type: true,
      //   createdAt: true,
      //   channel: true,
      // },
      take: 1,
      where: {
        // createdAt: { gte: new Date(utcDate), lte: new Date(new Date(utcDate).setDate(new Date(utcDate).getDate() + 1)) },
        AND: [
          { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
          { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        ],
        basketId: null,
        prescrip_status: 'รอจับคู่ตะกร้า',
      },
      orderBy: [{ urgent: 'desc' }, { queue_random: 'asc' }, { queue_code: 'asc' }, { createdAt: 'asc' }],
    });

    // console.log(prescriptionLoadObj);

    if (!prescriptionLoadObj) {
      return getErrorResponse('No prescription found in the system', 500);
    }

    const arranged = await db.arranged.count({ where: { prescripId: prescriptionLoadObj?.id } });
    if (arranged) {
      await db.prescription.update({
        where: { id: prescriptionLoadObj?.id },
        data: { medicine_total: arranged },
      });
    }

    const arrangedCount = await db.prescription.findFirst({
      where: { id: prescriptionLoadObj?.id, basketId: null, prescrip_status: 'รอจับคู่ตะกร้า' },
      select: {
        id: true,
        hnCode: true,
        basketId: true,
        medicine_total: true,
        queue_num: true,
        queue_type: true,
        createdAt: true,
        channel: true,
      },
      orderBy: [{ urgent: 'desc' }, { queue_code: 'asc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json(arrangedCount);
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});

export const POST = async (req: NextRequest) => {
  try {
    const { id, channel } = await req.json();

    await db.prescription.update({
      where: { id, dateQueue: new Date() },
      data: {
        channel: Number(channel),
      },
    });

    return NextResponse.json({
      status: 200,
      message: `This channel is match successfully`,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
