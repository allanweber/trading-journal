import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import SidebarNav from './components/SidebarNav';

export default function UserLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('user-nav');
  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t('settings')}</h2>
        <p className="text-muted-foreground">{t('title')}</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className=" lg:w-1/5">
          <SidebarNav />
        </aside>
        <div className="flex-1 lg:max-w-xl">{children}</div>
      </div>
    </>
  );
}
