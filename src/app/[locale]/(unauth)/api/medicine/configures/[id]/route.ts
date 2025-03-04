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
      hospitalCode,
      hospitalLogo,
      hospitalInitial,
      hospitalNameTh,
      hospitalNameEn,
      hospitalDate,
      hospitalTime,
      hospitalQueueDay,
      hospitalStatus,
      hospitalStation,
      hospitalCallMessage,
      hospitalMessage,

    } = await req.json();

    const ConfigObj = await db.configure.findUnique({
      where: { id: params.id },
    });
    if (!ConfigObj) {
      return getErrorResponse('Cabinet not found', 404);
    }

    await db.configure.update({
      where: { id: params.id },
      data: {
        hospital_code: hospitalCode,
        hospital_logo: hospitalLogo,
        hospital_initial: hospitalInitial,
        hospital_nameTH: hospitalNameTh,
        hospital_nameEN: hospitalNameEn,
        hospital_date: new Date(hospitalDate),
        hospital_time: hospitalTime,
        hospital_queue_day: Number(hospitalQueueDay),
        hospital_status: Boolean(hospitalStatus),
        hospital_station: hospitalStation as string,
        hospital_call_message: hospitalCallMessage as string,
        hospital_message: hospitalMessage as string,
      },
    });

    return NextResponse.json({
      ...ConfigObj,
      message: 'Configured has been updated successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const ConfigObj = await db.configure.delete({
      where: { id: params.id },
    });
    if (!ConfigObj) {
      return getErrorResponse('Configured not found', 404);
    }

    return NextResponse.json({
      ...ConfigObj,
      message: 'Configured has been removed successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
