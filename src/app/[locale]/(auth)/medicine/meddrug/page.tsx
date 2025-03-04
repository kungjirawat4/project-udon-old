'use client';

import { useTranslations } from 'next-intl';

import BreadCrumb from '@/components/common/breadcrumb';

import MainForm from './main/main-form';

export default function PerscriptionPage() {
  const t = useTranslations('Meddrug');
  const breadcrumbItems = [
    { title: t('meddrug'), link: '/medicine/meddrug' },
  ];
  return (
    <div className="flex w-full flex-col p-6">
      <BreadCrumb items={breadcrumbItems} />
      <MainForm />
    </div>
  );
}
