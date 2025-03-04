import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = auth(async (req) => {
  try {
    if (req.auth) {
      const userObj = await db.user.findUnique({
        where: { id: req.auth.user?.id },
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
    }
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});

// export async function GET(req: NextApiRequestExtended) {
//   try {
//     // await isAuth(req)

//     const userObj = await prisma.user.findUnique({
//       where: { id: req.user.id },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         mobile: true,
//         image: true,
//         bio: true,
//         address: true,
//       },
//     })

//     return NextResponse.json(userObj)
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status)
//   }
// }
