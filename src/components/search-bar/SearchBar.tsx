import type { FilterType } from '@/types/types';
import type { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { setFilter, setType } from '@/store/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { useBreakpoint } from '@/context/BreakpointContext';
import { resetData } from '@/store/dataSlice';

const searchSubject = new Subject<string>();

export function SearchBar() {
    const { isMobile } = useBreakpoint();
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const { isLoading } = useSelector((state: RootState) => state.data);

    function handlerDispatch(target: 'filter' | 'type', value: string) {
        dispatch(resetData());
        switch (target) {
            case 'filter':
                dispatch(setFilter(value));
                break;
            case 'type':
                dispatch(setType(value as FilterType));
                break;
        }
    }

    useEffect(() => {
        const subscription = searchSubject.pipe(distinctUntilChanged(), debounceTime(500)).subscribe((value) => {
            handlerDispatch('filter', value);
        });

        return () => subscription.unsubscribe();
    }, [dispatch]);

    const options = useMemo(
        () => [
            { value: 'tracked', id: 'r1', label: 'Rastreados' },
            { value: 'others', id: 'r2', label: 'Outros' },
        ],
        []
    );

    return (
        <div className="sticky top-0 z-10 bg-background pt-3 sm:pt-5 space-y-5">
            <div className="flex flex-col-reverse sm:flex-row gap-4 w-full ">
                <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
                    <div className="flex gap-4 lg:gap-36 w-full sm:w-fit max-sm:justify-between">
                        <Label htmlFor="search">Lista</Label>
                        <RadioGroup
                            data-testid="radio-group"
                            defaultValue={filters.type}
                            className="flex"
                            onValueChange={(value) => handlerDispatch('type', value)}
                            disabled={isLoading}
                        >
                            {options.map((option) => (
                                <div key={option.id} className="flex items-center space-x-3">
                                    <RadioGroupItem value={option.value} id={option.id} />
                                    <Label htmlFor={option.id} className="text-xs">
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <Input
                        data-testid="search"
                        type="search"
                        placeholder="Buscar por placa ou frota"
                        className="md:w-80 md:shrink-0 text-xs h-10"
                        defaultValue={filters.filter}
                        onChange={(e) => searchSubject.next(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                {isMobile ? null : (
                    <Button data-testid="new" className="w-full sm:w-[150px] rounded-[8px] p-2.5 text-xs h-10 cursor-pointer" title="Novo">
                        Novo
                    </Button>
                )}
            </div>
            <Separator />
        </div>
    );
}
