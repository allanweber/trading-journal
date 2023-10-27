import { currencies } from '@/model/currency';
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
  value: string;
  [x: string]: any;
};

export default function CurrencySelect(props: Props) {
  const { onValueChange, value: defaultValue, ...rest } = props;

  return (
    <Select onValueChange={onValueChange} value={defaultValue} {...rest}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem value={currency.value} key={currency.value}>
            {currency.value} - {currency.symbol}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
