"use client"

import axios from "axios";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import MapTest from "@/app/sos/view/map";


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
    locationInfo : locationData[]
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

    if (!ticketId || !firebaseUID) {
        return <section id={"error"}>
            <div className={'flex w-full h-screen items-center justify-center'}>
                <h1 className={"text-2xl"}>Invalid Request</h1>
            </div>
        </section>
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
    <section id={"welcome"}>
        <div className={'p-2 lg:p-1 w-full h-max'}>
            <div className={""}>
                <h1><span className={'font-bold'}>SOS Request ID</span> : {ticketData?.ticketId}</h1>
                <h1><span className={'font-bold'}>Ticket Status : </span><span className={ticketData?.status === "active" ? 'text-green-600' : ''} >{ticketData?.status}</span></h1>
                <h1><span className={'font-bold'}>Viewing Location of :</span> {userData?.displayName}</h1>
            </div>
            <MapTest location={locationData.slice(-1)?.pop()} updateFunction={fetchLatestLocation} userInfo={userData} />

        </div>
    </section>
    )


}