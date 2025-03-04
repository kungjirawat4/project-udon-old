import { getTranslations } from 'next-intl/server';

import LoginForm from '@/components/screens/auth/login-form';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const LoginPage = async () => {
  // const t = await getTranslations('Login');

  return (
    <LoginForm />
  );
};

export default LoginPage;
