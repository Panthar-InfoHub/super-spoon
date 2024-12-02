"use client";
import MapComponent from "@/app/sos/view/map";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const server_url = process.env.SERVER_URL || "https://surakshakawach-mobilebackend-192854867616.asia-south2.run.app";

export default function ViewSOS() {
    const params = useSearchParams();
    const ticketId = params.get("ticketId") || 'ef8107d9-f38f-4afa-bff6-93152d3018bc';
    const firebaseUID = params.get("firebaseUID") || 'u7TW7LzsjrZ8QkEPV2Ysa76JDJz1';
    const [getRequestFailed, setGetRequestFailed] = useState(false);
    const [userData, setUserData] = useState(undefined);
    const [ticketData, setTicketData] = useState(undefined);
    const [locationData, setLocationData] = useState([]);
    const [loading, setLoading] = useState(true);


    async function getTicketDetails() {
        // const res = result;

        try {
            const { data: res } = await axios.get(server_url + "/api/v1/ticket", { params: { ticketId, firebaseUID } });
            console.log(res)
            setUserData(res.data?.user);
            setTicketData(res.data?.ticket);
            setLocationData(res.data?.ticket?.locationInfo);

        } catch (e) {
            setGetRequestFailed(true);
            console.error(e);
        }
    }

    // Initially fetch ticket data
    useEffect(() => {
        getTicketDetails().then(() => {
            console.log("ticket details fetched");
            setLoading(false);
        });
    }, []);

    //Again fetch --> when any dependency change
    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const res = await axios.get(server_url + "/api/v1/ticket", { params: { ticketId, firebaseUID } });
                const newTicketData = res.data.data.ticket;

                setTicketData(prevTicketData => {
                    if (!prevTicketData) return newTicketData;

                    const updatedImages = Array.from(new Set([...prevTicketData.images, ...newTicketData.images]));

                    return {
                        ...newTicketData,
                        images: updatedImages,
                    };
                });

            } catch (e) {
                console.error("Error updating ticket details:", e);
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [ticketId, firebaseUID]);

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

    // Update function to refecth user location after 10sec
    const fetchLatestLocation = async () => {
        try {
            const { data: resData } = await axios.get(`${server_url}/api/v1/ticket/latest-update`, {
                params: { ticketId, firebaseUID },
            });
            const data = resData?.data?.locationInfo;
            // const res = result;
            // const data = res.data.locationInfo;
            setLocationData(prev => [...prev, data]);
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <section id="welcome">

            <div className="relative">
                <div className="h-screen w-screen relative">
                    <MapComponent location={locationData?.slice(-1)[0]} userInfo={userData} updateFunction={fetchLatestLocation} />
                    <UserInfo userInfo={userData} />
                    <div className="absolute left-4 top-5 min-h-screen flex flex-col gap-5" >
                        <ImagesView files={ticketData?.images || []} />
                        <AudioClipsView files={ticketData?.audioClips || []} />
                    </div>
                </div>
            </div>
        </section>
    );
}

const UserInfo = ({ userInfo }) => {
    const [pfpImg, setpfpImg] = useState("");

    async function getProfileImage() {
        try {
            const { data: res } = await axios.get(server_url + "/api/v1/user/profile-img", { params: { firebaseUID: userInfo?.firebaseUID } });
            setpfpImg(res?.data?.profile_url)
        } catch (e) {
            console.error(e);
        }
    }

    // Initially fetch ticket data
    useEffect(() => {
        getProfileImage()
    }, []);
    return (
        <div className="absolute right-5 top-6 flex items-center" >
            <div className="pr-2 pl-4 py-2 bg-[#242424] text-white rounded-l-full " >
                <h3 className="font-semibold" > {userInfo.displayName} </h3>
            </div>
            <div>
                <Image src={pfpImg} alt="profile" width={50} height={50} className="rounded-full" />
            </div>
        </div>
    )
}

const ImagesView = ({ files }) => {

    if (!files.length) {
        return <>No Images yet!</>;
    }

    return (
        <div className="p-6 pt-4 flex flex-col rounded-xl bg-white " >
            <div>
                <h3 className="font-semibold text-xl mb-4" > Emergency Image </h3>
            </div>

            <div className="pb-3 border-b-2 border-b-black mb-3" >
                <Image src={files[0]} width={325} height={100} alt="IMAGE NOT LOADED" className="object-cover pointer-events-none group-hover:opacity-75 rounded-xl aspect-video" />
            </div>
            <ul className={`grid gap-5 ${files.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                {files.map(file => (
                    <li key={file} className="rounded-xl relative ">
                        <Image src={file} width={125} height={125} alt="IMAGE NOT LOADED" className="object-cover pointer-events-none group-hover:opacity-75 rounded-xl aspect-square" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const AudioClipsView = ({ files }) => {
    if (!files.length) {
        return <>No Clips!</>;
    }

    return (
        <div className="p-6 pt-4 flex flex-col rounded-xl bg-white gap-4" >
            <div>
                <h3 className="font-semibold text-xl text-center" > Audio </h3>
            </div>

            <div className="flex flex-col gap-4" >
                {files.map((file, i) => (
                    <li key={i}>
                        <audio controls={true} className="">
                            <source src={file} type="audio/mp3" />
                        </audio>
                    </li>
                ))}
            </div>
        </div>
    );
}