import { NextResponse } from 'next/server';

import { encryptPassword, getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: Params) {
  try {
    const { name, address, mobile, bio, image, password } = await req.json();

    const object = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!object) {
      return getErrorResponse('User profile not found', 404);
    }

    if (password) {
      const regex
        = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(password)) {
        return getErrorResponse(
          'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character',
          400,
        );
      }
    }

    const result = await db.user.update({
      where: { id: params.id },
      data: {
        ...(password && { password: await encryptPassword({ password }) }),
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
