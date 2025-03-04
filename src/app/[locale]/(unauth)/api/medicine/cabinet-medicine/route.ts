import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getErrorResponse } from '@/libs/helpers';
import { db, QueryMode } from '@/libs/prisma.db';

export const GET = auth(async (req) => {
  try {
    // if (req.auth) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    const query = q
      ? {
          OR: [
            { id: { contains: q, mode: QueryMode.insensitive } },
            { name: { contains: q, mode: QueryMode.insensitive } },
          ],
        }
      : {};

    const page = Number.parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = Number.parseInt(searchParams.get('limit') as string, 10) || 25;
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      db.medicine.findMany({
        where: query,
        select: {
          id: true,
          name: true,
        },

        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      db.medicine.count({ where: query }),
    ]);

    const pages = Math.ceil(total / pageSize);

    // console.log(result);

    return NextResponse.json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      data: result,
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});

export const POST = auth(async (req) => {
  try {
    // if (req.auth) {
    const {
      medicineCode,
      medicineImage1,
      medicineImage2,
      medicineImage3,
      name,
      medicineName_th,
      medicineName_en,
      medicinePackageSize,
      medicine_method,
      medicineMethodEn,
      medicine_condition,
      medicine_unit_eating,
      medicineUnitEatingEn,
      medicine_frequency,
      medicineFrequencyEn,
      medicine_advice,
      medicineAdviceEn,
      medicineNote,
    } = await req.json();

    // console.log(medicineImage1);
    const MedicineObj = await db.medicine.create({
      data: {
        medicineCode,
        medicineImage1,
        medicineImage2,
        medicineImage3,
        name,
        medicineName_th,
        medicineName_en,
        medicinePackageSize,
        medicine_method,
        medicineMethodEn,
        medicine_condition,
        medicine_unit_eating,
        medicineUnitEatingEn,
        medicine_frequency,
        medicineFrequencyEn,
        medicine_advice,
        medicineAdviceEn,
        medicineNote,
      },
    });

    return NextResponse.json({
      MedicineObj,
      message: 'Drug has been created successfully',
    });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
});
