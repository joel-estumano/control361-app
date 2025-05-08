import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return <div className={cn('border p-4 rounded-2xl w-full bg-surface overflow-hidden', className)}>{children}</div>;
}
