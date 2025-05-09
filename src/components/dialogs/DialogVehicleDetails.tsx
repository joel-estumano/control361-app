import type { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { selectVehicleByPlate } from '@/store/dataSlice';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';
import { formatDate } from '@/lib/utils';

interface DialogVehicleDetailsProps {
    plate: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function DialogVehicleDetails({ plate, isOpen, setIsOpen }: DialogVehicleDetailsProps) {
    const vehicle = useSelector((state: RootState) => selectVehicleByPlate(state, plate));

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <DialogContent onInteractOutside={(event) => event.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Detalhes do Veículo</DialogTitle>
                </DialogHeader>
                <Separator />
                {vehicle ? (
                    <>
                        <DialogDescription>
                            <span className="text-foreground">Placa:</span> {vehicle.plate}
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground">Frota:</span> {vehicle.fleet}
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground">Tipo:</span> {vehicle.type}
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground">Modelo:</span> {vehicle.model}
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground">Status:</span> {vehicle.status}
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground">Proprietário: </span>
                            {vehicle.nameOwner}
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground">Registrado em:</span> {formatDate(vehicle.createdAt)}
                        </DialogDescription>
                        <DialogDescription>
                            {vehicle.lat && vehicle.lng ? (
                                <>
                                    <span className="text-foreground">Localização: </span>
                                    <a
                                        className="underline underline-offset-2 decoration-foreground text-nowrap"
                                        href={`https://www.google.com/maps?q=${vehicle.lat},${vehicle.lng}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        {vehicle.lat}, {vehicle.lng}
                                    </a>
                                </>
                            ) : null}
                        </DialogDescription>
                    </>
                ) : (
                    <DialogDescription className="text-muted-foreground">Veículo não encontrado.</DialogDescription>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" title="Fechar">
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
