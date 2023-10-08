import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';
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

type Props = {
  actionTitle?: string;
  onConfirm: () => void;
};

export default function ActionConfirmation(props: PropsWithChildren<Props>) {
  const { children, actionTitle, onConfirm } = props;
  const t = useTranslations('action-confirm');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>
          {actionTitle ?? t('default-title')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <DropdownMenuItem className="col-span-2">
                <Button variant="outline">{t('cancel')}</Button>
              </DropdownMenuItem>

              <DropdownMenuItem className="col-span-2">
                <Button type="submit" onClick={onConfirm}>
                  {t('confirm')}
                </Button>
              </DropdownMenuItem>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
