'use client';

import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useEffect } from 'react';

import { DataTable } from '@/components/data-tables/data-table';
import udhApi from '@/hooks/udhApi';

import { columns } from './columns';

// export const runtime = 'edge';

export default function TaskPage() {
  const getUdhApi = udhApi({
    key: ['med-info'],
    method: 'GET',
    url: `udh/med-info`,
  })?.get;

  useEffect(() => {
    getUdhApi?.refetch();
  }, [getUdhApi]);

  // eslint-disable-next-line no-console
  console.log(getUdhApi?.data);

  return (
    <div className="flex h-full flex-col">
      <div className="bg-background/10 backdrop-blur">
        <div className="space-y-4 pl-8 pt-8">
          {/* <BreadCrumb items={breadcrumbItems} /> */}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-5">
        <ScrollArea className=" w-full overflow-x-auto ">
          <DataTable data={getUdhApi?.data} columns={columns} />
        </ScrollArea>
      </div>
    </div>
  );
}
