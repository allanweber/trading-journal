import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Separator } from './ui/separator';

type Props = {
  onSelect: (value: Date | undefined) => void;
  selected: Date;
  placeholder?: string;
  [x: string]: any;
};

export default function DatePicker(props: Props) {
  const { onSelect, selected, placeholder, ...rest } = props;
  const locale = useLocale();
  const t = useTranslations('date-picker');
  const calendarLocale = locale === 'en' ? enGB : ptBR;

  const todayClick = () => {
    onSelect(new Date());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'pl-3 text-left font-normal',
              !selected && 'text-muted-foreground'
            )}
          >
            {selected ? (
              format(selected, 'PPPpp', { locale: calendarLocale })
            ) : (
              <span>{placeholder ?? t('placeholder')}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          locale={calendarLocale}
          footer={
            <div>
              <Separator className="mb-2" />
              <Button variant="outline" size="sm" onClick={todayClick}>
                Today
              </Button>
            </div>
          }
          {...rest}
        />
      </PopoverContent>
    </Popover>
  );
}
