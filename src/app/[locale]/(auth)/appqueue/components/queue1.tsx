'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';

import { TopLoadingBar } from '@/components/common/TopLoadingBar';
import useApi from '@/hooks/useApi';
import { DateTimeLongTH } from '@/libs/dateTime';
import { Input } from '@/ui/input';

import QRscanner from './_components/Qrcode';

export default function Queue1() {
  // const [Data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<number>(() =>
    Number(localStorage.getItem('selectedChannel')),
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const getApi = useApi({
    key: ['appqueue'],
    method: 'GET',
    url: `appqueue/queuewait/${selectedChannel}`,
  })?.get;
  const updateApi = useApi({
    key: ['prescription'],
    method: 'PUT',
    url: `medicine/prescription`,
  })?.put;
  // console.log(getApi?.data?.data);
  useEffect(() => {
    getApi?.refetch();

    searchInputRef.current?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannel]);

  const handleResult = (result: string) => {
    setSearch(result); // ตั้งค่าผลลัพธ์การสแกนใน search
    searchInputRef.current?.focus(); // โฟกัสช่องค้นหา
  };
  const handleupdate = (id: string) => {
    try {
      updateApi?.mutateAsync({
        id,
        station: true,
        queueStatus: 'เรียกคิวแล้ว',
      });
      // getApi?.refetch();
    } catch (error) {
      // console.error('Error:', error);
      // console.log('data:', datas);
      console.error('Error:', error);
    }
  };
  // const handlecancel = (id: string) => {
  //   try {
  //     updateApi?.mutateAsync({
  //       id,
  //       station: true,
  //       queueStatus: 'ยกเลิก',
  //     });
  //     // getApi?.refetch();
  //   } catch (error) {
  //     // console.error('Error:', error);
  //     // console.log('data:', datas);
  //     console.error('Error:', error);
  //   }
  // };
  useEffect(() => {
    if (updateApi?.isSuccess) {
      getApi?.refetch();
      searchInputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateApi?.isSuccess]);
  const filteredData = getApi?.data?.data?.filter((item: any) =>
    item.full_name.includes(search) // ค้นหาจากชื่อผู้ป่วย
    || item.queue_code.includes(search) // ค้นหาจากรหัสคิว
    || item.hnCode.includes(search), // ค้นหาจากรหัส HN
  );
  const handleChannelSelect = (key: string) => {
    const channel = Number(key);
    setSelectedChannel(channel);
    localStorage.setItem('selectedChannel', String(channel));
  };

  return (
    <>
      <TopLoadingBar isFetching={getApi?.isFetching || getApi?.isPending} />
      <div className="flex justify-center text-xl">
        {/* ช่องจัดยาที่ 34 */}
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize" variant="bordered">
              ช่องจ่ายยาที่
              {' '}
              {selectedChannel}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Select channel"
            selectionMode="single"
            onSelectionChange={keys =>
              handleChannelSelect(String(Array.from(keys)[0]))}
          >
            {Array.from({ length: 7 }, (_, i) => 33 + i).map(channel => (
              <DropdownItem key={channel.toString()}>{`ช่องที่ ${channel}`}</DropdownItem>
            ))}
          </DropdownMenu>

        </Dropdown>
      </div>
      {/* <div className="flex w-full max-w-[200px] items-center space-x-2">
        <Input
          ref={searchInputRef}
          label="ค้นหา"
          // placeholder="ค้นหา"
          type="text"
          className="h-8"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

      </div> */}
      {/* <QRscanner onResult={(result: SetStateAction<string>) => setSearch(result)} /> */}
      {/* <QRscanner onResult={handleResult} /> */}
      {/* <QRscanner /> */}

      <div className="flex w-full items-center space-x-2">
        <Input
          ref={searchInputRef}
          placeholder="ค้นหา"
          type="text"
          className="flex h-10 w-full  max-w-[200px] grow rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // ใช้ flex-grow ให้ช่องขยายตามพื้นที่
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <QRscanner onResult={handleResult} />
      </div>

      <br />
      <div className="max-h-[70vh] overflow-auto">
        {filteredData?.map((item: any, index: any) => (
        // eslint-disable-next-line react/no-array-index-key
          <Card shadow="sm" key={index} className="mb-3 w-full">

            <CardHeader className="flex gap-5">
              <Image
                isZoomed
                alt="nextui logo"
                height={50}
                radius="sm"
                src="/avatar.jpg"
                width={50}
                className="h-[50px] w-full object-cover"
                loading="lazy"
              />
              <div className="justify-between">
                <p className="text-xl">
                  คิวที่ :
                  {' '}
                  <b>
                    {item.queue_code}
                  </b>
                  {' '}
                </p>
                <p className="text-lg text-default-500">
                  {item.full_name}
                  {' '}
                  HN :
                  {' '}
                  {item.hnCode}
                </p>

              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-between text-lg">
                <p>
                  สถานะ :
                  {' '}
                  <b>{item.prescrip_status}</b>
                </p>
                <div className="space-x-2">
                  <Button
                    color="success"
                    // variant="solid"
                    className="text-lg"
                    variant="bordered"
                    onClick={() => {
                      handleupdate(item.id); // เรียกฟังก์ชันเมื่อคลิก
                    }}
                  >
                    เรียกคิว
                  </Button>
                  {/* <Button
                    color="danger"
                    variant="bordered"
                    className="text-lg"
                    onClick={() => {
                      handlecancel(item.id); // เรียกฟังก์ชันเมื่อคลิก
                    }}
                  >
                    ยกเลิก
                  </Button> */}
                </div>

              </div>

            </CardBody>
            <CardFooter className="text-small">
              วันเวลา :
              {' '}
              <b>{DateTimeLongTH(item?.updatedAt)}</b>

            </CardFooter>
          </Card>

        ))}
      </div>
    </>
  );
}
