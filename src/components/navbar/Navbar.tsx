import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export function Navbar() {
    const { isLoading } = useSelector((state: RootState) => state.data);
    return (
        <nav className="sticky top w-full z-[1000] block bg-secondary">
            <div className="mx-auto flex justify-between items-center max-w-screen-xl px-4 py-2 sm:py-4">
                <h1 className="text-lg">Joel Estumano</h1>
            </div>
            <div className={`absolute bottom-0 w-full overflow-hidden bg-transparent h-0.5 ${isLoading ? '' : 'hidden'}`}>
                <div className="absolute w-full h-full bg-gradient-to-r from-accent via-violet-500 to-primary animate-progress"></div>
            </div>
        </nav>
    );
}
