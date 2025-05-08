import './index.css';
import type { RootState } from './store/store';
import type { Vehicle } from './types/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from './components/card/Card';
import { fetchData } from './api/api';
import { Map } from './components/map/Map';
import { Navbar } from '@/components/navbar/Navbar';
import { SearchBar } from './components/search-bar/SearchBar';
import { Section } from '@/components/section/Section';
import { Table, TableBody, /* TableCaption, */ TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

function App() {
    const filters = useSelector((state: RootState) => state.filters);

    const { data, isLoading, error } = useQuery({
        queryKey: ['items', filters], // Atualiza ao mudar os filtros
        queryFn: () => fetchData(filters),
        //keepPreviousData: true, // Mantém os dados antigos até carregar os novos
    });

    useEffect(() => {
        console.log(data?.content?.vehicles);
    }, [data]);

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os dados.</p>;

    return (
        <div className="flex flex-grow h-svh w-screen flex-col overflow-hidden">
            <Navbar />
            <div className="scrollbar overflow-y-auto py-5">
                <Section>
                    <div className="flex flex-col items-center justify-center overflow-y-auto gap-5 py-1">
                        <SearchBar />
                        <hr className="w-full border" />
                        <Card className="space-y-3">
                            <p>Mapa Rastreador</p>
                            <Map />
                        </Card>
                        <Card className="p-0">
                            {/* large devices */}
                            <Table className="max-sm:hidden table-fixed">
                                {/*  <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow className="text-sm [&>*]:not-last:border-r">
                                        <TableHead className="text-center py-4">Placa</TableHead>
                                        <TableHead className="text-center py-4">Frota</TableHead>
                                        <TableHead className="text-center py-4">Tipo</TableHead>
                                        <TableHead className="text-center py-4">Modelo</TableHead>
                                        <TableHead className="text-center py-4">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-sm">
                                    {data?.content?.vehicles?.map((vehicle: Vehicle, index: number) => (
                                        <TableRow key={index} className="text-muted-foreground [&>*]:not-last:border-r">
                                            <TableCell className="text-center py-4">
                                                <p className="truncate">{vehicle.plate}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-4">
                                                <p className="truncate">{vehicle.fleet}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-4">
                                                <p className="truncate">{vehicle.type}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-4">
                                                <p className="truncate">{vehicle.model}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-4">
                                                <p className="truncate">{vehicle.status}</p>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* small devices */}
                            <Accordion type="single" collapsible className="sm:hidden">
                                {data?.content?.vehicles?.map((vehicle: Vehicle, index: number) => (
                                    <AccordionItem value={'vehicle-' + index} key={index} className="px-4">
                                        <AccordionTrigger>
                                            <p className="truncate font-semibold">{vehicle.plate}</p>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid text-xs grid-rows-4 gap-1">
                                                <p className="truncate">
                                                    Frota: <span className="font-normal text-muted-foreground">{vehicle.fleet}</span>
                                                </p>
                                                <p className="truncate">
                                                    Tipo: <span className="font-normal text-muted-foreground">{vehicle.type}</span>
                                                </p>
                                                <p className="truncate">
                                                    Modelo: <span className="font-normal text-muted-foreground">{vehicle.model}</span>
                                                </p>
                                                <p className="truncate">
                                                    Status: <span className="font-normal text-muted-foreground">{vehicle.status}</span>
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Card>
                    </div>
                </Section>
            </div>
        </div>
    );
}

export default App;
