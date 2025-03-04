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
    const { name, address, mobile, bio, image } = await req.json();

    const object = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!object) {
      return getErrorResponse('User profile not found', 404);
    }

    const result = await db.user.update({
      where: { id: params.id },
      data: {
        name: name || object.name,
        mobile: mobile || object.mobile,
        address: address || object.address,
        image: image || object.image,
        bio: bio || object.bio,
      },
    });

    return NextResponse.json({
      name: result.name,
      email: result.email,
      image: result.image,
      mobile: result.mobile,
      message: 'Profile has been updated successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
