import React, { useEffect, useState } from 'react';
import type { RootState } from '@/store/store';
import type { VehicleLocation } from '@/types/types';
import { formatDate, getCarPinByPlate } from '@/lib/utils';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useSelector } from 'react-redux';

const containerStyle = {
    width: '100%',
    height: '518px',
};

const defaultCenter = { lat: -23.55052, lng: -46.633308 }; // São Paulo

export function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'DEMO_MAP_ID',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    const { data, isLoading, error } = useSelector((state: RootState) => state.data);

    const [vehiclesWithPins, setVehiclesWithPins] = useState<VehicleLocation[]>([]);

    const [selectedMarker, setSelectedMarker] = useState<VehicleLocation | null>(null);

    useEffect(() => {
        if (!data?.content?.locationVehicles?.length) {
            setVehiclesWithPins([]);
        } else {
            setVehiclesWithPins(
                data.content.locationVehicles.map((vehicle) => ({
                    ...vehicle,
                    pin: getCarPinByPlate(vehicle.plate),
                }))
            );

            adjustMapBounds(map, data?.content?.locationVehicles ?? []);
        }
        setSelectedMarker(null);
    }, [data, map]);

    /**
     * Ajusta os limites do mapa para incluir todos os marcadores.
     * @param map - Instância do Google Maps.
     * @param locations - Lista de localizações dos marcadores.
     */
    function adjustMapBounds(map: google.maps.Map | null, locations: VehicleLocation[]) {
        const bounds = new google.maps.LatLngBounds();

        if (locations.length) {
            locations.forEach((vehicle) => {
                bounds.extend(new google.maps.LatLng(vehicle.lat, vehicle.lng));
            });
        } else {
            // Definir bounds padrão caso não haja veículos
            bounds.extend(new google.maps.LatLng(-23.55052, -46.633308)); // Exemplo: São Paulo
            bounds.extend(new google.maps.LatLng(-22.906847, -43.172896)); // Exemplo: Rio de Janeiro
        }

        if (!map || bounds.isEmpty()) return;

        map.fitBounds(bounds);
    }

    /**
     * Verifica se o clique ocorreu em um lugar válido no mapa (como padarias, lojas, etc.)
     * e fecha o InfoWindow apenas nesses casos.
     *
     * @param event - Evento de clique do Google Maps.
     * @param setSelectedMarker - Função para atualizar o estado do marcador selecionado.
     */
    function handleMapClick(event: google.maps.MapMouseEvent, setSelectedMarker: React.Dispatch<React.SetStateAction<VehicleLocation | null>>) {
        const placeEvent = event as google.maps.IconMouseEvent;

        if (placeEvent.placeId) {
            setSelectedMarker(null); // Fecha o InfoWindow apenas se for um local do Google Maps
        }
    }

    function renderSwitch() {
        switch (true) {
            case error !== null:
                return <p>😞</p>;
            case isLoading:
                return <Skeleton className="h-full w-full" />;
            default:
                return (
                    <GoogleMap
                        mapContainerClassName={selectedMarker ? 'app-map-marker' : ''}
                        mapContainerStyle={containerStyle}
                        center={defaultCenter}
                        zoom={6}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={(event) => handleMapClick(event, setSelectedMarker)}
                    >
                        {vehiclesWithPins?.map((vehicle, i) => {
                            const position = new google.maps.LatLng(vehicle.lat, vehicle.lng);
                            return (
                                <Marker
                                    position={position}
                                    key={i}
                                    onClick={() => setSelectedMarker(vehicle)}
                                    icon={{
                                        url: vehicle.pin as string,
                                        anchor: new google.maps.Point(20, -5),
                                    }}
                                />
                            );
                        })}
                        {selectedMarker && (
                            <InfoWindow position={selectedMarker} onCloseClick={() => setSelectedMarker(null)}>
                                <div className="flex flex-col gap-1 text-xs justify-center items-center py-2 px-4 w-fit">
                                    <p>Placa {selectedMarker.plate}</p>
                                    <p>Frota {selectedMarker.fleet}</p>
                                    <p> {formatDate(selectedMarker.createdAt)}</p>
                                    <a
                                        className="underline underline-offset-2 decoration-foreground text-nowrap"
                                        href={`https://www.google.com/maps?q=${selectedMarker.lat},${selectedMarker.lng}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        {selectedMarker.lat}, {selectedMarker.lng}
                                    </a>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                );
        }
    }

    return <div className="rounded-lg overflow-hidden h-[518px] content-center w-full text-center">{isLoaded ? renderSwitch() : null}</div>;
}
