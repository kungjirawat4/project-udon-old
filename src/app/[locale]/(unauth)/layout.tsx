import { unstable_setRequestLocale } from 'next-intl/server';

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  // const t = useTranslations('RootLayout');

  return (
    <>
      {props.children}
    </>
    // <HomeLayout>

  // </HomeLayout>

  );
}
