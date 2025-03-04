import { NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_req: Request, { params }: Params) => {
  try {
    // const queue = await prisma.configure.findFirst();

    const prescriptionLoadObj = await db.prescription.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        basketId: true,
        medicine_total: true,
        queue_num: true,
        queue_type: true,
        createdAt: true,
      },
    });

    if (!prescriptionLoadObj) {
      return getErrorResponse('No prescription found in the system', 500);
    }
    return NextResponse.json(prescriptionLoadObj);
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

// export const PUT = async (req: Request, { params }: Params) => {
//   try {

//     return NextResponse.json({
//       message: 'Basket has been match successfully',
//     });
//   } catch ({ status = 500, message }: any) {
//     return getErrorResponse(message, status);
//   }
// };
