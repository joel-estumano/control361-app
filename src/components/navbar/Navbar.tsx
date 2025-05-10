import type { RootState } from '@/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';

export function Navbar() {
    const { isLoading } = useSelector((state: RootState) => state.data);
    return (
        <nav className="sticky top w-full z-[1000] block bg-secondary">
            <div className="mx-auto flex items-center justify-between max-w-screen-xl px-4 py-2 sm:py-4 gap-2">
                <h1 data-testid="name" className="text-lg">
                    Joel Estumano
                </h1>
                <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/81912570?v=4" alt="Joel Estumano" />
                    <AvatarFallback>JE</AvatarFallback>
                </Avatar>
            </div>
            <div data-testid="progress" className={`absolute bottom-0 w-full overflow-hidden bg-transparent h-0.5 ${isLoading ? '' : 'hidden'}`}>
                <div className="absolute w-full h-full bg-gradient-to-r from-accent via-violet-500 to-primary animate-progress"></div>
            </div>
        </nav>
    );
}
