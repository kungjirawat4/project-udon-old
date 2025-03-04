/* eslint-disable style/multiline-ternary */
'use client';

import { Button, Spinner } from '@nextui-org/react';
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type FormEvent, useCallback, useEffect, useState } from 'react';
import { FaNotesMedical } from 'react-icons/fa6';
import { GrPowerReset } from 'react-icons/gr';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useToasts from '@/hooks/use-toast';

import Search from '../Search';
import { columns } from './columnsDrug';
import AddForm from './forms/add-form-drug';
import EditForm from './forms/edit-form-drug';
import { ResponsiveDialog } from './responsive-dialog';

export function DataTable({ data, add }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isPostOpen, setIsPostOpen] = useState(false);
  // const [setIsTrue,setIsTrueOpen] = useState(false);
  const { toastWarning } = useToasts();
  const [q, setQ] = useState('');
  const [tableData, setTableData] = useState(data); // สถานะสำหรับข้อมูลตาราง
  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>(null);
  const [prescripid, setprescripid] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false); // เพิ่มสถานะการโหลด
  // console.log('data', data);
  const check = data;
  // console.log('check', check);
  useEffect(() => {
    if (data && data.length > 0) {
      const iddatap = data[0].prescripId;
      setprescripid(iddatap);
      // console.log(iddatap);
    }
  }, [data]);

  const findMatchingData = (query: string, datacheck: any[]) => {
    const searchInObject = (obj: any): boolean => {
      return Object.values(obj).some((value) => {
        if (typeof value === 'string') {
          return value === query; // ใช้ === เพื่อให้ตรงกันทั้งหมด
        }
        if (typeof value === 'object' && value !== null) {
          return searchInObject(value); // ค้นหาใน object ที่ซ้อนกัน
        }
        return false;
      });
    };

    return datacheck.filter(item => searchInObject(item));
  };

  const handleReset = useCallback(async () => {
    try {
      const response = await fetch('/api/medicine/prescription/arranged');
      const datar = await response.json();
      const datareset = datar.data;
      const matchingdatareset = datareset.filter(
        (item: any) => item.prescripId === prescripid,
      );

      if (matchingdatareset.length > 0) {
        setTableData(matchingdatareset);
      }
    // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      // console.error('API Error:', error);
    }
  }, [prescripid]);

  useEffect(() => {
    if (!isEditOpen && !isPostOpen) {
      const timer = setTimeout(() => {
        handleReset();
      }, 500); // ดีเลย์ 1000 มิลลิวินาที (1 วินาที)

      return () => {
        clearTimeout(timer); // เคลียร์ timer เมื่อ component ถูก unmount หรือ effect ถูกเรียกใหม่
      };
    }

    // Explicitly returning undefined to satisfy TypeScript
    return undefined;
  }, [isEditOpen, isPostOpen, handleReset]);

  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();
    // setDataEdit(check);
    // console.log('datac', check)
    // ตัด q ให้เหลือแค่ 25 ตัวอักษร
    // const trimmedQ = q.length > 25 ? q.slice(0, 25) : q;
    // ถ้า q ว่างหรือมีความยาวน้อยกว่า 2 อักขระ ให้หยุดการทำงาน
    if (!q || q.length < 2) {
      // alert('กรุณากรอกคำค้นหาที่ถูกต้อง');
      toastWarning('กรุณากรอกข้อมูลที่ถูกต้อง');
      return;
    }

    // ตัดเฉพาะตัวสุดท้ายออกจาก q
    // const trimmedQ = q.length > 1 ? q.slice(0, -1) : q;
    // const trimmedQ = q.slice(0, -1);
    const trimmedQ = q.slice(1);

    // console.log('cut', trimmedQ);
    const matchingDatam = findMatchingData(trimmedQ, check);
    // console.log(matchingDatam);
    if (matchingDatam.length > 0) {
      // console.log('ok', matchingDatam);
      const datasearch = matchingDatam[0];
      const response = await fetch(
        `/api/medicine/prescription/arranged/${datasearch.id}`,
      );
      const datar = await response.json();
      const datasearchHandler = datar.data; // ใช้ data.data ถ้าข้อมูลอยู่ใน property นี้
      // setDataEdit(matchingDatam[0]);
      setDataEdit(datasearchHandler[0]);
      setIsLoading(false);
      // console.log('dataD', datasearchHandler[0])
      setIsEditOpen(true);
    } else {
      // console.log('No matching data found.');
      // alert('ไม่เจอข้อมูล');
      toastWarning('ไม่พบข้อมูล');
    }
    // getApi?.refetch();
    // if (q.length === 25) {
    //   setDialogOpen(true);
    // }
    // setPage(1);
    setQ('');
  };
  // console.log(isPostOpen);
  // console.log(isEditOpen);
  // console.log('q', q);
  return (
    <div className="w-full">
      <div className="m-4 flex items-center py-2">
        <Search
          setQ={setQ}
          searchHandler={searchHandler}
          q={q!}
          placeholder="ค้นหา"
        />
        <div className="pl-5">
          <Button
            variant="ghost"
            className="rounded-lg border-none  p-0"
            title="รีเซ็ต"
            onClick={handleReset}
          >
            <GrPowerReset />
          </Button>
        </div>
        {/* <ResponsiveDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title="Edit Drug"
        >
          <EditForm drugId={dataEdit} setIsOpen={setIsEditOpen} />
        </ResponsiveDialog> */}
        <ResponsiveDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title="Edit Drug"
        >
          {isLoading ? (
            // <p>Loading...</p>
            <Spinner color="danger" />// แสดงข้อความระหว่างที่ข้อมูลกำลังโหลด
          ) : (
            <EditForm drugId={dataEdit} setIsOpen={setIsEditOpen} />
          )}
        </ResponsiveDialog>
        <ResponsiveDialog
          isOpen={isPostOpen}
          setIsOpen={setIsPostOpen}
          title="Add Drug"
        >
          <AddForm drugId={add} setIsOpen={setIsPostOpen} />
        </ResponsiveDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="ml-auto capitalize"
              color="primary"
              onClick={() => {
                setIsPostOpen(true);
              }}
            >
              <FaNotesMedical />
              Add
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value =>
                      column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative m-4 max-h-96 w-full overflow-auto rounded-md border">
        <Table className="text-base">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="p-1">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-20 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
