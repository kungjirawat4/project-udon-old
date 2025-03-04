import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = auth(async (req) => {
  try {
    if (req.auth) {
      const { searchParams } = new URL(req.url);
      const q = searchParams.get('q');

      const query = q
        ? { name: { contains: q, mode: QueryMode.insensitive } }
        : {};

      const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
      const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 25;
      const skip = (page - 1) * pageSize;

      const [result, total] = await Promise.all([
        db.permission.findMany({
          where: query,
          skip,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        db.permission.count({ where: query }),
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
    }
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});

export const POST = auth(async (req) => {
  try {
    if (req.auth) {
      const { name, method, route, description } = await req.json();

      const checkExistence
        = method
        && route
        && (await db.permission.findFirst({
          where: {
            method: method.toUpperCase(),
            route: route.toLowerCase(),
          },
        }));
      if (checkExistence) {
        return getErrorResponse('Permission already exist');
      }

      const permissionObj = await db.permission.create({
        data: {
          name,
          method: method.toUpperCase(),
          route: route.toLowerCase(),
          description,
        },
      });

      return NextResponse.json({
        ...permissionObj,
        message: 'Permission created successfully',
      });
    }
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});
