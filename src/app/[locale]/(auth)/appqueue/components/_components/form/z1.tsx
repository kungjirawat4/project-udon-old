'use client';
import { useEffect, useState } from 'react';
import { FaFolder } from 'react-icons/fa6';

import useApi from '@/hooks/useApi';

import Edit from './edit';

type DataProps = {
  z1: any;

};
export default function Z1({ z1 }: DataProps) {
  const getApiZ1 = useApi({
    key: ['cabinetz1'],
    method: 'GET',
    url: `appqueue/cabinet/Z1`,
  })?.get;
  const getApiZ2 = useApi({
    key: ['cabinetz2'],
    method: 'GET',
    url: `appqueue/cabinet/Z2`,
  })?.get;
  const getApiZ3 = useApi({
    key: ['cabinetz3'],
    method: 'GET',
    url: `appqueue/cabinet/Z3`,
  })?.get;
  const getApiZ4 = useApi({
    key: ['cabinetz4'],
    method: 'GET',
    url: `appqueue/cabinet/Z4`,
  })?.get;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Dcabinet, setDatacabinet] = useState<string | null>(null);
  const [Dataz1, setDataz1] = useState<string | null>(null);
  // console.log('z1', getApiZ1?.data?.data);
  // console.log('z1', z1);
  useEffect(() => {
    getApiZ1?.refetch();
    getApiZ2?.refetch();
    getApiZ3?.refetch();
    getApiZ4?.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetch(`/api/medicine/prescription/${z1}`)
      .then(res => res.json())
      .then((data) => {
        setDataz1(data);
      });
  }, [z1]);

  // const items = getApiZ1?.data?.data;
  const handleClick = (item: any) => {
    // alert(`คุณเลือกตำแหน่ง: ${item.storage_position}`);
    setDatacabinet(item);
    setIsModalOpen(true);
    // หรือทำงานอย่างอื่น เช่น ส่งข้อมูลไปยัง API หรือเปิด Modal
  };
  const sortedData = [...(getApiZ1?.data?.data || [])].sort((a, b) => {
    if (a.storage_position && b.storage_position) {
      return a.storage_position.localeCompare(b.storage_position, 'en', { numeric: true });
    }
    return 0;
  });
  const sortedDataZ2 = [...(getApiZ2?.data?.data || [])].sort((a, b) => {
    if (a.storage_position && b.storage_position) {
      return a.storage_position.localeCompare(b.storage_position, 'en', { numeric: true });
    }
    return 0;
  });
  const sortedDataZ3 = [...(getApiZ3?.data?.data || [])].sort((a, b) => {
    if (a.storage_position && b.storage_position) {
      return a.storage_position.localeCompare(b.storage_position, 'en', { numeric: true });
    }
    return 0;
  });
  const sortedDataZ4 = [...(getApiZ4?.data?.data || [])].sort((a, b) => {
    if (a.storage_position && b.storage_position) {
      return a.storage_position.localeCompare(b.storage_position, 'en', { numeric: true });
    }
    return 0;
  });
  const refreshData = () => {
    if (getApiZ1?.refetch || getApiZ2?.refetch || getApiZ3?.refetch || getApiZ4?.refetch) {
      // console.log('Refreshing data...');
      getApiZ1?.refetch();
      getApiZ2?.refetch();
      getApiZ3?.refetch();
      getApiZ4?.refetch();
    } else {
      // console.error('getApiZ1?.refetch is not defined');
    }
  };
  return (
    <div className="max-h-[70vh] overflow-auto">
      {/* ตู้ Z1 */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <FaFolder />
          <span>ตู้พัก : Z1</span>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-4">
          {sortedData?.map((item: any, index: number) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`flex cursor-pointer items-center justify-center rounded-lg p-6 text-white ${
                !item.datacabinet
                  ? 'bg-green-500'
                  : item.datacabinet
                    ? 'bg-red-500'
                    : 'bg-gray-400'
              }`}
              onClick={() => handleClick(item)}
              role="button" // บอกว่าคือ interactive element
              tabIndex={0} // ทำให้สามารถ focus ด้วยคีย์บอร์ดได้
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); // ป้องกันพฤติกรรม default (เช่น scroll)
                  handleClick(item);
                }
              }}
            >
              {/* ข้อมูลที่แสดงในแต่ละสี่เหลี่ยม */}
              <div className="text-center">
                <p>
                  {item.storage_position}
                </p>
                {item.datacabinet && (
                  <div>
                    <p>
                      คิวที่ :
                      {' '}
                      <span>{item.datacabinet?.split(',')[0]}</span>
                    </p>
                    <p>
                      HN :
                      {' '}
                      <span>{item.datacabinet?.split(',')[1]}</span>
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ตู้ Z2 */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <FaFolder />
          <span>ตู้พัก : Z2</span>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-4">
          {sortedDataZ2?.map((item: any, index: number) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`flex cursor-pointer items-center justify-center rounded-lg p-6 text-white ${
                !item.datacabinet
                  ? 'bg-green-500'
                  : item.datacabinet
                    ? 'bg-red-500'
                    : 'bg-gray-400'
              }`}
              onClick={() => handleClick(item)}
              role="button" // บอกว่าคือ interactive element
              tabIndex={0} // ทำให้สามารถ focus ด้วยคีย์บอร์ดได้
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); // ป้องกันพฤติกรรม default (เช่น scroll)
                  handleClick(item);
                }
              }}
            >
              {/* ข้อมูลที่แสดงในแต่ละสี่เหลี่ยม */}
              <div className="text-center">
                <p>
                  {item.storage_position}
                </p>
                {item.datacabinet && (
                  <div>
                    <p>
                      คิวที่ :
                      {' '}
                      <span>{item.datacabinet?.split(',')[0]}</span>
                    </p>
                    <p>
                      HN :
                      {' '}
                      <span>{item.datacabinet?.split(',')[1]}</span>
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ตู้ Z3 */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <FaFolder />
          <span>ตู้พัก : Z3</span>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-4">
          {sortedDataZ3?.map((item: any, index: number) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`flex cursor-pointer items-center justify-center rounded-lg p-6 text-white ${
                !item.datacabinet
                  ? 'bg-green-500'
                  : item.datacabinet
                    ? 'bg-red-500'
                    : 'bg-gray-400'
              }`}
              onClick={() => handleClick(item)}
              role="button" // บอกว่าคือ interactive element
              tabIndex={0} // ทำให้สามารถ focus ด้วยคีย์บอร์ดได้
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); // ป้องกันพฤติกรรม default (เช่น scroll)
                  handleClick(item);
                }
              }}
            >
              {/* ข้อมูลที่แสดงในแต่ละสี่เหลี่ยม */}
              <div className="text-center">
                <p>
                  {item.storage_position}
                </p>
                {item.datacabinet && (
                  <div>
                    <p>
                      คิวที่ :
                      {' '}
                      <span>{item.datacabinet?.split(',')[0]}</span>
                    </p>
                    <p>
                      HN :
                      {' '}
                      <span>{item.datacabinet?.split(',')[1]}</span>
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ตู้ Z4 */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <FaFolder />
          <span>ตู้พัก : Z4</span>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-4">
          {sortedDataZ4?.map((item: any, index: number) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`flex cursor-pointer items-center justify-center rounded-lg p-6 text-white ${
                !item.datacabinet
                  ? 'bg-green-500'
                  : item.datacabinet
                    ? 'bg-red-500'
                    : 'bg-gray-400'
              }`}
              onClick={() => handleClick(item)}
              role="button" // บอกว่าคือ interactive element
              tabIndex={0} // ทำให้สามารถ focus ด้วยคีย์บอร์ดได้
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); // ป้องกันพฤติกรรม default (เช่น scroll)
                  handleClick(item);
                }
              }}
            >
              {/* ข้อมูลที่แสดงในแต่ละสี่เหลี่ยม */}
              <div className="text-center">
                <p>
                  {item.storage_position}
                </p>
                {item.datacabinet && (
                  <div>
                    <p>
                      คิวที่ :
                      {' '}
                      <span>{item.datacabinet?.split(',')[0]}</span>
                    </p>
                    <p>
                      HN :
                      {' '}
                      <span>{item.datacabinet?.split(',')[1]}</span>
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
      <Edit isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} cabinets={Dcabinet} pId={Dataz1} onRefresh={refreshData} />
    </div>

  );
}
