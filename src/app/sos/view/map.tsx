"use client"

import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import {UserData} from "@/app/sos/view/page";


const mapplsClassObject = new mappls();
// const mapplsPluginObject = new mappls_plugin();



type locationData = {
    coordinates : {
        latitude : number,
        longitude : number,
    },
    timestamp : string,
}


const MapTest = ({location, updateFunction, userInfo} : {
    location : locationData | undefined,
    updateFunction: () => Promise<locationData | undefined>,
    userInfo: UserData | undefined}) => {

    if (!location) {
        return <>No data provided</>
    }

    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const loadObject = {
        map: true,
        key: "2dfebed59da2015c08c7c0429986b1fc",
        layer: 'vector', // Optional Default Vector
        version: '3.0', // // Optional, other version 3.5 also available with CSP headers
        libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
        plugins:['direction'] // Optional for All the plugins
    };




    useEffect(() => {
        mapplsClassObject.initialize("2dfebed59da2015c08c7c0429986b1fc", loadObject, () => {
            const newMap = mapplsClassObject.Map({
                id: "map",
                key: "map-1",
                properties: {
                    center: [location.coordinates.latitude, location.coordinates.longitude],
                    zoom: 15,
                },
                geolocation:true,
            });
            // create a marker
             markerRef.current = mapplsClassObject.Marker({
                map: newMap,
                 key: "marker-1",
                 icon:  'https://i.pinimg.com/236x/1c/1c/ca/1c1ccaa5d50dd2014901cf1d3375690e.jpg',
                 width: 40,
                 height: 40,
                 clustersOptions:
                     {
                         "color":  "blue",
                         "bgcolor":  "red"
                     },
                position: {
                    lat: location.coordinates.latitude,
                    lng: location.coordinates.longitude,
                },
                popupHtml: `<p>${userInfo?.displayName}, Last Update time : ${location.timestamp}</p>`

            })

            mapplsClassObject.removeLayer({
                map: newMap,
            })


            newMap.on("load", () => {
                setIsMapLoaded(true);
            });
            mapRef.current = newMap;
        });
        return () => {
            if (mapRef.current) {
                //@ts-expect-error Since types are not supported
                mapRef.current.remove();
            }
        };
    }, []);


    useEffect(() => {
        // Function to be executed every 10 seconds
        const intervalId = setInterval(() => {

            // return if no markers
            if (!markerRef.current) return

            updateFunction().then(r => {
                if (!r?.coordinates) {
                    return; // return if request fails
                }

                // stringify json and compare

                let isEqual = true;
                try {
                    const oldData = JSON.stringify(location)
                    const newData = JSON.stringify(r)

                    isEqual = oldData === newData
                } catch (e) {
                    console.error(e);
                    return;
                }

                if (isEqual) {
                    console.log("same data")
                    return
                }

                mapplsClassObject.removeLayer({
                    map: mapRef.current,
                    layer: markerRef.current
                });


                markerRef.current = mapplsClassObject.Marker({
                    map: mapRef.current,
                    key: "marker-1",
                    icon: 'https://i.pinimg.com/236x/1c/1c/ca/1c1ccaa5d50dd2014901cf1d3375690e.jpg',
                    height: 40,
                    width: 40,
                    position: {
                        lat: r.coordinates.latitude,
                        lng: r.coordinates.longitude,
                    },
                    popupHtml: `<p>${userInfo?.displayName}, Last Update time : ${r.timestamp}</p>`

                })
                // @ts-expect-error works but types not defined
                mapRef.current.setCenter([r.coordinates.longitude , r.coordinates.latitude]);

            })


        }, 1000); // 10000 milliseconds = 10 seconds

        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run once on mount

    return (
        <div
            id="map"
            style={{ width: "100%", height: "99vh", display: "inline-block" }}
        >
            {isMapLoaded}
        </div>
    );
};


export default MapTest;