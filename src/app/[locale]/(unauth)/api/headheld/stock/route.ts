import { NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = async () => {
  try {
    const queueObj = await db.medicine.findMany({
      // where: { medicineStatus: false },
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
        cabinet: true,
      },
    });

    return NextResponse.json(queueObj);
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
