'use client'
import { Image as ImageIcon, Volume2 } from 'lucide-react';
import Image from "next/image";

import { useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { ScrollArea } from './ui/scroll-area';

const MobileNav = ({ images, audios }) => {
    const snapPoints = [0.4, '355px', 1];
    const [snap, setSnap] = useState(snapPoints[0]);
    const [imgData, setImgData] = useState()
    const [isPreview, setisPreview] = useState(false)
    const [openDrawer1, setOpenDrawer1] = useState(false)
    const [openDrawer2, setOpenDrawer2] = useState(false)

    return (
        <div className='flex flex-col gap-4' >

            <Drawer open={openDrawer1} onOpenChange={setOpenDrawer1} snapPoints={snapPoints} activeSnapPoint={snap} setActiveSnapPoint={setSnap} >
                <DrawerTrigger asChild>
                    <div className='bg-[#d9d9d9] p-4 rounded-full cursor-pointer' > <ImageIcon /> </div>
                </DrawerTrigger>
                <DrawerContent isPreview={isPreview}>
                    {images.length > 0 ?
                        <div className='p-4' >
                            <div>
                                <h3 className="font-semibold text-xl mb-4" > Emergency Images </h3>
                            </div>

                            <ScrollArea className="h-[550px]">
                                <div className="pb-6 border-b-2 border-b-black mb-3 h-[15rem] w-full relative" >
                                    <Image src={images[0].url} fill alt="IMAGE NOT LOADED" className="object-cover pointer-events-none rounded-xl" />
                                </div>
                                <ul className={`grid gap-5 rounded-md ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`} >
                                    {images.map((file, i) => {
                                        return (
                                            <div onClick={() => {
                                                setImgData(file.url)
                                                setisPreview(true)
                                            }} key={i} className="cursor-pointer" >
                                                <Image src={file.url} width={125} height={125} alt="IMAGE NOT LOADED" className="pointer-events-none group-hover:opacity-75 rounded-xl aspect-square !w-full" />
                                            </div>
                                        )
                                    })}
                                </ul>
                            </ScrollArea>
                            {isPreview && (
                                <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex justify-center items-center pointer-events-auto" onClick={() => {
                                    setImgData("")
                                    setisPreview(false)
                                }} >
                                    <div className=" min-h-[80%] w-[80%] rounded-xl relative" >
                                        <Image src={imgData} fill alt="IMAGE NOT LOADED"
                                            className="object-cover pointer-events-none group-hover:opacity-75 rounded-xl aspect-video " priority />
                                    </div>
                                </div>
                            )}
                        </div> : (<h3 className="font-semibold" >No Images yet!</h3>)}
                </DrawerContent>
            </Drawer>

            {/* SECOND DRAWER FOR AUDIO */}

            <Drawer open={openDrawer2} onOpenChange={setOpenDrawer2} snapPoints={snapPoints} activeSnapPoint={snap} setActiveSnapPoint={setSnap} >
                <DrawerTrigger asChild>
                    <div className='bg-[#d9d9d9] p-4 rounded-full cursor-pointer' > <Volume2 /> </div>
                </DrawerTrigger>
                <DrawerContent>
                    {audios.length > 0 ?
                        <div className="p-4" >
                            <div>
                                <h3 className="font-semibold text-xl mb-4" > Audios </h3>
                            </div>

                            <ScrollArea className="h-[500px]">
                                <ul className="flex flex-col gap-4" >
                                    {audios.map((file, i) => (
                                        <li key={i}>
                                            <audio controls={true} className="w-full">
                                                <source src={file.url} type="audio/mp3" />
                                            </audio>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </div > : (<h3 className="font-semibold" >No Audios yet!</h3>)}
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default MobileNav;