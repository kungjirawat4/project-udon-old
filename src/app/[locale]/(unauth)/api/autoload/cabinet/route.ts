import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
import { publishMessage } from '@/libs/mqttservice';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    // eslint-disable-next-line no-console
    console.log(data);

    const sendCabinet: any = {
      type: '',
      count: 0,
      ip: '',
      // ID รายการยาที่ส่ง
      id: '',
      // สถานะ เปิด ปิด ไฟ 4 ดวง
      status: 0,
    };

    // 'http://172.16.2.254:3000/api/autoload/cbinet'

    publishMessage('UDH/A/A4', data);

    return NextResponse.json({
      sendCabinet,
      status: 200,
      message: `This channel is match successfully`,
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
