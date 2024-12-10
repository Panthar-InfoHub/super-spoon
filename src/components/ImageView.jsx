import { ScrollArea } from "./ui/scroll-area";

import Image from "next/image";
import { useState } from "react";

export const ImageView = ({ files }) => {
    const [imgData, setImgData] = useState()
    const [isPreview, setisPreview] = useState(false)


    return (
        <div className="p-6 pt-4 flex flex-col rounded-xl bg-white " >

            {files.length > 0 ?
                <>
                    <div>
                        <h3 className="font-semibold text-xl mb-4" > Emergency Image </h3>
                    </div>

                    <div className="pb-3 border-b-2 border-b-black mb-3" >
                        <Image src={files[0].url} width={325} height={100} alt="IMAGE NOT LOADED" className="object-cover pointer-events-none group-hover:opacity-75 rounded-xl aspect-video" />
                    </div>
                    <ScrollArea className="h-[150px]">
                        <ul className={`grid gap-5 rounded-md ${files.length === 1 ? "grid-cols-1" : "grid-cols-2"}`} >
                            {files.map((file, i) => {
                                return (

                                    <div onClick={() => {
                                        setImgData(file.url)
                                        setisPreview(true)
                                    }} key={i} className="cursor-pointer" >
                                        <Image src={file.url} width={125} height={125} alt="IMAGE NOT LOADED" className="object-cover pointer-events-none group-hover:opacity-75 rounded-xl aspect-square !w-full" />
                                    </div>
                                )
                            })}
                        </ul>
                    </ScrollArea>
                    {isPreview && (
                        <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex justify-center items-center" onClick={() => {
                            setImgData("")
                            setisPreview(false)
                        }} >
                            <div className=" min-h-[80%] w-[80%] rounded-xl relative" >
                                <Image src={imgData} fill alt="IMAGE NOT LOADED"
                                    className="object-cover pointer-events-none group-hover:opacity-75 rounded-xl aspect-video " priority />
                            </div>
                        </div>
                    )}
                </> : (<h3 className="font-semibold" >No Images yet!</h3>)}

        </div >
    );
}

export const AudioView = ({ files }) => {

    return (
        <div className="p-6 pt-4 flex flex-col rounded-xl bg-white " >
            {files.length > 0 ? <>
                <div>
                    <h3 className="font-semibold text-xl mb-4" > Audios </h3>
                </div>

                <ScrollArea className="h-[120px]">
                    <ul className="flex flex-col gap-4" >
                        {files.map((file, i) => (
                            <li key={i}>
                                <audio controls={true} className="">
                                    <source src={file.url} type="audio/mp3" />
                                </audio>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </> : (<h3 className="font-semibold" >No Audios yet!</h3>)
            }
        </div >
    )
}
