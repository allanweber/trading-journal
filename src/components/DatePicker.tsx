import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { enGB, ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { format } from 'date-fns';
import { useState } from 'react';
import { Separator } from './ui/separator';

type Props = {
  onSelect: (value: Date | undefined) => void;
  value: Date;
  withTime?: boolean;
  placeholder?: string;
  [x: string]: any;
};

const withTimeFormat = 'PPP hh:mm b';
const dateFormat = 'PPP';

export default function DatePicker(props: Props) {
  const { onSelect, value, withTime, placeholder, ...rest } = props;
  const locale = useLocale();
  const t = useTranslations('date-picker');
  const calendarLocale = locale === 'en' ? enGB : ptBR;

  const [selected, setSelected] = useState<Date | undefined>(value);
  const [month, setMonth] = useState<Date>(value ?? new Date());
  const [timeValue, setTimeValue] = useState<string>(
    value && withTime ? `${value.getHours()}:${value.getMinutes()}` : '00:00'
  );

  const fieldFormat = withTime ? withTimeFormat : dateFormat;

  const todayClick = () => {
    const today = new Date();
    setMonth(today);
    if (withTime) {
      console.log(today.getHours(), today.getMinutes());
      setTimeValue(`${today.getHours()}:${today.getMinutes()}`);
    }
    setSelected(today);
    onSelect(today);
  };

  const nowClick = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    setTimeValue(`${hours}:${minutes}`);
    if (selected) {
      const newDate = new Date(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate(),
        hours,
        minutes
      );
      setSelected(newDate);
      onSelect(newDate);
    }
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate(),
      hours,
      minutes
    );
    setTimeValue(time);
    setSelected(newSelectedDate);
    onSelect(newSelectedDate);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      onSelect(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);
    onSelect(newDate);
  };

  const clearClick = () => {
    setSelected(undefined);
    setTimeValue('00:00');
    onSelect(undefined);
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
              format(selected, fieldFormat, { locale: calendarLocale })
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
          onSelect={handleDaySelect}
          locale={calendarLocale}
          defaultMonth={selected ?? new Date()}
          onMonthChange={setMonth}
          month={month}
          footer={
            <div>
              {withTime && (
                <>
                  <Separator decorative className="mb-2" />
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <input
                      type="time"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={timeValue}
                      onChange={handleTimeChange}
                    />
                    <Button variant="outline" size="sm" onClick={nowClick}>
                      {t('now')}
                    </Button>
                  </div>
                </>
              )}
              <Separator className="mb-2 mt-2" />
              <div className="flex justify-center">
                <Button size="sm" className="w-full" onClick={todayClick}>
                  {t('today')}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full ml-2"
                  onClick={clearClick}
                >
                  {t('clear')}
                </Button>
              </div>
            </div>
          }
          {...rest}
        />
      </PopoverContent>
    </Popover>
  );
}
