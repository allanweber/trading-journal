import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<any, any, undefined>;
  field: string;
};

export function InputMessage(props: Props) {
  const { form, field } = props;
  const error = form.formState.errors?.[field];

  if (!error || !error.message) {
    return null;
  }

  return (
    <span className="text-sm font-medium text-destructive">
      {error.message.toString()}
    </span>
  );
}
