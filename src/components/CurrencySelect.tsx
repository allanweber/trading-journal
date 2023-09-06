import { currencies } from '@/model/currency/currencies';
import { useTranslations } from 'next-intl';
import { FormControl } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {
  onValueChange: (value: string) => void;
  defaultValue: string;
  [x: string]: any;
};

export default function CurrencySelect(props: Props) {
  const t = useTranslations('currency');
  const { onValueChange, defaultValue, ...rest } = props;

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue} {...rest}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={t('placeholder')} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem value={currency.value} key={currency.value}>
            {t(currency.value)} - {currency.symbol}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
