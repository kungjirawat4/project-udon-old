import { NextResponse } from 'next/server';

import { currentUser } from '@/libs/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export async function GET() {
  try {
    const user: any = await currentUser();
    const userObj = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        image: true,
        bio: true,
        address: true,
      },
    });

    return NextResponse.json(userObj);
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
