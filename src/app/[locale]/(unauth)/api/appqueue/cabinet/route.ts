import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    const query = {
      id: q ? { contains: q, mode: QueryMode.insensitive } : {},
      storage_station: 'Z',

    };

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 3000;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.cabinet.findMany({
        where: query,
        select: {
          id: true,
          cabinet: true,
          HouseId: true,
          cabinet_size: true,
          mqtt_topic: true,
          storage_station: true,
          storage_location: true,
          storage_position: true,
          storage_capacity: true,
          userLevel: true,
          cabinet_note: true,
          plcId: true,
          storageMax: true,
          storageMin: true,
          createdAt: true,
          medicine: {
            select: {
              id: true,
              name: true,
              medicineImage1: true,
              medicineImage2: true,
              medicineImage3: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { storage_position: 'asc' },
      }),
      db.cabinet.count({ where: query }),
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
