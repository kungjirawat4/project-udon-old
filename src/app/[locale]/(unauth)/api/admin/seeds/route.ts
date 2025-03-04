import { NextResponse } from 'next/server';

import { clientPermissions, config, permissions, roles, users } from '@/constants/seeds';
import { encryptPassword, getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    const option = searchParams.get('option');

    if (!secret || secret !== 'ts') {
      return getErrorResponse('Invalid secret', 401);
    }

    // Check duplicate permissions
    permissions.map((p) => {
      if (p.method && p.route) {
        const duplicate = permissions.filter(
          p2 => p2.method === p.method && p2.route === p.route,
        );
        if (duplicate.length > 1) {
          return getErrorResponse(`Duplicate permission: ${p.method} ${p.route}`, 500);
        }
      }
      return null;
    });

    // Delete all existing data if option is reset
    if (option === 'reset') {
      // await db.user.deleteMany({});
      await db.permission.deleteMany({});
      await db.clientPermission.deleteMany({});
      await db.role.deleteMany({});
      // await db.configure.deleteMany({});
    }

    // Create roles or update if exists
    await db.$transaction(async (prisma) => {
      await Promise.all(
        roles?.map(
          async obj =>
            await prisma.role.upsert({
              where: { id: obj.id },
              update: obj,
              create: obj,
            }),
        ),
      );
    });

    // //  // Create configure if exists
    // await db.configure.up({
    //   data: {
    //     ...config,
    //   },
    // });

    // // Create users or update if exists
    // await db.configure.upsert({
    //   where: { id: config.id },
    //   create: {
    //     ...config,
    //   },
    //   update: {
    //     ...config,
    //   },
    // });

    // Create users or update if exists
    await db.user.upsert({
      where: { id: users.id },
      create: {
        ...users,
        password: await encryptPassword({ password: users.password }),
        roleId: roles[0].id,
        config: config.id,
      },
      update: {
        ...users,
        roleId: roles[0].id,
        config: config.id,
        password: await encryptPassword({ password: users.password }),
      },
    });

    await db.user.update({
      data: {
        roleId: roles[0].id,
      },
      where: { id: users.id },
    });

    // Create permissions
    await Promise.all(
      permissions?.map(
        async obj =>
          await db.permission.upsert({
            where: { id: obj.id },
            update: obj as any,
            create: obj as any,
          }),
      ),
    );

    // Create client permissions
    await Promise.all(
      clientPermissions?.map(
        async obj =>
          await db.clientPermission.upsert({
            where: { id: obj.id },
            update: obj,
            create: obj,
          }),
      ),
    );

    // Create roles or update if exists
    await Promise.all(
      roles?.map(
        async obj =>
          await db.role.upsert({
            where: { id: obj.id },
            update: {
              ...obj,
              ...(obj.type === 'SUPER_ADMIN' && {
                permissions: {
                  connect: permissions.map(p => ({ id: p.id })),
                },
              }),
              ...(obj.type === 'SUPER_ADMIN' && {
                clientPermissions: {
                  connect: clientPermissions.map(p => ({
                    id: p.id,
                  })),
                },
              }),
            },
            create: {
              ...obj,
              ...(obj.type === 'SUPER_ADMIN' && {
                permissions: {
                  connect: permissions.map(p => ({ id: p.id })),
                },
              }),
              ...(obj.type === 'SUPER_ADMIN' && {
                clientPermissions: {
                  connect: clientPermissions.map(p => ({
                    id: p.id,
                  })),
                },
              }),
            },
          }),
      ),
    );

    return NextResponse.json({
      message: 'Database seeded successfully',
      config: await db.configure.count({}),
      users: await db.user.count({}),
      permissions: await db.permission.count({}),
      clientPermissions: await db.clientPermission.count({}),
      roles: await db.role.count({}),
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
