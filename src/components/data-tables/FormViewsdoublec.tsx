'use client';

// import {
//   Button,
//   Modal,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
// } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import useDataStore from '@/zustand';

import { DataTable } from './_components/data-tabledoublec';
import { FormButton } from './CustomForm';

type Props = {
  form: any;
  loading?: boolean;
  handleSubmit: (data: any) => () => void;
  submitHandler: (data: any) => void;
  label: string;
  height?: string;
  width?: string;
  edit: boolean;
  colum?: string;
  itemDetail?: any;
  // matchingData?: any; // เพิ่ม prop สำหรับรับ matchingData
};

const FormViews = ({
  form,
  loading,
  handleSubmit,
  submitHandler,
  label,
  height,
  width,
  edit,
  colum,
  itemDetail,
  // matchingData, // รับข้อมูล matchingData
}: Props) => {
  const { dialogOpen, setDialogOpen } = useDataStore((state: any) => state);
  const t = useTranslations();
  const [dataEdit, setDataEdit] = useState<any>(null);
  const [dataAdd, setDataAdd] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/medicine/prescription?q=${itemDetail}`)
      .then(res => res.json())
      .then((data) => {
        setDataEdit(data?.data[0]?.arranged);
        setDataAdd(data?.data[0]?.id);
        // setLoading(false);
      });
  }, [itemDetail]);
  // console.log('form', form);
  // console.log('item', itemDetail);
  // console.log('mdata', matchingData);
  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
      <DialogContent className={`${height} ${width} overflow-hidden`}>
        <DialogHeader>
          <DialogTitle>
            {edit ? t('Table.edit') : t('Table.add')}
            {' '}
            {label}
          </DialogTitle>
        </DialogHeader>
        {/* <div className="flex flex-col space-y-4 overflow-y-scroll"> */}
        <div className={colum}>{form}</div>
        {dataEdit ? <DataTable data={dataEdit} add={dataAdd} /> : ''}
        <form onSubmit={handleSubmit(submitHandler)} method="dialog">
          <DialogFooter className="mt-4 gap-y-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" id="dialog-close">
                {t('Table.close')}
              </Button>
            </DialogClose>

            <FormButton
              loading={loading}
              type="submit"
              label={edit ? t('Table.save_edit') : t('Table.save')}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    // <Modal
    //   isOpen={dialogOpen}
    //   onOpenChange={() => setDialogOpen(false)}
    //   isDismissable={false}
    //   isKeyboardDismissDisabled
    // >
    //   <ModalContent className={`${height} ${width} overflow-hidden`}>
    //     {(onClose) => (
    //       <>
    //         <ModalHeader className="flex justify-center">
    //           {edit ? t('Table.edit') : t('Table.add')} {label}
    //         </ModalHeader>
    //         {/* <div className="flex flex-col space-y-4 overflow-y-scroll"> */}
    //         <form onSubmit={handleSubmit(submitHandler)} method="dialog">
    //           <div className={colum}>{form}</div>
    //           {dataEdit ? <DataTable data={dataEdit} /> : ''}
    //           <ModalFooter className="mt-4 gap-y-2">
    //             {/* <DialogClose asChild>
    //           <Button type="button" variant="secondary" onPress={onClose}">
    //             {t('Table.close')}
    //           </Button>
    //         </DialogClose> */}

  //             <Button color="primary" onPress={onClose}>
  //               {t('Table.close')}
  //             </Button>
  //             <FormButton
  //               loading={loading}
  //               type="submit"
  //               label={edit ? t('Table.save_edit') : t('Table.save')}
  //             />
  //           </ModalFooter>
  //         </form>
  //       </>
  //     )}
  //   </ModalContent>
  // </Modal>
  );
};

export default FormViews;
