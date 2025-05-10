import type { RootState } from '@/store/store';
import type { Vehicle } from '@/types/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useBreakpoint } from '@/context/BreakpointContext';
import { useEffect, useState } from 'react';
import { DialogVehicleDetails } from '../dialogs/DialogVehicleDetails';
import { Button } from '@/components/ui/button';

const tableHeaders = ['Placa', 'Frota', 'Tipo', 'Modelo', 'Status'];

export function List() {
    const { isMobile } = useBreakpoint();
    const { data, isLoading, error } = useSelector((state: RootState) => state.data);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedVehiclePlate, setSelectedVehiclePlate] = useState('');

    const handleRowClick = (plate: string) => {
        setSelectedVehiclePlate(plate);
        setIsOpen(true);
    };

    useEffect(() => {
        if (error) {
            toast.error('Ocorreu um erro!', {
                description: `${error}`,
            });
        }
    }, [error]);

    if (error)
        return (
            <p className="text-center py-2 text-sm text-destructive">
                Ocorreu um erro! <br /> {error}
            </p>
        );

    if (!data?.content?.vehicles?.length && !isLoading) return <p className="text-center py-2 text-sm">Nenhum registro encontrado!</p>;

    return (
        <>
            {isMobile ? (
                <Accordion data-testid="vehicle-accordion" type="single" collapsible>
                    {data?.content?.vehicles?.map((vehicle: Vehicle, index: number) => {
                        const vehicleValues = [vehicle.fleet, vehicle.type, vehicle.model, vehicle.status];
                        return (
                            <AccordionItem value={'accordion-item-' + index} key={index} className="px-4">
                                <AccordionTrigger className="cursor-pointer">
                                    <p className="truncate font-semibold">{vehicle.plate}</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid text-xs grid-rows-4 gap-2">
                                        {vehicleValues.map((value, i) => (
                                            <p key={i} className="truncate">
                                                {tableHeaders[i + 1]}: <span className="font-normal text-muted-foreground">{value ?? '*'}</span>
                                            </p>
                                        ))}
                                        <Button size="sm" variant="outline" title="Ver detalhes" onClick={() => handleRowClick(vehicle.plate)}>
                                            Ver detalhes
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                    {isLoading && <p className="text-center py-4 text-sm">Carregando...</p>}
                </Accordion>
            ) : (
                <Table data-testid="vehicle-table" className="table-fixed">
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
                                <TableRow
                                    key={index}
                                    className="text-muted-foreground [&>*]:not-last:border-r cursor-pointer"
                                    onClick={() => handleRowClick(vehicle.plate)}
                                >
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
            )}

            {isOpen ? <DialogVehicleDetails isOpen={isOpen} setIsOpen={setIsOpen} plate={selectedVehiclePlate} /> : null}
        </>
    );
}
