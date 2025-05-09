import type { RootState } from './store/store';
import { Button } from './components/ui/button';
import { Card } from './components/card/Card';
import { DataProvider } from './components/DataProvider';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { List } from './components/list/List';
import { ListFilter } from 'lucide-react';
import { Map } from './components/map/Map';
import { Navbar } from '@/components/navbar/Navbar';
import { SearchBar } from './components/search-bar/SearchBar';
import { Section } from '@/components/section/Section';
import { setPage } from './store/filterSlice';
import { Toaster } from './components/ui/sonner';
import { useBreakpoint } from './context/BreakpointContext';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function App() {
    const { isMobile } = useBreakpoint();
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const { data, isLoading } = useSelector((state: RootState) => state.data);

    const { ref, inView } = useInView({ threshold: 1, triggerOnce: false });

    useEffect(() => {
        if (inView && data?.content.totalPages > filters.page && !isLoading) {
            dispatch(setPage(filters.page + 1));
        }
    }, [inView, dispatch, filters.page, data?.content.totalPages, isLoading]);

    return (
        <div className="flex flex-grow h-svh w-screen flex-col overflow-hidden">
            <Navbar />
            <DataProvider filters={filters} />
            <Section className="max-sm:[&>*:nth-child(1)]:mb-0">
                {isMobile ? (
                    <Drawer>
                        <DrawerTrigger asChild>
                            <div className="bg-background sticky top-0 z-10 py-5">
                                <Button variant="outline" className="w-full" title="Opções">
                                    Opções de busca
                                    <ListFilter className="fill-primary" />
                                </Button>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Opções</DrawerTitle>
                                <DrawerDescription>Preferências de busca</DrawerDescription>
                                <SearchBar />
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                ) : (
                    <SearchBar />
                )}
                <Card title="Mapa Rastreador">
                    <Map />
                </Card>
                <Card className="p-0">
                    <List />
                </Card>
                <div className="h-1 invisible">{data?.content.vehicles.length && !isLoading ? <div ref={ref}></div> : null}</div>
            </Section>
            <Toaster position={isMobile ? 'top-center' : 'top-right'} closeButton={true} />
        </div>
    );
}

export default App;
