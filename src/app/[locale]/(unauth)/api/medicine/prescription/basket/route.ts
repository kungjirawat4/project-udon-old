import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = auth(async (_req) => {
  try {
    // if (req.auth) {
    const [result] = await Promise.all([
      db.prescription.findMany({
        where: { basketId: { not: null } },
        include: {
          basket: true,
          arranged: {
            include: {
              medicine: {
                include: {
                  cabinet: true,
                },
              },
            },
          },
        },
        orderBy: [{ urgent: 'desc' }, { createdAt: 'asc' }],
      }),
    ]);

    return NextResponse.json({
      data: result,
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});
