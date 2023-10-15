import { PropsWithChildren } from 'react';

export default function FormButtonContainer(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className="col-span-12 sm:col-span-12">
      <div className="justify-around space-y-2 md:space-y-0 md:space-x-4">
        {children}
      </div>
    </div>
  );
}
