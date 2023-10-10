import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import SidebarNav from './components/SidebarNav';

export default function UserLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('user-nav');
  return (
    <>
      <PageHeader>
        <div>
          <Title>{t('settings')}</Title>
          <Subtitle>{t('title')}</Subtitle>
        </div>
      </PageHeader>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className=" lg:w-1/5">
          <SidebarNav />
        </aside>
        <div className="flex-1 lg:max-w-xl">{children}</div>
      </div>
    </>
  );
}
