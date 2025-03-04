// import { endOfDay, startOfDay } from 'date-fns';
import { type NextRequest, NextResponse } from 'next/server';

// import { utcDate } from '@/libs/dateTime';
import { getErrorResponse } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const GET = async () => {
  try {
    const queueObj = await db.queue.findMany();

    return NextResponse.json(queueObj);
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const {
      qMedNo,
      qMedRoom,
      hn,
      fullname,
      callMsg,
      queuePay,
    } = await req.json();

    const QueueObj = await db.queue.findFirst({
      where: {
        queueCode: String(qMedNo.trim()),
        hnCode: String(hn.trim()),
      },
    });

    if (!QueueObj) {
      await db.$transaction(async (db) => {
        await db.queue.create({ data: {
          queueCode: String(qMedNo.trim()),
          channel: Number(0),
          channel2: Number(qMedRoom),
          hnCode: String(hn.trim()),
          fullName: fullname.trim(),
          queueStatus: Number(1),
        } });

        const qMedNoAll = qMedNo.trim();
        const result = String(callMsg?.call);
        const call = result.split(',');
        const addCall = `${call[0]} ${qMedNoAll.substring(0, 1)} ${qMedNoAll.substring(1, 2)} ${qMedNoAll.substring(2, 3)} ${qMedNoAll.substring(3, 4)} ${qMedNoAll.substring(4, 5)}. ${call[1]} ${qMedRoom} ${call[2]}`;
        await db.queueMsg.create({ data: {
          callMsg: addCall,
          queueStatus: 0,
        } });
      });
    }
    const QueuePay = await db.queue.findFirst({
      where: {
        hnCode: queuePay?.pay?.hn.trim(),
        queueCode: queuePay?.pay?.qMedNo.trim(),
      },
    });
    if (QueuePay) {
      await db.$transaction(async (db) => {
        // const prescripObj = await db.prescription.findFirst({
        //   where: { createdAt: { gte: new Date(utcDate) }, queue_code: String(qMedNo.trim()), hnCode: String(hn.trim()) },
        // });
        await db.queue.update({
          where: { id: QueuePay.id as string },
          data: {
            queueStatus: Number(4),
          },
        });
        await db.prescription.updateMany({
          where: {
            queue_code: QueuePay.queueCode,
            hnCode: QueuePay.hnCode,
          },
          data: {
            prescrip_status: 'จ่ายยาสำเร็จ',
          },
        },
        );
      });
    }

    return NextResponse.json({

      message: 'Queue has been created successfully',
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
