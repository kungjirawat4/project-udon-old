import { NextResponse } from 'next/server';

import { dayjsEndDate, dayjsStartDate } from '@/libs/dateTime';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = async () => {
  try {
    const queueObj = await db.prescription.findMany({
      where: { AND: [
        { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
        { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
      ] },
      select: {
        id: true,
        hnCode: true,
        vnCode: true,
        queue_code: true,
        queue_num: true,
        full_name: true,
        delivery: true,
        prescrip_status: true,
        createdAt: true,
        updatedAt: true,
        arranged: {
          select: {
            id: true,
            prescripId: true,
            medicineCode: true,
            medicine_name: true,
            medicine_amount: true,
            medicinePackageSize: true,
            medicine_method: true,
            medicine_condition: true,
            medicine_unit_eating: true,
            medicine_frequency: true,
            user_arrang: true,
            user_arrang_time: true,
            medicine: {
              select: {
                id: true,
                medicineCode: true,
                medicineImage1: true,
                medicineImage2: true,
                medicineImage3: true,
                name: true,
                storageAdd: true,
                storageMin: true,
                storageMax: true,
                cabinet: {
                  select: {
                    HouseId: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(queueObj);
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
