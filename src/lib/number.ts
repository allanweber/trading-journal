import { getSymbol } from '@/model/currency/currencies';

type CurrencyFormatterOptions = {
  digits?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  symbol?: string;
};

const defaultOptions: CurrencyFormatterOptions = {
  digits: 2,
  thousandsSeparator: '.',
  decimalSeparator: ',',
  symbol: '$',
};

export const currencyFormatter = (value: number, currency: string) => {
  const options = { ...defaultOptions, symbol: getSymbol(currency) };
  const formatted = numberFormat(value, options);

  return `${options.symbol} ${formatted}`;
};

export const percentFormatter = (value: number) => {
  let valueFormatted;
  if (value) {
    valueFormatted = numberFormat(value * 100, defaultOptions);
  } else {
    valueFormatted = numberFormat(0, defaultOptions);
  }
  return `${valueFormatted} %`;
};

export const numberFormatter = (value: number) => {
  return numberFormat(value, defaultOptions);
};

export const numberFormat = (
  value: number,
  options: CurrencyFormatterOptions
) => {
  if (value === undefined) {
    value = 0;
  }

  options = { ...defaultOptions, ...options };
  const fixed = value.toFixed(options.digits);

  const [currency, decimal] = fixed.split('.');

  const thousandsSeparator = options.thousandsSeparator ?? '.';

  return `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)}${
    options.decimalSeparator
  }${decimal}`;
};
