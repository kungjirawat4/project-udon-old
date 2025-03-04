import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = auth(async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    const query = q
      ? { name: { contains: q, mode: QueryMode.insensitive } }
      : {};

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 25;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.clientPermission.findMany({
        where: query,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      db.clientPermission.count({ where: query }),
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
});

export async function POST(req: Request) {
  try {
    // await isAuth(req)

    const { name, sort, menu, path, description } = await req.json();

    const checkExistence
      = path
      && (await db.clientPermission.findFirst({
        where: { path: path.toLowerCase() },
      }));
    if (checkExistence) {
      return getErrorResponse('Client permission already exist');
    }

    const clientPermissionObj = await db.clientPermission.create({
      data: {
        name,
        description,
        sort: Number(sort),
        menu,
        path: path.toLowerCase(),
      },
    });

    return NextResponse.json({
      ...clientPermissionObj,
      message: 'Client permission created successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
