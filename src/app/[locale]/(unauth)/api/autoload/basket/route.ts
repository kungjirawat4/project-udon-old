// import axios from 'axios';
import dayjs from 'dayjs';
import { type NextRequest, NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';
// import { publishMessage } from '@/libs/mqttservice';
import { db } from '@/libs/prisma.db';

export const GET = async (req: NextRequest) => {
  try {
    // const { basketId } = await req.json();
    // // eslint-disable-next-line no-console
    // console.log(basketId);
    return NextResponse.json(req.json());
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};

// const isPrinting = false;
export const POST = async (req: NextRequest) => {
  try {
    const { basketId, ipaddress } = await req.json();

    // ชุดปล่อยตะกร้า
    if (ipaddress === '100') {
      const basket = await db.basket.findFirst({
        where: { qrCode: basketId, basket_match: false },
      });
      // console.log('yufyuhi', basket);
      if (basket) {
        const dayjsNow = dayjs();
        const dayjsStartDate = dayjsNow.startOf('day');
        const dayjsEndDate = dayjsNow.endOf('day');
        const prescriptionLoadObj = await db.prescription.findFirst({
          select: {
            id: true,
            full_name: true,
            hnCode: true,
            queue_code: true,
            basketId: true,
            medicine_total: true,
            queue_num: true,
            queue_type: true,
            createdAt: true,
            doctor_names: true,
            lap_name: true,
            dept_name: true,
            drug_allergy: true,
            pay_type: true,
            age: true,
            arranged: {
              include: {
                medicine: true,
              },
            },
          },
          take: 1,
          where: {
            AND: [
              { createdAt: { gte: new Date(dayjsStartDate.format('YYYY-MM-DDTHH:mm:ss')) } },
              { createdAt: { lte: new Date(dayjsEndDate.format('YYYY-MM-DDTHH:mm:ss')) } },
              { basketId: null },
              { prescrip_status: 'รอจับคู่ตะกร้า' },
            ],
          },
          orderBy: [{ urgent: 'desc' }, { queue_random: 'asc' }, { queue_code: 'asc' }, { createdAt: 'asc' }],
        });

        if (!prescriptionLoadObj) {
          return getErrorResponse('No prescription found in the system', 500);
        }
        // console.log('jjj', prescriptionLoadObj?.id);
        // console.log('jjj', basket.basket_type);
        if (prescriptionLoadObj?.queue_type === basket.basket_type) {
          // console.log('jjj', prescriptionLoadObj?.queue_type);
          // console.log('jjj', basket.basket_type);
          await db.$transaction(async (db) => {
          // จับคู่สำเร็จ พิมพ์ใบนำทาง

            // console.log('ddd', prescriptionLoadObj);
            // const printData = prescriptionLoadObj;
            // // จัดรูปแบบข้อมูลตามที่ต้องการ
            // const dataToSend = {
            //   HN: `${printData?.hnCode}`,
            //   q_dep: `${printData?.queue_code}`,
            //   pname: `${printData?.full_name}`,
            //   Age: `${printData.age}`,
            //   doctor: `${printData.doctor_names}`,
            //   pay: `${printData?.pay_type}`,
            //   lap: `${printData?.lap_name || ''}`,
            //   dept: `${printData?.dept_name || ''}`,
            //   allergy: `${printData?.drug_allergy || ''}`,
            //   type_q: `${printData?.queue_type || ''}`,
            //   item: printData?.arranged.map(arrange => ({
            //     name: arrange?.medicine_name,
            //     quantity: arrange?.medicine_amount,
            //     med_details: arrange?.med_detail1,
            //     packsize: arrange?.medicinePackageSize,
            //     labelNo: arrange?.labelNo,
            //     dispcause: arrange?.dispcause || '', /// F
            //     medsts: arrange?.medsts || '', // 0 ยาใหม่
            //   })),

            // };
            //   });
            // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/nodeprint`, dataToSend)
            // // await axios.post('http://172.16.2.254:3000/api/nodeprint', dataToSend)
            //   .then(async (response) => {
            //     // เช็คค่าผลลัพธ์จาก API ว่าการพิมพ์สำเร็จหรือไม่
            //     if (response.data.success === true) {
            //       // publishMessage('UDH/PRINT', JSON.stringify({ status: response.data.success, queue_type: prescriptionLoadObj?.queue_type }));
            //       publishMessage('UDH/PRINT', JSON.stringify({ status: 'success', queue_type: prescriptionLoadObj?.queue_type, hnCode: prescriptionLoadObj?.hnCode }));
            //     } else {
            //       console.error('Printing failed, retrying...');
            //       // ส่งข้อมูลพิมพ์ใหม่
            //       // await axios.post('http://172.16.2.254:3000/api/nodeprint', dataToSend)
            //       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/nodeprint`, dataToSend)
            //         .then((retryResponse) => {
            //           // eslint-disable-next-line no-console
            //           console.log('Retry print response:', retryResponse.data);
            //           // publishMessage('UDH/PRINT', JSON.stringify({ status: response.data.success, queue_type: prescriptionLoadObj?.queue_type }));
            //           publishMessage('UDH/PRINT', JSON.stringify({ status: 'success', queue_type: prescriptionLoadObj?.queue_type, hnCode: prescriptionLoadObj?.hnCode }));
            //         })
            //         .catch((retryError) => {
            //           console.error('Error retrying print:', retryError);
            //         });
            //     }
            //   })
            //   .catch((error) => {
            //     console.error('Error sending data to /api/nodeprint:', error);
            //   });
            // publishMessage('UDH/PRINT', JSON.stringify({ status: 'success', queue_type: prescriptionLoadObj?.queue_type, hnCode: prescriptionLoadObj?.queue_type }));
            await db.prescription.update({
              where: { id: prescriptionLoadObj?.id as string },
              data: {
                basketId: basket.id as string,
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionLoadObj?.id as string },
              data: {
                basketId: basket.id as string,
              },
            });

            await db.basket.update({
              where: { id: basket?.id as string },
              data: {
                basket_match: false, // อย่าลืมเปลี่ยนเป็น true
              },
            });
          });

          return NextResponse.json({
            status: 200,
            message: `This basket ${prescriptionLoadObj} is match successfully`,
          });
        }
      }
    } else {
      const basket = await db.basket.findFirst({
        where: { qrCode: basketId, basket_match: false }, // แก้ไขตอนขึ้น server เป็น true
      });

      const prescriptionObj = await db.prescription.findFirst({
        select: {
          id: true,
          hnCode: true,
          basketId: true,
          medicine_total: true,
          queue_num: true,
          queue_type: true,
          createdAt: true,
        },
        take: 1,
        where: {
          // createdAt: {
          //   gte: startOfDay, // มากกว่าหรือเท่ากับเวลาตอนเริ่มวัน
          //   lte: endOfDay, // น้อยกว่าหรือเท่ากับเวลาตอนสิ้นสุดวัน
          // },
          basketId: basket?.id as string,
          prescrip_status: 'รอจับคู่ตะกร้า',
        },
        orderBy: [{ createdAt: 'asc' }],
      });

      if (basket && prescriptionObj) {
        if (ipaddress === '101') { // ช่องตะกร้าเข้า 1
          await db.$transaction(async (db) => {
            const autoload = await db.autoLoad.findFirst({
              where: { load_number: Number(1) },
            });

            await db.autoLoad.update({
              where: { id: autoload?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: prescriptionObj?.medicine_total,
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '102') { // ช่องตะกร้าเข้า 2
          await db.$transaction(async (db) => {
            const autoload2 = await db.autoLoad.findFirst({
              where: { load_number: Number(2) },
            });

            await db.autoLoad.update({
              where: { id: autoload2?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload2?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload2?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '103') { // ช่องตะกร้าเข้า 3
          await db.$transaction(async () => {
            const autoload3 = await db.autoLoad.findFirst({
              where: { load_number: Number(3) },
            });

            await db.autoLoad.update({
              where: { id: autoload3?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload3?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload3?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '104') { // ช่องตะกร้าเข้า 4
          await db.$transaction(async () => {
            const autoload4 = await db.autoLoad.findFirst({
              where: { load_number: Number(4) },
            });

            await db.autoLoad.update({
              where: { id: autoload4?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload4?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload4?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '105') { // ช่องตะกร้าเข้า 5
          await db.$transaction(async () => {
            const autoload5 = await db.autoLoad.findFirst({
              where: { load_number: Number(5) },
            });

            await db.autoLoad.update({
              where: { id: autoload5?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload5?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload5?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '106') { // ช่องตะกร้าเข้า 6
          await db.$transaction(async () => {
            const autoload6 = await db.autoLoad.findFirst({
              where: { load_number: Number(6) },
            });

            await db.autoLoad.update({
              where: { id: autoload6?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload6?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload6?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '107') { // ช่องตะกร้าเข้า 7
          await db.$transaction(async () => {
            const autoload7 = await db.autoLoad.findFirst({
              where: { load_number: Number(7) },
            });

            await db.autoLoad.update({
              where: { id: autoload7?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload7?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload7?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '108') { // ช่องตะกร้าเข้า 8
          await db.$transaction(async () => {
            const autoload8 = await db.autoLoad.findFirst({
              where: { load_number: Number(8) },
            });

            await db.autoLoad.update({
              where: { id: autoload8?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload8?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload8?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '109') { // ช่องตะกร้าเข้า 9
          await db.$transaction(async () => {
            const autoload9 = await db.autoLoad.findFirst({
              where: { load_number: Number(9) },
            });

            await db.autoLoad.update({
              where: { id: autoload9?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload9?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload9?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '110') { // ช่องตะกร้าเข้า 10
          await db.$transaction(async () => {
            const autoload10 = await db.autoLoad.findFirst({
              where: { load_number: Number(0) },
            });

            await db.autoLoad.update({
              where: { id: autoload10?.id as string },
              data: {
                orderId: prescriptionObj?.id as string,
                basketId: basket?.id as string,
                drug_count: Number(prescriptionObj?.medicine_total),
              },
            });

            await db.prescription.update({
              where: { id: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload10?.id as string,
                prescrip_status: 'กำลังจัดยา',
              },
            });

            await db.arranged.updateMany({
              where: { prescripId: prescriptionObj?.id as string },
              data: {
                basketId: basket?.id as string,
                autoLoad: autoload10?.id as string,
                arrang_status: 'กำลังจัดยา',
              },
            });
          });
          return NextResponse.json({
            status: 200,
            message: `succeed`,
          });
        } else if (ipaddress === '111') { // ระกร้าออกช่อง 1
          const out = await db.prescription.findFirst({
            where: {
              // createdAt: { gte: new Date(utcDate), lte: new Date(new Date(utcDate).setDate(new Date(utcDate).getDate() + 1)) },
              basketId: basket.id,
              channel: Number(1),
            },
          });
          if (!out) {
            // return getErrorResponse('No prescription found in the system', 200);
            return getErrorResponse('This basket is not match', 500);
          } else {
            return NextResponse.json({
              status: 200,
              message: `succeed`,
            });
          }
        } else if (ipaddress === '112') { // ระกร้าออกช่อง 2
          const out = await db.prescription.findFirst({
            where: {
              // createdAt: { gte: new Date(utcDate), lte: new Date(new Date(utcDate).setDate(new Date(utcDate).getDate() + 1)) },
              basketId: basket.id,
              channel: Number(2),
            },
          });
          if (!out) {
            // return getErrorResponse('No prescription found in the system', 200);
            return getErrorResponse('This basket is not match', 500);
          } else {
            return NextResponse.json({
              status: 200,
              message: `succeed`,
            });
          }
        } else if (ipaddress === '113') { // ระกร้าออกช่อง 3
          const out = await db.prescription.findFirst({
            where: {
              // createdAt: { gte: new Date(utcDate), lte: new Date(new Date(utcDate).setDate(new Date(utcDate).getDate() + 1)) },
              basketId: basket.id,
              channel: Number(3),
            },
          });
          if (!out) {
            ;
            return getErrorResponse('This basket is not match', 500);
          } else {
            return NextResponse.json({
              status: 200,
              message: `succeed`,
            });
          }
        } else if (ipaddress === '114') { // ระกร้าออกช่อง 4
          const out = await db.prescription.findFirst({
            where: {
              // createdAt: { gte: new Date(utcDate), lte: new Date(new Date(utcDate).setDate(new Date(utcDate).getDate() + 1)) },
              basketId: basket.id,
              channel: Number(4),
            },
          });
          if (!out) {
            return getErrorResponse('This basket is not match', 500);
          } else {
            return NextResponse.json({
              status: 200,
              message: `succeed`,
            });
          }
        }
      }

      return getErrorResponse('This basket & prescription is not match', 500);
    }

    return getErrorResponse('Not found', 500);
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
