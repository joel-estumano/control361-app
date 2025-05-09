import { cn } from '@/lib/utils';
import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
}

export function Section({ children, className }: SectionProps) {
    return (
        <section className="block h-full w-full scrollbar overflow-y-auto">
            <div className={cn('block h-auto w-full max-w-screen-xl mx-auto space-y-5 relative px-4', className)}>{children}</div>
        </section>
    );
}
