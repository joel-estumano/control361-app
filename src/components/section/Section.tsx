import React from 'react';

interface SectionProps {
    children: React.ReactNode;
}

export function Section({ children }: SectionProps) {
    return (
        <section>
            <div className="h-full mx-auto px-4 max-w-screen-xl">{children}</div>
        </section>
    );
}
