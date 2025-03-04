import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_req: NextRequest, { params }: Params) => {
  try {
    const myArray: any = [];
    // if (req.auth) {
    const station = await db.configure.findFirst({
      where: { hospital_initial: 'UDH' },
    });

    if (!station) {
      return getErrorResponse('Hospital not found', 404);
    }

    const arrangeds = await db.prescription.findMany({
      where: { id: params.id },
      include: {
        arranged: {
          include: {
            medicine: {
              include: {
                cabinet: {
                  where: { storage_station: station.hospital_station },
                },
              },
            },
          },
        },
      },
    });

    arrangeds.map(async (obj) => {
      obj.arranged.map(async (arrang) => {
        const num = arrang?.medicine?.cabinet.length;
        if (num) {
          myArray.push(arrang);
          // console.log('okkk', num, arrang);
        }
      });
    });

    // const medicines = await prisma.medicine.findMany({
    //   where: { id: { in: myArray } },
    // });

    return NextResponse.json({
      data: myArray,
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
