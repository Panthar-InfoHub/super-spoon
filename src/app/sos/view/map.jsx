'use client'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useState } from 'react';

const GoogleMapTest = React.memo(({ location, updateFunction, userInfo }) => {

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBl3KRCtkuyEndkgYZIQGdx28kqcIP_LVQ";
    const [mapLoaded, setMapLoaded] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(location?.coordinates);

    // Memoize the map load handler
    const onLoad = useCallback(() => {
        setMapLoaded(true);
    }, []);

    // Update Marker based on old location : 
    // if old and new location same don't do anything
    const updateMarkerPosition = useCallback((newLocation) => {
        if (newLocation?.coordinates) {
            const isEqual = JSON.stringify(location) === JSON.stringify(newLocation);
            if (!isEqual) {
                setMarkerPosition(newLocation.coordinates);
            }
        }
    }, [location]);

    // Effect to periodically fetch locations
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateFunction()
                .then(updateMarkerPosition)
                .catch((error) => console.error("Error fetching location:", error));
        }, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId);
    }, [updateFunction, updateMarkerPosition]);

    return (
        <APIProvider apiKey={apiKey} onLoad={onLoad} region='IN' language='en' >
            <Map
                mapId='map_id'
                reuseMaps={true}
                mapTypeId='roadmap'
                renderingType='VECTOR'
                style={{ width: '100%', height: '100vh' }}
                defaultCenter={{ lat: markerPosition.latitude, lng: markerPosition.longitude }}
                defaultZoom={18}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                {mapLoaded && <AdvancedMarker
                    position={{ lat: markerPosition.latitude, lng: markerPosition.longitude }}
                    title={`${userInfo?.displayName}, Last Update time : ${location?.timestamp}`}
                />}

            </Map>
        </APIProvider>
    );
});

export default GoogleMapTest;
