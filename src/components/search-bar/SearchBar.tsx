import type { FilterType } from '@/types/types';
import type { RootState } from '@/store/store';
import { Button } from '../ui/button';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { setFilter, setType } from '@/store/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const searchSubject = new Subject<string>();

export function SearchBar() {
    const filters = useSelector((state: RootState) => state.filters);
    const dispatch = useDispatch();

    searchSubject.pipe(distinctUntilChanged(), debounceTime(500)).subscribe((value) => {
        dispatch(setFilter(value));
    });

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
            <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
                <div className="flex gap-4 lg:gap-36 w-full sm:w-fit max-sm:justify-between">
                    <Label htmlFor="search">Lista</Label>
                    <RadioGroup defaultValue={filters.type} className="flex" onValueChange={(value) => dispatch(setType(value as FilterType))}>
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="tracked" id="r1" />
                            <Label htmlFor="r1" className="text-xs">
                                Rastreados
                            </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="others" id="r2" />
                            <Label htmlFor="r2" className="text-xs">
                                Outros
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
                <Input
                    type="search"
                    placeholder="Buscar por placa ou frota"
                    className="md:w-80 md:shrink-0 text-xs h-10"
                    //value={filters.filter}
                    onChange={(e) => searchSubject.next(e.target.value)}
                />
            </div>
            <Button className="w-full sm:w-[150px] rounded-[8px] p-2.5 text-xs h-10 cursor-pointer">Novo</Button>
        </div>
    );
}
