import * as React from 'react';
import { cn } from '@/utils/cn';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <img
      src='/favicon.ico'
      alt='Logo'
      className={cn('object-contain', className)}
      width={42}
      height={42}
      {...props}
    />
  );
}
