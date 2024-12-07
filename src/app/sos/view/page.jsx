"use client";
import MapComponent from "@/app/sos/view/map";
import { AudioView, ImageView } from "@/app/sos/view/ImageView";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const server_url = process.env.SERVER_URL || "https://surakshakawach-mobilebackend-192854867616.asia-south2.run.app";

export default function ViewSOS() {

    const params = useSearchParams();
    const ticketId = params.get("ticketId") || "f8abc3c5-5df1-4f37-ab4d-36cde179f7b6";
    const firebaseUID = params.get("firebaseUID") || "u7TW7LzsjrZ8QkEPV2Ysa76JDJz1";
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
                <div className="h-screen w-screen relative overflow-hidden">
                    <MapComponent location={locationData?.slice(-1)[0]} userInfo={userData} updateFunction={fetchLatestLocation} />
                    <UserInfo userInfo={userData} status={ticketData?.status} />
                    <div className="absolute left-4 top-5 min-h-screen flex flex-col gap-5" >
                        <ImageView files={ticketData?.images || []} />
                        <AudioView files={ticketData?.audioClips || []} />
                    </div>
                </div>
            </div>
        </section>
    );
}

const UserInfo = ({ userInfo, status }) => {
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
        <div className="absolute right-5 top-6 " >
            <div className="flex items-center relative" >
                <div className="pr-8 pl-4 py-2 bg-[#242424] text-white rounded-full  translate-x-7" >
                    <h3 className="font-semibold" > {userInfo.displayName} </h3>
                </div>
                <div className="relative" >
                    <Image src={pfpImg} alt="profile" width={50} height={50} className="rounded-full" />
                    <span className={` w-4 h-4 absolute top-0 right-[-1%] rounded-full ${status === "active" ? "bg-green-400" : "bg-red-500"} `} />
                </div>
            </div>
        </div>
    )
}
