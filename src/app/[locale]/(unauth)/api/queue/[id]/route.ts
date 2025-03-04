// import { endOfDay, startOfDay } from 'date-fns';
import { NextResponse } from 'next/server';

// import { endOfDay, startOfDay } from '@/libs/dateTime';
// import { utcDate } from '@/libs/dateTime';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_req: Request, { params }: Params) => {
  try {
    const queueObj = await db.queue.findMany({
      where: {
        // createdAt: {
        //   gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
        //   lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
        // },
        channel2: Number(params.id),
        queueStatus: { in: [1, 2, 4] },
      },
      take: 5,
      orderBy: [{ createdAt: 'desc' }],
    });
    const queue10 = await db.queue.findMany({
      where: {
        // createdAt: {
        //   gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
        //   lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
        // },
        channel2: Number(params.id),
        queueStatus: { in: [1, 2, 4] },
      },
      skip: 5,
      // take: 10,
      orderBy: [{ createdAt: 'desc' }],
    });

    return NextResponse.json({
      queueObj,
      queue10,
      message: 'Queue has been created successfully',
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

export const PUT = async (_req: Request, { params }: Params) => {
  try {
    return NextResponse.json({
      params,
      message: 'Queue has been created successfully',
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
