import React, { useEffect, useState } from 'react';
import type { RootState } from '@/store/store';
import type { VehicleLocation } from '@/types/types';
import { formatDate, getRandomCarPin } from '@/lib/utils';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Skeleton } from '../ui/skeleton';
import { useSelector } from 'react-redux';

const containerStyle = {
    width: '100%',
    height: '518px',
};

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

    const { data } = useSelector((state: RootState) => state.data);

    const [vehiclesWithPins, setVehiclesWithPins] = useState<VehicleLocation[]>([]);

    const [selectedMarker, setSelectedMarker] = useState<VehicleLocation | null>(null);

    useEffect(() => {
        if (!data?.content?.locationVehicles?.length) {
            setVehiclesWithPins([]);
        } else {
            setVehiclesWithPins(
                data.content.locationVehicles.map((vehicle) => ({
                    ...vehicle,
                    pin: getRandomCarPin(),
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
        if (!map || !locations.length) return;

        const bounds = new google.maps.LatLngBounds();

        locations.forEach((vehicle) => {
            bounds.extend(new google.maps.LatLng(vehicle.lat, vehicle.lng));
        });

        if (!bounds.isEmpty()) {
            map.fitBounds(bounds);
        }
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

    return (
        <div className="rounded-lg overflow-hidden h-[518px]">
            {isLoaded ? (
                <GoogleMap
                    mapContainerClassName={selectedMarker ? 'app-map-marker' : ''}
                    mapContainerStyle={containerStyle}
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
                                    className="underline underline-offset-2 decoration-foreground"
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
            ) : (
                <Skeleton className="h-full w-full " />
            )}
        </div>
    );
}
