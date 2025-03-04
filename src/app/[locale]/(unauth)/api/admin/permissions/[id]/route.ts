// import { isAuth } from '@/lib/auth'
import { NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: Params) {
  try {
    // await isAuth(req, params)

    const { name, method, route, description } = await req.json();

    const permissionObj = await db.permission.findUnique({
      where: { id: params.id },
    });

    if (!permissionObj) {
      return getErrorResponse('Permission not found', 404);
    }

    const checkExistence
      = method
      && route
      && params.id
      && (await db.permission.findFirst({
        where: {
          method: method.toUpperCase(),
          route: route.toLowerCase(),
          id: { not: params.id },
        },
      }));
    if (checkExistence) {
      return getErrorResponse('Permission already exist');
    }

    await db.permission.update({
      where: { id: params.id },
      data: {
        name,
        method: method.toUpperCase(),
        description,
        route: route.toLowerCase(),
      },
    });

    return NextResponse.json({
      ...permissionObj,
      message: 'Permission has been updated successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    // await isAuth(req, params)

    const permissionObj = await db.permission.delete({
      where: { id: params.id },
    });

    if (!permissionObj) {
      return getErrorResponse('Permission not removed', 404);
    }

    return NextResponse.json({
      ...permissionObj,
      message: 'Permission has been removed successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
