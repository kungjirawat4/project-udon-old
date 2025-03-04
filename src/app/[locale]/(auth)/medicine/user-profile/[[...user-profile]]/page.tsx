import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'UserProfile',
  });

  return {
    title: t('meta_title'),
  };
}

const UserProfilePage = () => (
  <div className="my-6 -ml-16">
    <h1>สวัสดี โปรไฟล์</h1>
    {/* <UserProfile
      path={getI18nPath('/dashboard/user-profile', props.params.locale)}
    /> */}
  </div>
);

export default UserProfilePage;
