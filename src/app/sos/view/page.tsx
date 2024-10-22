"use client"

import axios from "axios";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import MapTest from "@/app/sos/view/map";
import Image from "next/image";


type emergencyContact = {
    name: string,
    email: string,
    mobile: string,
    _id: string
}

export type UserData = {
    "firebaseUID": string
    "displayName": string,
    "email": string,
    "gender": string,
    "emergencyContacts": emergencyContact[],
    "tickets": string[]
}

type locationData = {
    coordinates : {
        latitude : number,
        longitude : number,
    },
    timestamp : string,
}


type ticketData = {
    ticketId: string,
    firebaseUID: string,
    status : string,
    locationInfo : locationData[],
    images : string[],
    audioClips : string[],
}

type resData = {
    user: UserData
    ticket: ticketData
}


export default function ViewSOS () {
    const params = useSearchParams();
    const ticketId = params.get("ticketId");
    const firebaseUID = params.get("firebaseUID");
    const [getRequestFailed, setGetRequestFailed] = useState(false)
    const [userData, setUserData] = useState<UserData | undefined>(undefined)
    const [ticketData, setTicketData] = useState<ticketData | undefined>(undefined)
    const [locationData, setLocationData] = useState<locationData[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const server_url = process.env.SERVER_URL || "https://surakshakawach-mobilebackend-192854867616.asia-south2.run.app";
    const [activeTab, setActiveTab] = useState(1);


    async function getTicketDetails() {
        try {
            const res = await axios.get(server_url + "/api/v1/ticket", {params: {ticketId, firebaseUID}});
            const data : resData = res.data.data;
            console.log(data);
            setUserData(data.user)
            setTicketData(data.ticket)
            setLocationData(data.ticket.locationInfo)

        } catch (e) {
            setGetRequestFailed(true);
            console.error(e);
        }
    }

    useEffect(() => {
        getTicketDetails().then(() => {
            console.log("ticket details fetched")
        })
        setLoading(false)
    })

    // update images in 10 seconds
    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const res = await axios.get(server_url + "/api/v1/ticket", {params: {ticketId, firebaseUID}});
                const newTicketData: ticketData = res.data.data.ticket;

                // Avoid multiplying images by ensuring they are unique
                setTicketData(prevTicketData => {
                    if (!prevTicketData) return newTicketData;

                    const updatedImages = Array.from(new Set([...prevTicketData.images, ...newTicketData.images]));

                    return {
                        ...newTicketData,
                        images: updatedImages, // Only keep unique images
                    };
                });

                console.log("Images updated");
            } catch (e) {
                console.error("Error updating ticket details:", e);
            }
        }, 10000); // 10000 milliseconds = 10 seconds

        return () => clearInterval(intervalId);
    }, [ticketId, firebaseUID]); // Dependencies for ticketId and firebaseUID to ensure they are used correctly.


    if (!ticketId || !firebaseUID) {

    }

    if (getRequestFailed) {
        return <section id={"error"}>
            <div className={'flex w-full h-screen items-center justify-center'}>
                <h1 className={"text-2xl"}>Server Error, Request Failure</h1>
            </div>
        </section>
    }

    if (loading){
        return <section id={"loading"}>
            <div className={'flex w-full h-screen items-center justify-center'}>
                <h1 className={"text-2xl"}>Loading <span className={"animate-pulse"}>...</span></h1>
            </div>
        </section>
    }

    async function fetchLatestLocation() : Promise<locationData | undefined> {

        try {
            const res = await axios.get(`${server_url}/api/v1/ticket/latest-update`, {params: {ticketId, firebaseUID}})
            const data : locationData = res.data.data.locationInfo
            console.log(res.data)
            setLocationData((prev) => {
                prev.push(data)
                return prev
            })

            return data

        } catch (e) {
            console.error(e)
            return undefined

        }


    }

    return (
        <section id={"welcome"} className={""}>

            <div className={'py-2  lg:p-1 w-full h-max'}>
                <div className={""}>
                    <h1><span className={'font-bold'}>SOS Request ID</span> : {ticketData?.ticketId}</h1>
                    <h1><span className={'font-bold'}>Ticket Status : </span><span
                        className={ticketData?.status === "active" ? 'text-green-600' : ''}>{ticketData?.status}</span>
                    </h1>
                    <h1><span className={'font-bold'}>Viewing Location of :</span> {userData?.displayName}</h1>
                </div>


            </div>

            <div className="border-b border-gray-200 dark:border-neutral-700 ">
                <nav className="flex gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                    <button type="button"
                            className="font-bold text-lg py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap  hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none  dark:hover:text-blue-500"
                            id="tabs-with-underline-item-1" aria-selected="true" data-hs-tab="#tabs-with-underline-1"
                            onClick={() => setActiveTab(1)}
                            aria-controls="tabs-with-underline-1" role="tab">
                        Location
                    </button>
                    <button type="button"
                            className="font-bold text-lg py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap  hover:text-blue-600 focus:outline-none focus:text-blue-600"
                            id="tabs-with-underline-item-2" aria-selected="false" data-hs-tab="#tabs-with-underline-2"
                            onClick={() => setActiveTab(2)}
                            aria-controls="tabs-with-underline-2" role="tab">
                        Images
                    </button>
                    <button type="button"
                            className="font-bold text-lg py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap  hover:text-blue-600 focus:outline-none focus:text-blue-600 "
                            id="tabs-with-underline-item-3" aria-selected="false" data-hs-tab="#tabs-with-underline-3"
                            onClick={() => setActiveTab(3)}
                            aria-controls="tabs-with-underline-3" role="tab">
                        Audio
                    </button>
                </nav>
            </div>

            {/*Data of Tabs*/}
            <div className="mt-3">
                <div hidden={activeTab !== 1} id="tabs-with-underline-1" role="tabpanel"
                     aria-labelledby="tabs-with-underline-item-1">
                    <div className={"lg:mx-20 lg:my-10"}>
                        <MapTest location={locationData.slice(-1)?.pop()} updateFunction={fetchLatestLocation}
                                 userInfo={userData}/>
                    </div>
                </div>
                <div hidden={activeTab !== 2} id="tabs-with-underline-2" className="" role="tabpanel"
                     aria-labelledby="tabs-with-underline-item-2">
                    <div className={"my-10 py-2"}>
                        <ImagesView files={ticketData?.images || []}/>
                    </div>
                </div>
                <div hidden={activeTab !== 3} id="tabs-with-underline-3 " className="" role="tabpanel"
                     aria-labelledby="tabs-with-underline-item-3">
                    <div className={"my-10 py-2"}>
                        <AudioClipsView files={ticketData?.audioClips || []}/>
                    </div>
                </div>
            </div>


        </section>
    )
}


function ImagesView({files}: { files: string[] }) {

    if (!files.length) {
        return <>No Images yet!</>
    }

    return (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {files.map((file) => (
                <li key={file} className="col-span-1">
                    <Image height={1000} width={1000} src={file} alt="IMAGE NOT LOADED"
                           className="object-cover pointer-events-none group-hover:opacity-75 aspect-video"/>
                </li>
            ))}
        </ul>
    )
}


function AudioClipsView({files}: { files: string[] }) {

    if (!files.length) {
        return <>No Clips!</>
    }

    return (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {files.map((file) => (
                <li key={file} className="col-span-1">
                    <audio src={file}
                           className="object-cover pointer-events-none group-hover:opacity-75 aspect-video"/>
                </li>
            ))}
        </ul>
    )
}