// import { ActionButton } from '@/components/data-tables/CustomForm';
import { DateTimeLongEN } from '@/libs/dateTime';

type Column = {
  editHandler: (item: any) => void;
  isPending: boolean;
  deleteHandler: (item: any) => void;
};

// eslint-disable-next-line no-empty-pattern
export const columns = ({
  // editHandler, isPending, deleteHandler
}: Column) => {
  return [
    { header: 'basketId', accessorKey: 'basketId', active: true },
    { header: 'orderId ', accessorKey: 'orderId', active: true },
    { header: 'load_number', accessorKey: 'load_number', active: true },
    { header: 'drug_count', accessorKey: 'drug_count', active: true },
    { header: 'load_diff', accessorKey: 'load_diff', active: true },
    {
      header: 'updated At',
      accessorKey: 'updatedAt',
      active: true,
      cell: ({ row: { original } }: any) => DateTimeLongEN(original?.updatedAt),
    },
    // {
    //   header: 'Action',
    //   active: true,
    //   cell: ({ row: { original } }: any) => (
    //     <ActionButton
    //       editHandler={editHandler}
    //       isPending={isPending}
    //       deleteHandler={deleteHandler}
    //       original={original}
    //     />
    //   ),
    // },
  ];
};
