import React, { ReactNode } from 'react';
import { containerMaxW, hostApp } from '../config';
import Logo from './Logo';

type Props = {
  children: ReactNode;
};

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className='block md:flex items-center justify-between'>
        <div className='text-center md:text-left mb-6 md:mb-0'>
          <b>
            &copy;{year},{` `}
            <a href='https://digitalexhaust.co/' rel='noreferrer' target='_blank'>
              Digital Exhaust
            </a>
            .
          </b>
          {` `}
          {children}
        </div>
        <div className='sm:py-1'>
          <a href='https://www.enhancedai.com/' rel='noreferrer' target='_blank'>
            <Logo className='w-auto h-4 md:h-4 mx-auto' logofilename={`${hostApp}:3000/cpu-icon-wp.png`}/>
          </a>
        </div>
        <div className='sm:py-1 md:text-right'>
          <a href='https://wrench.ai' rel='noreferrer' target='_blank'>
            <Logo className='w-auto h-4 md:h-4 mx-auto' logofilename={`${hostApp}:3000/wrench-wrench-svgrepo-com.svg`} />
          </a>
        </div>
        <div className='md:py-2 md:text-right'>
          <a href='https://digitalexhaust.co' rel='noreferrer' target='_blank'>
            <Logo className='w-auto h-8 md:h-6 mx-auto' logofilename='https://digitalexhaust.co/wp-content/uploads/2023/04/DE-Logo-250-px-x-45-px.png'/>
          </a>
        </div>
      </div>
    </footer>
  );
  
}
