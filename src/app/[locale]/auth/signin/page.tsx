import LocaleSelect from '@/components/LocaleSelect';
import { Icons } from '@/components/icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SigninForm from './SigninForm';

export default function Signin() {
  //   const providers: any = await getProviders();
  const t = useTranslations('signin');
  return (
    <>
      <div className="h-screen container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <span className="absolute right-4 top-4 md:right-10 md:top-8">
          <LocaleSelect />
        </span>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.logo className="h-8 w-8 mr-2" />
            Trading Journal
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;&rdquo;</p>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t('title')}
              </h1>
              <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
            </div>
            <SigninForm />
            <div className="px-8 text-center text-sm text-muted-foreground">
              <p>{t('agreement')}</p>
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                {t('terms')}
              </Link>
              <span className="mx-1">{t('and')}</span>
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                {t('privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
