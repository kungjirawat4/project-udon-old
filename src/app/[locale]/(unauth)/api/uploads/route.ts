/* eslint-disable simple-import-sort/imports */
// eslint-disable-next-line unicorn/prefer-node-protocol
import fs from 'fs';

// eslint-disable-next-line unicorn/prefer-node-protocol
import path from 'path';
import { type NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

import { currentUser } from '@/libs/auth';
import { getErrorResponse } from '@/libs/helpers';
import { updateUserById } from '@/services/user';

// export const config = {
//   runtime: 'edge',
// };

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? '', 'public/assets/upload');

const uploadObject = async (
  fileName: string,
  data: any,
  _bucket: string,
  page: string | null,
) => {
  try {
    const user: any = await currentUser();
    // fs.writeFile(`public/assets/upload/${fileName}`, data);
    fs.writeFile((`${UPLOAD_DIR}/${fileName}`), data, async (err: any) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully

      }
    });
    if (page === 'profile') {
      await updateUserById(user.id as string, {
        image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/upload/${fileName}`,
      });
    }

    return data;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log('Error', err?.message);
    return getErrorResponse(err?.message, 500);
  }
};

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const page = searchParams.get('page');
    const data = await req.formData();
    const files: File[] | null = data.getAll('file') as unknown as File[];
    const allowedImageTypes = ['.png', '.jpg', '.jpeg', '.gif'];
    const allowedDocumentTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const allowedTypes = ['document', 'image'];

    if (!allowedTypes.includes(type as string)) {
      return getErrorResponse('Invalid file type', 400);
    }

    const isAllowed = files.every((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (type === 'image') {
        return allowedImageTypes.includes(`.${ext}`);
      }
      if (type === 'document') {
        return allowedDocumentTypes.includes(`.${ext}`);
      }
      return null;
    });

    if (!isAllowed) {
      return getErrorResponse('Invalid file type', 400);
    }

    const promises = files.map(async (file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${page}-${file.name.split('.')[0]}-${Date.now()}.${ext}`;
      // eslint-disable-next-line node/prefer-global/buffer
      let buffer = Buffer.from(new Uint8Array(await file.arrayBuffer()));

      if (type === 'image') {
        // eslint-disable-next-line node/prefer-global/buffer
        const size = Buffer.byteLength(Buffer.from(buffer));
        if (size > 200000) {
          buffer = await sharp(buffer).resize(400).toBuffer();
        }
      }

      //   await writeFile(filePath, buffer)
      await uploadObject(fileName, buffer, 'images', page);
      return fileName;
    });
    const fileUrls = await Promise.all(promises);
    return NextResponse.json({
      message: 'File uploaded successfully',
      data: fileUrls?.map(url => ({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/upload/${url.replace(/\s/g, '%20')}`,
      })),
    });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
}
