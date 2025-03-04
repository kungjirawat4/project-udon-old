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
        db.role.findMany({
          where: query,
          include: {
            permissions: true,
            clientPermissions: true,
          },
          skip,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        db.role.count({ where: query }),
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
      const {
        name,
        description,
        permissions: permissionRequest,
        clientPermissions: clientPermissionRequest,
      } = await req.json();

      let type;
      let permission = [];
      let clientPermission = [];
      if (name) {
        type = name.toUpperCase().trim().replace(/\s+/g, '_');
      }

      if (permissionRequest) {
        if (Array.isArray(permissionRequest)) {
          permission = permissionRequest;
        } else {
          permission = [permissionRequest];
        }
      }

      if (clientPermissionRequest) {
        if (Array.isArray(clientPermissionRequest)) {
          clientPermission = clientPermissionRequest;
        } else {
          clientPermission = [clientPermissionRequest];
        }
      }

      permission = permission?.filter(per => per);
      clientPermission = clientPermission?.filter(client => client);

      const checkExistence
        = name
        && (await db.role.findFirst({
          where: { name: { equals: name, mode: QueryMode.insensitive } },
        }));
      if (checkExistence) {
        return getErrorResponse('Role already exist');
      }

      const object = await db.role.create({
        data: {
          name,
          description,
          type,
          permissions: {
            connect: permission?.map(pre => ({ id: pre })),
          },
          clientPermissions: {
            connect: clientPermission?.map(client => ({ id: client })),
          },
        },
      });

      return NextResponse.json({
        ...object,
        message: 'Role created successfully',
      });
    }
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});
