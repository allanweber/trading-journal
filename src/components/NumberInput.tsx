import { forwardRef } from 'react';
import { Input } from './ui/input';

type Props = {
  onChange: (value: number | undefined) => void;
  value: number;
  placeholder?: string;
  [x: string]: any;
};

export const NumberInput = forwardRef(function NumberInput(props: Props, ref) {
  const { onChange, value, placeholder, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      onChange(undefined);
    } else {
      onChange(parsedValue);
    }
  };

  return (
    <Input
      onChange={handleChange}
      defaultValue={value}
      placeholder={placeholder || '0'}
      {...rest}
      {...ref}
    />
  );
});
