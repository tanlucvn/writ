import * as React from 'react';

import { CircleIcon } from 'lucide-react';

export type FeatureItemData = {
  title: string;
  desc: string;
};

type FeatureItemProps = {
  data: FeatureItemData;
};

export function FeatureItem({ data }: FeatureItemProps): React.ReactElement {
  const { title, desc } = data;

  return (
    <li className='group ml-2 flex flex-col text-sm transition-all delay-75 duration-300 sm:flex-row sm:items-center sm:hover:-translate-x-1'>
      <div className='flex items-center gap-2 text-foreground/60 group-hover:text-foreground'>
        <CircleIcon size={8} />
        <span className='font-medium'>{title}</span>
      </div>
      <span className='ml-4 mt-1 text-muted-foreground sm:ml-2 sm:mt-0 sm:hidden sm:group-hover:inline'>
        {desc}
      </span>
    </li>
  );
}
