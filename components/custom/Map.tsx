import { Dispatch, SetStateAction } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvent } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  name?: string;
  marker: number[];
  setMarker?: Dispatch<SetStateAction<number[]>>;
  enableEdit?: boolean;
  [props: string]: any;
};

export default function Map({ className, name, marker, setMarker, enableEdit, ...props }: Props) {
  function MapEvent() {
    const map = useMapEvent('click', (e: any) => {
      setMarker([e.latlng.lat, e.latlng.lng]);
    });
    return null;
  }

  return (
    <MapContainer
      // @ts-ignore
      center={marker}
      zoom={5}
      scrollWheelZoom={true}
      className={cn('h-96 rounded', className)}
      zoomAnimation={true}
      fadeAnimation={true}
      markerZoomAnimation={true}
      closePopupOnClick={true}
      {...props}
    >
      {enableEdit && <MapEvent />}
      <TileLayer
        // @ts-ignore
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={marker}>
        <Tooltip>
          <div className='px-4 text-sm font-medium'>{name || 'Destination'}</div>
        </Tooltip>
        <Popup>{name || 'Destination'}</Popup>
      </Marker>
    </MapContainer>
  );
}
