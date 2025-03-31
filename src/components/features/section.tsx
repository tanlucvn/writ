'use client';

import * as React from 'react';

import { FeatureItem, FeatureItemData } from './item';

const features: FeatureItemData[] = [
  {
    title: 'Minimal & sleek',
    desc: 'Clean, elegant, and distraction-free design.'
  },
  {
    title: 'Blazing fast',
    desc: 'Optimized for speed and performance.'
  },
  {
    title: 'Developer-friendly',
    desc: 'Pre-configured with ESLint, Prettier, and Husky.'
  },
  {
    title: 'Fully customizable',
    desc: 'Tailwind CSS for rapid styling.'
  },
  {
    title: 'Dark mode support',
    desc: 'Seamless light/dark mode switching.'
  },
  {
    title: 'Commit best practices',
    desc: 'Built-in commit linting and formatting.'
  }
];

export function FeatureListSection(): React.ReactElement {
  return (
    <section className='flex flex-col'>
      <div className='flex flex-col text-pretty'>
        <div className='flex flex-col'>
          <span className='font-mono text-sm text-foreground/60'>
            Why Minimil stands out?
          </span>
          <h2 className='py-2 text-sm font-medium'>Elevating your workflow</h2>
          <hr className='mt-2 border-dashed' />
        </div>

        <ul className='mt-6 flex flex-col gap-1'>
          {features.map((feature, i) => (
            <FeatureItem key={i} data={feature} />
          ))}
        </ul>
      </div>
    </section>
  );
}
