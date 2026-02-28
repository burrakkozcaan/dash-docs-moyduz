'use client';

import { cn } from '@/utils/cn';

interface AnimatedBadgeProps {
  text: string;
  color?: string;
  href?: string;
  className?: string;
}

export function AnimatedBadge({
  text,
  color = '#10b981',
  href = '#',
  className,
}: AnimatedBadgeProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-90',
        className
      )}
      style={{
        backgroundColor: `${color}20`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {text}
    </span>
  );

  if (href && href !== '#') {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}
