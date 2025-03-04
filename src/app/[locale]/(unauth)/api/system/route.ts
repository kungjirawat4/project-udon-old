import { NextResponse } from 'next/server';

import { getErrorResponse } from '@/libs/helpers';

export const GET = async () => {
  try {
    // if (req.auth) {
    const dateNow = new Date();

    return NextResponse.json({ dateNow });
    // }
    // return Response.json({ message: 'Not authenticated' }, { status: 401 });
  } catch ({ status = 500, message }: any) {
    return getErrorResponse(message, status);
  }
};
