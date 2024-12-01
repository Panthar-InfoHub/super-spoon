"use client";
import result from "@/app/sos/view/data";
import MapComponent from "@/app/sos/view/map";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ViewSOS() {
    // const params = useSearchParams();
    // const ticketId = params.get("ticketId");
    // const firebaseUID = params.get("firebaseUID");
    const [getRequestFailed, setGetRequestFailed] = useState(false);
    const [userData, setUserData] = useState(undefined);
    const [ticketData, setTicketData] = useState(undefined);
    const [locationData, setLocationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const server_url = process.env.SERVER_URL || "https://surakshakawach-mobilebackend-192854867616.asia-south2.run.app";
    const [activeTab, setActiveTab] = useState(1);


    async function getTicketDetails() {
        const res = result;
        const data = res.data;
        console.log(data);
        setUserData(data?.user);
        setTicketData(data?.ticket);
        setLocationData(data?.ticket.locationInfo);
        // try {
        // const res = await axios.get(server_url + "/api/v1/ticket", { params: { ticketId, firebaseUID } });

        // } catch (e) {
        //     setGetRequestFailed(true);
        //     console.error(e);
        // }
    }

    // Initially fetch ticket data
    useEffect(() => {
        getTicketDetails().then(() => {
            console.log("ticket details fetched");
        });
        setLoading(false);
    }, []);

    //Again fetch --> when any dependency change
    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         try {
    //             const res = await axios.get(server_url + "/api/v1/ticket", { params: { ticketId, firebaseUID } });
    //             const newTicketData = res.data.data.ticket;

    //             setTicketData(prevTicketData => {
    //                 if (!prevTicketData) return newTicketData;

    //                 const updatedImages = Array.from(new Set([...prevTicketData.images, ...newTicketData.images]));

    //                 return {
    //                     ...newTicketData,
    //                     images: updatedImages,
    //                 };
    //             });

    //             console.log("Images updated");
    //         } catch (e) {
    //             console.error("Error updating ticket details:", e);
    //         }
    //     }, 10000);

    //     return () => clearInterval(intervalId);
    // }, [ticketId, firebaseUID]);

    //If any error happen while fetching data
    if (getRequestFailed) {
        return (
            <section id="error">
                <div className="flex w-full h-screen items-center justify-center">
                    <h1 className="text-2xl">Server Error, Request Failure</h1>
                </div>
            </section>
        );
    }
    // Loader
    if (loading) {
        return (
            <section id="loading">
                <div className="flex w-full h-screen items-center justify-center">
                    <h1 className="text-2xl">
                        Loading <span className="animate-pulse">...</span>
                    </h1>
                </div>
            </section>
        );
    }

    async function fetchLatestLocation() {
        try {
            // const res = await axios.get(`${server_url}/api/v1/ticket/latest-update`, {
            //     params: { ticketId, firebaseUID },
            // });
            // const data = res.data.data.locationInfo;
            const res = result;
            const data = res.data;
            setLocationData(prev => {
                prev.push(data);
                return prev;
            });

            return data;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    return (
        <section id="welcome">

            <div className="border-b border-gray-200 dark:border-neutral-700">
                <nav className="flex gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                    <button
                        type="button"
                        className="font-bold text-lg py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:hover:text-blue-500"
                        onClick={() => setActiveTab(1)}
                    >
                        Location
                    </button>
                    <button
                        type="button"
                        className="font-bold text-lg py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap hover:text-blue-600 focus:outline-none focus:text-blue-600"
                        onClick={() => setActiveTab(2)}
                    >
                        Images
                    </button>
                    <button
                        type="button"
                        className="font-bold text-lg py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap hover:text-blue-600 focus:outline-none focus:text-blue-600"
                        onClick={() => setActiveTab(3)}
                    >
                        Audio
                    </button>
                </nav>
            </div>

            <div className="mt-3">
                <div hidden={activeTab !== 1}>
                    <div className="h-[70vh]">
                        <MapComponent location={locationData?.slice(-1)[0]} userInfo={userData} updateFunction={fetchLatestLocation} />
                    </div>
                </div>
                <div hidden={activeTab !== 2}>
                    <div className="my-10 py-2">
                        <ImagesView files={ticketData?.images || []} />
                    </div>
                </div>
                <div hidden={activeTab !== 3}>
                    <div className="my-10 py-2">
                        <AudioClipsView files={ticketData?.audioClips || []} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ImagesView({ files }) {
    if (!files.length) {
        return <>No Images yet!</>;
    }

    return (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {files.map(file => (
                <li key={file} className="col-span-1">
                    <Image height={1000} width={1000} src={file} alt="IMAGE NOT LOADED" className="object-cover pointer-events-none group-hover:opacity-75 aspect-video" />
                </li>
            ))}
        </ul>
    );
}

function AudioClipsView({ files }) {
    if (!files.length) {
        return <>No Clips!</>;
    }

    return (
        <ul className="grid grid-cols-1 gap-x-4 gap-y-4 xl:gap-x-8">
            {files.map((file, i) => (
                <li key={file} className="flex col-span-1">
                    <p>Recording {i + 1}</p>
                    <audio controls className="pl-10 object-cover group-hover:opacity-75 aspect-square">
                        <source src={file} type="audio/mp3" />
                    </audio>
                </li>
            ))}
        </ul>
    );
}
