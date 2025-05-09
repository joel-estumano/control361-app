import React from 'react';

interface SectionProps {
    children: React.ReactNode;
}

export function Section({ children }: SectionProps) {
    return (
        <section className="block h-full w-full scrollbar overflow-y-auto">
            <div className="block h-auto w-full max-w-screen-xl mx-auto space-y-5 gap-5 relative px-4">{children}</div>
        </section>
    );
}
