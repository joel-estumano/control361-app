import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Skeleton } from '../ui/skeleton';

const containerStyle = {
    width: '100%',
    height: '518px',
};

const center = {
    lat: -23.63674,
    lng: -46.7796,
};

export function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'DEMO_MAP_ID',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    });

    /**
     * Função de atualização do estado `map`, que armazena a instância do Google Maps.
     *
     * O estado `map` pode conter um objeto `google.maps.Map` quando inicializado,
     * ou `null` quando o mapa ainda não foi carregado ou foi desmontado.
     *
     * Esta variável (`setMap`) é a função de atualização do estado, extraída diretamente
     * do `useState`. Em vez de usar desestruturação (`const [map, setMap] = ...`),
     * estamos acessando o índice `[1]` do array retornado pelo hook.
     */
    const setMap = React.useState<google.maps.Map | null>(null)[1];

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        // Obtendo e usando a instância do mapa
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    return (
        <div className="rounded-lg overflow-hidden h-[518px]">
            {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount}>
                    {/* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            ) : (
                <Skeleton className="h-full w-full " />
            )}
        </div>
    );
}
