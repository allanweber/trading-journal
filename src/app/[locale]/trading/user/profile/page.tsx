import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

export default function Profile() {
  const t = useTranslations('user-profile');
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('title')}</h3>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>
      <Separator />
      {/* <AccountForm /> */}
    </div>
  );
}
