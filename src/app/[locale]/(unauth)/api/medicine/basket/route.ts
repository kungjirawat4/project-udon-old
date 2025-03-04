import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = auth(async (req) => {
  try {
    // if (req.auth) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    const query = q ? { id: { contains: q, mode: QueryMode.insensitive } } : {};

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 2000;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.basket.findMany({
        where: query,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      db.basket.count({ where: query }),
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
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});

export const POST = auth(async (req) => {
  try {
    // if (req.auth) {
    const {
      hospitalId,
      qrCode,
      basket_color,
      basket_status,
      basket_type,
      basket_floor,
    } = await req.json();

    const basketObj = await db.basket.create({
      data: {
        hospitalId,
        // userId: 'clyy0oz9a0000w86ie1w2kui1',
        qrCode,
        basket_color,
        basket_status,
        basket_type,
        basket_floor: Number(basket_floor),
      },
    });

    return NextResponse.json({
      basketObj,
      message: 'Basket has been created successfully',
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});
