import { MedicineLayout } from '@/components/layouts/medicine-layout';

export default function ProfileLayout(props: { children: React.ReactNode }) {
  // const t = useTranslations('DashboardLayout');

  return (
    <MedicineLayout>{props.children}</MedicineLayout>
  );
}
