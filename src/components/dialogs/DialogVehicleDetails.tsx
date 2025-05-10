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
                            <span className="text-foreground me-1.5">Placa:</span>
                            <span data-testid="placa">{vehicle.plate ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Frota:</span>
                            <span data-testid="frota">{vehicle.fleet ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Tipo:</span>
                            <span data-testid="tipo">{vehicle.type ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Modelo:</span>
                            <span data-testid="modelo">{vehicle.model ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Status:</span>
                            <span data-testid="status">{vehicle.status ?? '*'}</span>
                        </DialogDescription>
                        <Separator />
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Nome:</span>
                            <span data-testid="nome">{vehicle.name ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Proprietário:</span>
                            <span data-testid="proprietario">{vehicle.nameOwner ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Registrado em:</span>
                            <span data-testid="registradoem">{formatDate(vehicle.createdAt) ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Ignição:</span>
                            <span data-testid="ignicao">{vehicle.ignition ?? '*'}</span>
                        </DialogDescription>
                        <DialogDescription>
                            <span className="text-foreground me-1.5">Localização:</span>
                            {vehicle.lat && vehicle.lng ? (
                                <a
                                    data-testid="localizacao"
                                    className="underline underline-offset-2 text-primary decoration-primary text-nowrap"
                                    href={`https://www.google.com/maps?q=${vehicle.lat},${vehicle.lng}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {vehicle.lat}, {vehicle.lng}
                                </a>
                            ) : (
                                '*'
                            )}
                        </DialogDescription>
                    </>
                ) : (
                    <DialogDescription className="text-muted-foreground">Veículo não encontrado.</DialogDescription>
                )}
                <Separator />
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
