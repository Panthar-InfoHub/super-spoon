'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { accor_data } from "@/src/lib/data"
import Image from "next/image"
import { useState } from "react"

const Benefit_Tab = () => {

    const [view , setView] = useState(0);
    return (
        <div className="flex gap-12 items-center" >
            <Tabs className="w-full rounded-2xl flex items-center gap-16 justify-between flex-col sm:flex-row" defaultValue={view} onValueChange={(val) => setView(Number(val))} >
                <TabsList className="tab rounded-2xl h-full flex-1" >
                    {accor_data.map((data, index) => (
                        <TabsTrigger key={index} className="rounded-xl p-6 tab_trigger opacity-50 hover:opacity-85 transition-all duration-200" value={index} >
                            <div className="flex gap-2 items-center" >
                                <span className="bg-[] p-2 rounded-lg " > {data.icon} </span>
                                <h3 className=" text-lg font-bold" > {data.heading} </h3>
                            </div>
                            {view === index &&  <p className="whitespace-normal break-words pl-8" >
                                {data.description}
                            </p>}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value={1} className="w-full sm:w-[50%]" >
                    <div className={`w-full rounded-2xl py-10 pl-10 flex bg-gradient-to-r from-[#ffffff00] to-[#8494eb40] h-[30rem]`} >
                        <div className=" w-full relative self-center h-[90%]" >
                            <Image src="/bg/img_11.jpg" alt="background" fill />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value={0} className="w-full sm:w-[50%]" >
                    <div className={`w-full rounded-2xl py-10 pl-10 flex bg-gradient-to-r from-[#ffffff00] to-[#8494eb40] h-[30rem]`} >
                        <div className=" w-full relative self-center h-[90%]" >
                            <Image src="/bg/img_31.jpg" alt="background" fill />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value={2} className="w-full sm:w-[50%]" >
                    <div className={`w-full rounded-2xl py-10 pl-10 flex bg-gradient-to-r from-[#ffffff00] to-[#8494eb40] h-[30rem]`} >
                        <div className=" w-full relative self-center h-[90%]" >
                            <Image src="/bg/img_11.jpg" alt="background" fill />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default Benefit_Tab
