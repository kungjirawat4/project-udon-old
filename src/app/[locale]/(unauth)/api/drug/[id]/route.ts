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
    const medicineObj = await db.medicine.findFirst({
      where: { id: params.id as string },
    });
    if (!medicineObj) {
      return getErrorResponse('Presciption not found', 404);
    }

    return NextResponse.json({
      ...medicineObj,
      message: 'Medici has been select successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const {
      medicineCode,
      medicineImage1,
      medicineImage2,
      medicineImage3,
      name,
      medicineName_en,
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
        medicineName_en,
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

export async function DELETE(_req: NextRequest, { params }: Params) {
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
