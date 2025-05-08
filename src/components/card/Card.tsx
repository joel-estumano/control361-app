import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Card({ title, children, className }: CardProps) {
    return (
        <div className={cn('border p-4 rounded-2xl w-full bg-surface overflow-hidden space-y-3', className)}>
            {title ? <p>{title}</p> : null}
            {children}
        </div>
    );
}
