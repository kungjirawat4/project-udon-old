// import { endOfDay, startOfDay } from 'date-fns';
import dayjs from 'dayjs';
import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    // const todayStart = startOfDay(new Date());
    // const todayEnd = endOfDay(new Date());
    const dayjsNow = dayjs();
    const dayjsStartDate = dayjsNow.startOf('day');
    const dayjsEndDate = dayjsNow.endOf('day');
    const query = {
      id: q ? { contains: q, mode: QueryMode.insensitive } : {},
      AND: [
        { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
      ],
      //  prescrip_status: 'กำลังตรวจสอบ',
      prescrip_status: 'รอเรียกคิว',

    };

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 3000;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.prescription.findMany({
        where: query,
        include: {
          autoload: true,
          basket: true,
          arranged: {
            include: {
              medicine: {
                include: {
                  cabinet: true,
                },
              },
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'asc' },
      }),
      db.prescription.count({ where: query }),
    ]);

    const pages = Math.ceil(total / pageSize);

    return NextResponse.json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      data: result,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
