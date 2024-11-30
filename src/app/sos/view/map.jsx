import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

const GoogleMapTest = React.memo(({ location, updateFunction, userInfo }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your actual Google Maps API key

    const [mapLoaded, setMapLoaded] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(location.coordinates);
    if (!location) {
        return <>No data provided</>;
    }


    useEffect(() => {
        // Function to handle updates every 10 seconds
        const intervalId = setInterval(() => {
            updateFunction().then((newLocation) => {
                if (newLocation?.coordinates) {
                    const isEqual = JSON.stringify(location) === JSON.stringify(newLocation);

                    if (!isEqual) {
                        setMarkerPosition(newLocation.coordinates);
                    }
                }
            });
        }, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [location, updateFunction]);

    return (
        <APIProvider apiKey={apiKey} onLoad={() => setMapLoaded(true)} region='IN' >
            <Map
                mapId='map_id'
                mapTypeControl={false}
                mapTypeId='satellite'
                streetViewControl={false}
                renderingType='VECTOR'
                reuseMaps={true}
                center={{ lat: location.coordinates.latitude, lng: location.coordinates.longitude }}
                zoom={20}
                style={{ width: '100%', height: '100%' }}
            >
                {mapLoaded && <AdvancedMarker
                    position={{ lat: markerPosition.latitude, lng: markerPosition.longitude }}
                    title={`${userInfo?.displayName}, Last Update time : ${location.timestamp}`}
                />}
            </Map>
        </APIProvider>
    );
});

export default GoogleMapTest;
