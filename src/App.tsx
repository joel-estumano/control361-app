import type { AppDispatch, RootState } from './store/store';
import { Card } from './components/card/Card';
import { fetchDataThunk } from './store/dataSlice';
import { List } from './components/list/List';
import { Map } from './components/map/Map';
import { Navbar } from '@/components/navbar/Navbar';
import { SearchBar } from './components/search-bar/SearchBar';
import { Section } from '@/components/section/Section';
import { setPage } from './store/filterSlice';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
    const dispatch: AppDispatch = useDispatch();
    const filters = useTypedSelector((state) => state.filters);

    const { data, isLoading } = useTypedSelector((state) => state.data);
    const { ref, inView } = useInView({ threshold: 1, triggerOnce: false });

    useEffect(() => {
        dispatch(fetchDataThunk());
    }, [dispatch, filters]);

    useEffect(() => {
        if (inView && data.content.totalPages > filters.page && !isLoading) {
            dispatch(setPage(filters.page + 1));
        }
    }, [inView, dispatch, filters.page, data.content.totalPages, isLoading]);

    return (
        <div className="flex flex-grow h-svh w-screen flex-col overflow-hidden">
            <Navbar />
            <Section>
                <SearchBar />
                <Card title="Mapa Rastreador">
                    <Map />
                </Card>
                <Card className="p-0">
                    <List />
                </Card>
                <div className="h-1 invisible">{data.content.vehicles.length && !isLoading ? <div ref={ref}></div> : null}</div>
            </Section>
        </div>
    );
}

export default App;
