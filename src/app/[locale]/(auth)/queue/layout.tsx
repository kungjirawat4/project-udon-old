import { THSarabun } from '@/assets/fonts';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <div className={THSarabun.className}>{children}</div>;
}
