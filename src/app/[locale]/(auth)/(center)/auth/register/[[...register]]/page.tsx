import { getTranslations } from 'next-intl/server';

import RegisterForm from '@/components/screens/auth/register-form';

// import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function SignUpPage() {
  return <RegisterForm />;
}
