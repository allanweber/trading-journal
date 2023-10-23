'use client';

import { currentUser, useClerk } from '@clerk/nextjs';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Menu = () => {
  const t = useTranslations('user-nav');
  const locale = useLocale();
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/trading/user/settings`}>{t('settings')}</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link href="#" onClick={() => signOut(() => router.push('/'))}>
          {t('logout')}
        </Link>
      </DropdownMenuItem>
    </>
  );
};

export default async function UserNav() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl ?? ''} alt="@shadcn" />
            <AvatarFallback>UR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* {user?.primaryEmailAddress} */}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Menu />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
