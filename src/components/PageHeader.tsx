'use client';

import { PropsWithChildren } from 'react';
import { Separator } from './ui/separator';

export const PageHeader = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        {children}
      </div>
      <Separator />
    </>
  );
};

export const Title = (props: PropsWithChildren) => {
  const { children } = props;
  return <h2 className="text-lg font-medium">{children}</h2>;
};

export const Subtitle = (props: PropsWithChildren) => {
  const { children } = props;
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export const Action = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="flex items-center space-x-2">
      <div className="sm:mt-0 sm:ml-16 ">{children}</div>
    </div>
  );
};
