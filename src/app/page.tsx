import Logo from '@/components/logo';
import * as FadeIn from '@/components/motion/fade';

export default function Home() {
  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <div className='flex flex-row items-center space-x-3'>
          <Logo />
          <div className='flex flex-col font-medium'>
            <span className='text-sm'>Minimil</span>
            <span className='text-xs text-muted-foreground'>
              A sleek and minimal Next.js starter template
            </span>
          </div>
        </div>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
