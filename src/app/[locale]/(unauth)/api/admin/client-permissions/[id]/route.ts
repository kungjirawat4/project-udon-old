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

    const { name, sort, menu, path, description } = await req.json();

    const clientPermissionObj = await db.clientPermission.findUnique({
      where: { id: params.id },
    });
    if (!clientPermissionObj) {
      return getErrorResponse('Client permission not found', 404);
    }

    const checkExistence
      = path
      && params.id
      && (await db.clientPermission.findFirst({
        where: {
          path: path.toLowerCase(),
          id: { not: params.id },
        },
      }));
    if (checkExistence) {
      return getErrorResponse('Client permission already exist');
    }

    await db.clientPermission.update({
      where: { id: params.id },
      data: {
        name,
        sort: Number(sort),
        menu,
        description,
        path: path.toLowerCase(),
      },
    });

    return NextResponse.json({
      ...clientPermissionObj,
      message: 'Client permission has been updated successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    // await isAuth(req, params)

    const clientPermissionObj = await db.clientPermission.delete({
      where: { id: params.id },
    });
    if (!clientPermissionObj) {
      return getErrorResponse('Client permission not found', 404);
    }

    return NextResponse.json({
      ...clientPermissionObj,
      message: 'Client permission has been removed successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
