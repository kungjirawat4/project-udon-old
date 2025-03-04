'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type {
  ClientPermission as IClientPermission,
  Permission as IPermission,
} from '@prisma/client';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Spinner from '@/components/common/Spinner';
import CustomFormField from '@/components/data-tables/CustomForm';
import { DataTable } from '@/components/data-tables/data-table-nofilter';
import FormView from '@/components/data-tables/FormView';
import { Form } from '@/components/ui/form';
import useToasts from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';
import useDataStore from '@/zustand';

import { columns } from './columns';

const FormSchema = z.object({
  name: z.string().refine(value => value !== '', {
    message: 'Name is required',
  }),
  description: z.string().optional(),
  permissions: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'You have to select at least one item.',
    }),
  clientPermissions: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'You have to select at least one item.',
    }),
});

const Page = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState('');

  const { setData, dialogOpen, setDialogOpen } = useDataStore((state: any) => state);

  const getApi = useApi({
    key: ['roles'],
    method: 'GET',
    url: `admin/roles?page=${page}&q=${q}&limit=${limit}`,
  })?.get;

  const postApi = useApi({
    key: ['roles'],
    method: 'POST',
    url: `admin/roles`,
  })?.post;

  const updateApi = useApi({
    key: ['roles'],
    method: 'PUT',
    url: `admin/roles`,
  })?.put;

  const deleteApi = useApi({
    key: ['roles'],
    method: 'DELETE',
    url: `admin/roles`,
  })?.deleteObj;

  const getClientPermissionsApi = useApi({
    key: ['client-permissions'],
    method: 'GET',
    url: `admin/client-permissions?page=${page}&q=${q}&limit=${250}`,
  })?.get;

  const getPermissionsApi = useApi({
    key: ['permissions'],
    method: 'GET',
    url: `admin/permissions?page=${page}&q=${q}&limit=${250}`,
  })?.get;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
      clientPermissions: [],
    },
  });

  useEffect(() => {
    if (postApi?.isSuccess || updateApi?.isSuccess || deleteApi?.isSuccess) {
      getApi?.refetch();
      setDialogOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess, updateApi?.isSuccess, deleteApi?.isSuccess]);

  useEffect(() => {
    getApi?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!q) {
      getApi?.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    getApi?.refetch();
    setPage(1);
  };

  type CheckboxListItem = {
    label: string;
    children: Array<{
      id: string;
      label: string;
      method?: string;
      path?: string;
    }>;
  };

  const permissionsList = (items: IPermission[]): CheckboxListItem[] =>
    items?.reduce((acc: CheckboxListItem[], curr: IPermission) => {
      const found = acc.find(item => item.label === curr.name);
      if (found) {
        found.children.push({
          id: curr.id,
          label: curr.description || '',
          method: curr.method,
        });
      } else {
        acc.push({
          label: curr.name,
          children: [
            {
              id: curr.id,
              label: curr.description || '',
              method: curr.method,
            },
          ],
        });
      }
      return acc;
    }, []);

  const clientPermissionsList = (
    items: IClientPermission[],
  ): CheckboxListItem[] =>
    items?.reduce((acc: CheckboxListItem[], curr: IClientPermission) => {
      const found = acc.find(item => item.label === curr.menu);
      if (found) {
        found.children.push({
          id: curr.id,
          label: curr.description || '',
          path: curr.path,
        });
      } else {
        acc.push({
          label: curr.menu,
          children: [
            {
              id: curr.id,
              label: curr.description || '',
              path: curr.path,
            },
          ],
        });
      }
      return acc;
    }, []);

  const editHandler = (
    item: IClientPermission & {
      role: { id: string };
      permissions: IPermission[];
      clientPermissions: IClientPermission[];
    },
  ) => {
    setId(item.id!);
    setEdit(true);

    form.setValue('name', item?.name);
    form.setValue('description', item?.description || '');

    form.setValue(
      'permissions',
      item?.permissions?.map(item => item?.id),
    );
    form.setValue(
      'clientPermissions',
      item?.clientPermissions?.map(item => item?.id),
    );
  };

  const deleteHandler = (id: any) => deleteApi?.mutateAsync(id);

  const label = 'Role';
  const modal = 'role';

  useEffect(() => {
    if (!dialogOpen) {
      form.reset();
      setEdit(false);
      setId(null);
      getClientPermissionsApi?.refetch();
      getPermissionsApi?.refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  useEffect(() => {
    // eslint-disable-next-line ts/no-unused-expressions
    getClientPermissionsApi?.isSuccess
    && setData({
      id: 'clientPermissions',
      data: clientPermissionsList(getClientPermissionsApi?.data?.data || []),
    });

    // eslint-disable-next-line ts/no-unused-expressions
    getPermissionsApi?.isSuccess
    && setData({
      id: 'permissions',
      data: permissionsList(getPermissionsApi?.data?.data || []),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClientPermissionsApi?.isSuccess, getPermissionsApi?.isSuccess]);

  const formFields = (
    <Form {...form}>
      <CustomFormField
        form={form}
        name="name"
        label="Name"
        placeholder="Name"
        type="text"
      />
      <CustomFormField
        form={form}
        label="Permission"
        name="permissions"
        placeholder="Permission"
        fieldType="multipleCheckbox"
        data={[]}
      />
      <CustomFormField
        form={form}
        name="description"
        label="Description"
        placeholder="Description"
        cols={3}
        rows={3}
      />
      <CustomFormField
        form={form}
        label="Client Permission"
        name="clientPermissions"
        placeholder="Client Permission"
        fieldType="multipleCheckbox"
        data={[]}
      />
    </Form>
  );

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // eslint-disable-next-line ts/no-unused-expressions
    edit
      ? updateApi?.mutateAsync({
        ...values,
        id,
      })
      : postApi?.mutateAsync({
        ...values,
        id,
      });
  };

  const { toastError }: any = useToasts();
  return (
    <>
      {/* {deleteApi?.isSuccess && (
        <Message value={`${label} has been cancelled successfully.`} />
      )}
      {deleteApi?.isError && <Message value={deleteApi?.error} />}
      {updateApi?.isSuccess && <Message value={updateApi?.data?.message} />}
      {updateApi?.isError && <Message value={updateApi?.error} />}
      {postApi?.isSuccess && <Message value={postApi?.data?.message} />}
      {postApi?.isError && <Message value={postApi?.error} />}

      <TopLoadingBar isFetching={getApi?.isFetching || getApi?.isPending} /> */}

      <FormView
        form={formFields}
        loading={updateApi?.isPending || postApi?.isPending}
        handleSubmit={form.handleSubmit}
        submitHandler={onSubmit}
        label={label}
        height="h-[80vh]"
        edit={edit}
      />

      {getApi?.isPending
        ? (
            <Spinner />
          )
        : getApi?.isError
          ? (
              toastError(getApi?.error)
            )
          : (
              <div className="mt-2 overflow-x-auto bg-white p-3">
                <DataTable
                  data={getApi?.data}
                  columns={columns({
                    editHandler,
                    isPending: deleteApi?.isPending || false,
                    deleteHandler,
                  })}
                  setPage={setPage}
                  // setLimit={setLimit}
                  limit={limit}
                  q={q}
                  setQ={setQ}
                  searchHandler={searchHandler}
                  modal={modal}
                  // caption="Roles List"
                />
              </div>
            )}
    </>
  );
};

export default Page;
