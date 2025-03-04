'use client';

import { Spinner } from '@nextui-org/react';
import JSZip from 'jszip';
import React, { useEffect } from 'react';
import { FaDatabase } from 'react-icons/fa6';

import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import { FormButton } from '@/components/data-tables/CustomForm';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCurrentUser } from '@/hooks/use-current-user';
import useToasts from '@/hooks/use-toast';
import useApi, { baseUrl } from '@/hooks/useApi';

function Page() {
  const user: any = useCurrentUser();
  const {
    userInfo: { token },
  } = user;

  const zip = new JSZip();

  const getApi = useApi({
    key: ['databases'],
    method: 'GET',
    url: `admin/databases`,
  })?.get;

  const postApi = useApi({
    key: ['databases'],
    method: 'POST',
    url: `admin/databases/backup`,
  })?.post;

  useEffect(() => {
    if (postApi?.isSuccess) {
      getApi?.refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess]);

  const downloadDBHandler = async (db: string) => {
    return fetch(`${baseUrl}/databases/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/zip',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ db }),
    })
      .then(response => response.blob())
      .then((blob) => {
        zip.file(db, blob);
        zip
          .generateAsync({
            type: 'blob',
            streamFiles: true,
          })
          .then((data: Blob | MediaSource) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(data);
            link.download = db;
            link.click();
          });
      });
  };

  const { toastError }: any = useToasts();

  return (
    <div className="container mt-2 overflow-x-auto bg-white p-3">
      {postApi?.isError && toastError(postApi?.error)}

      <TopLoadingBar
        isFetching={
          getApi?.isFetching || getApi?.isPending || postApi?.isPending
        }
      />

      <div className="my-4 text-center">
        <FormButton
          onClick={() => postApi?.mutateAsync({})}
          label="Backup Database"
          icon={<FaDatabase />}
        />
      </div>

      {getApi?.isPending
        ? (
            <Spinner />
          )
        : getApi?.isError
          ? (
              toastError(getApi?.error)
            )
          : getApi?.data?.data?.length > 0
            ? (
                <Table>
                  <TableCaption>A list of your recent databases.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Database</TableHead>
                      <TableHead>Download</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getApi?.data?.data?.map((db: any) => (
                      <TableRow key={db}>
                        <TableCell>{db}</TableCell>
                        <TableCell>
                          <FormButton
                            onClick={() => downloadDBHandler(db)}
                            label="Download"
                            icon={<FaDatabase />}
                            size="sm"
                            variant="secondary"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            : (
                <div className="text-center text-sm text-red-500">
                  No databases found
                </div>
              )}
    </div>
  );
}

export default Page;
