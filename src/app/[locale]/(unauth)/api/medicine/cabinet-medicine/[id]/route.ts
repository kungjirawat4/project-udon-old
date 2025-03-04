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

    const MedicineObj = await db.medicine.findUnique({
      where: { id: params.id },
    });
    if (!MedicineObj) {
      return getErrorResponse('Drug not found', 404);
    }

    await db.medicine.update({
      where: { id: params.id },
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
      ...MedicineObj,
      message: 'Drug has been updated successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const DurgObj = await db.medicine.delete({
      where: { id: params.id },
    });
    if (!DurgObj) {
      return getErrorResponse('Drug not found', 404);
    }

    return NextResponse.json({
      ...DurgObj,
      message: 'Drug has been removed successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
