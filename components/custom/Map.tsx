import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvent } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-geosearch/dist/geosearch.css';

import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  name?: string;
  marker: number[];
  setMarker?: Dispatch<SetStateAction<number[]>>;
  enableEdit?: boolean;
  enableSearch?: boolean;
  autoOpenPopup?: boolean;
  [props: string]: any;
};

export default function Map({
  className,
  name,
  marker,
  setMarker,
  enableEdit,
  enableSearch,
  autoOpenPopup,
  ...props
}: Props) {
  const markerRef = useRef(null);

  function whenMapReady() {
    if (autoOpenPopup) {
      setTimeout(() => {
        markerRef.current.openPopup();
      }, 500);
    }
  }

  function MapEvent() {
    const map = useMapEvent('click', (e: any) => {
      setMarker([e.latlng.lat, e.latlng.lng]);
    });
    return null;
  }

  // https://codesandbox.io/p/sandbox/search-box-implementation-in-react-leaflet-v310-sx0rp?file=%2Fsrc%2FMapWrapper.jsx%3A9%2C1
  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new (GeoSearchControl as any)({
        // https://github.com/smeijer/leaflet-geosearch?tab=readme-ov-file#geosearchcontrol
        provider,
        autoCompleteDelay: 150,
        showMarker: false,
      });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }

  return (
    <MapContainer
      whenReady={() => whenMapReady()}
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
      <TileLayer
        // @ts-ignore
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {enableEdit && <MapEvent />}
      {enableSearch && <LeafletgeoSearch />}
      <Marker position={marker} ref={markerRef}>
        <Tooltip>
          <div className='px-4 text-sm font-medium'>{name || 'Destination'}</div>
        </Tooltip>
        <Popup>{name || 'Destination'}</Popup>
      </Marker>
    </MapContainer>
  );
}
