import { type NextRequest, NextResponse } from 'next/server';

import { encryptPassword, getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = async (req: NextRequest) => {
  try {
    // if (req.auth) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    const query = q
      ? { email: { contains: q, mode: QueryMode.insensitive } }
      : {};

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 25;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.user.findMany({
        where: query,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          confirmed: true,
          isTwoFactorEnabled: true,
          blocked: true,
          createdAt: true,
          role: {
            select: {
              id: true,
              type: true,
              name: true,
            },
          },
        },
      }),
      db.user.count({ where: query }),
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
};

export const POST = async (req: NextRequest) => {
  try {
    // if (req.auth) {
    const { name, email, password, confirmed, blocked }
        = await req.json();

    // const role
    //     = roleId && (await db.role.findFirst({ where: { id: roleId } }));
    // if (!role) {
    //   return getErrorResponse('Role not found', 404);
    // }

    const user
        = email
        && (await db.user.findFirst({
          where: { email: email.toLowerCase() },
        }));
    if (user) {
      return getErrorResponse('User already exists', 409);
    }

    const userObj = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        confirmed,
        blocked,
        // roleId: role.id,
        image: `https://ui-avatars.com/api/?uppercase=true&name=${name}&background=random&color=random&size=128`,
        password: await encryptPassword({ password }),
      },
    });

    userObj.password = undefined as any;

    return NextResponse.json({
      userObj,
      message: 'User has been created successfully',
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
