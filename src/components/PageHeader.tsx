'use client';

import { PropsWithChildren } from 'react';
import { Separator } from './ui/separator';

const PageHeader = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="space-y-3">
      <div className="flex items-center">{children}</div>
      <Separator />
    </div>
  );
};

const Title = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="flex-auto">
      <h3 className="text-lg font-medium">{children}</h3>
    </div>
  );
};

const Subtitle = (props: PropsWithChildren) => {
  const { children } = props;
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

const Action = (props: PropsWithChildren) => {
  const { children } = props;
  return <div className="mt-4 sm:mt-0 sm:ml-16 ">{children}</div>;
};

export { Action, PageHeader, Subtitle, Title };
