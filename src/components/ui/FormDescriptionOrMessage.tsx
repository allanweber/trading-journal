import { UseFormReturn } from 'react-hook-form';
import { InputMessage } from '../InputMessage';
import { FormDescription } from './form';

type Props = {
  form: UseFormReturn<any, any, undefined>;
  fieldName: string;
  descriptionKey: string;
  translations: (id: string, values?: Record<string, string>) => string;
};

export default function FormDescriptionOrMessage(props: Props) {
  const { form, fieldName, descriptionKey, translations } = props;

  const error = form.formState.errors?.[fieldName];

  if (!error || !error.message) {
    return <FormDescription>{translations(descriptionKey)}</FormDescription>;
  }

  return (
    <InputMessage form={form} field={fieldName} translations={translations} />
  );
}
