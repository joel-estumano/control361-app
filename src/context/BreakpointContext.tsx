import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface BreakpointContextProps {
    isMobile: boolean;
}

interface BreakpointProviderProps {
    children: React.ReactNode;
}

const BreakpointContext = createContext<BreakpointContextProps | undefined>(undefined);

export const BreakpointProvider: React.FC<BreakpointProviderProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Tailwind CSS breakpoints md 48rem (768px)
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <BreakpointContext.Provider value={{ isMobile }}>{children}</BreakpointContext.Provider>;
};

export const useBreakpoint = () => {
    const context = useContext(BreakpointContext);
    if (!context) {
        throw new Error('useBreakpoint must be used within a BreakpointProvider');
    }
    return context;
};
