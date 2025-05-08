import type { RootState } from '@/store/store';
import type { Vehicle } from '@/types/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSelector } from 'react-redux';

const tableHeaders = ['Placa', 'Frota', 'Tipo', 'Modelo', 'Status'];

export function List() {
    const { data, isLoading, error } = useSelector((state: RootState) => state.data);

    if (error) return <p className="text-center py-2 text-destructive">Erro: {error}!</p>;

    if (!data?.content?.vehicles?.length && !isLoading) return <p className="text-center py-2">Nada por aqui!</p>;

    return (
        <>
            <Table className="max-sm:hidden table-fixed">
                <TableHeader>
                    <TableRow className="text-sm [&>*]:not-last:border-r">
                        {tableHeaders.map((header, i) => (
                            <TableHead className="text-center py-4" key={i}>
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                    {data?.content?.vehicles?.map((vehicle: Vehicle, index: number) => {
                        const vehicleValues = [vehicle.plate, vehicle.fleet, vehicle.type, vehicle.model, vehicle.status];
                        return (
                            <TableRow key={index} className="text-muted-foreground [&>*]:not-last:border-r">
                                {vehicleValues.map((value, i) => (
                                    <TableCell key={i} className="text-center py-4">
                                        <p className="truncate">{value ?? '*'}</p>
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                    {isLoading && (
                        <TableRow className="text-muted-foreground">
                            <TableCell colSpan={tableHeaders.length} className="text-center py-4">
                                <p>Carregando...</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Accordion type="single" collapsible className="sm:hidden">
                {data?.content?.vehicles?.map((vehicle: Vehicle, index: number) => {
                    const vehicleValues = [vehicle.fleet, vehicle.type, vehicle.model, vehicle.status];
                    return (
                        <AccordionItem value={'accordion-item-' + index} key={index} className="px-4">
                            <AccordionTrigger>
                                <p className="truncate font-semibold">{vehicle.plate}</p>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid text-xs grid-rows-4 gap-1">
                                    {vehicleValues.map((value, i) => (
                                        <p key={i} className="truncate">
                                            {tableHeaders[i + 1]}: <span className="font-normal text-muted-foreground">{value ?? '*'}</span>
                                        </p>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
                {isLoading && <p className="text-center py-4 text-sm">Carregando...</p>}
            </Accordion>
        </>
    );
}
