import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = auth(async (req) => {
  try {
    // if (req.auth) {
    // const autoLoadObj = await prisma.autoLoad.findMany({
    //   orderBy: { load_number: 'asc' },
    // });
    // return NextResponse.json(autoLoadObj);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    const query = q ? { id: { contains: q, mode: QueryMode.insensitive } } : {};

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 25;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.autoLoad.findMany({
        where: query,
        include: {
          prescrip: {
            select: {
              hnCode: true,
              vnCode: true,
              full_name: true,
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
        skip,
        take: pageSize,
        orderBy: { load_number: 'asc' },
      }),
      db.autoLoad.count({ where: query }),
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
      mqttTopic,
      plcId,
      loadNumber,
      drugCount,
      loadStatus,
      rfidCode,
      basketId,
    } = await req.json();

    const basketObj = await db.autoLoad.create({
      data: {
        mqtt_topic: mqttTopic,
        plcId,
        load_number: loadNumber,
        drug_count: drugCount,
        load_status: loadStatus,
        rfid_code: rfidCode,
        basketId,
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
