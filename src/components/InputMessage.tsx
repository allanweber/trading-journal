import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<any, any, undefined>;
  field: string;
  translations: (id: string, values?: Record<string, string>) => string;
};

export function InputMessage(props: Props) {
  const { form, field, translations } = props;
  const error = form.formState.errors?.[field];

  if (!error || !error.message) {
    return null;
  }

  return (
    <span className="text-sm font-medium text-destructive">
      {translations(error.message.toString())}
    </span>
  );
}
