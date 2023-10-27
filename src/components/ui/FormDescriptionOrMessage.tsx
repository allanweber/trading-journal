import { UseFormReturn } from 'react-hook-form';
import { InputMessage } from '../InputMessage';
import { FormDescription } from './form';

type Props = {
  form: UseFormReturn<any, any, undefined>;
  fieldName: string;
  description: string;
};

export default function FormDescriptionOrMessage(props: Props) {
  const { form, fieldName, description } = props;

  const error = form.formState.errors?.[fieldName];

  if (!error || !error.message) {
    return <FormDescription>{description}</FormDescription>;
  }

  return <InputMessage form={form} field={fieldName} />;
}
