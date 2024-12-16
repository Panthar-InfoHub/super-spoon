import React from 'react'
import Benefit_Tab from './Benefit_Tab'
import Image from 'next/image'
import { benefit_data } from '@/src/lib/data'

const Benefit = () => {
    return (
        <section className='section_container py-[7rem] z-[1] relative flex flex-col gap-[6rem] ' >
            <div className='text-center' >
                <div className='max-w-[50rem] w-full mx-auto flex flex-col gap-5' >
                    <div>
                        <div className='btn rounded-xl inline-flex text-sm p-2 font-semibold' >
                            Empower Your Saftey
                        </div>
                        <h1 className="sub-heading font-bold text-black-3" > Benefits of Using Suraksha Kawach</h1>
                    </div>
                    <p className='text-small-medium !font-normal' > Ensure personal safety with real-time SOS alerts, strengthen family security through guardian monitoring, and prevent risks with AI-powered health predictions </p>

                </div>
            </div>
            <Benefit_Tab />

            <div className='flex justify-between mt-4 items-center' >

                {/* IMAGE */}
                <div className={`flex-[0.4] rounded-2xl py-10 pl-10 flex bg-gradient-to-r from-[#ffffff00] to-[#8494eb40] h-[25rem]`} >
                    <div className=" w-full relative self-center h-[90%]" >
                        <Image src="/bg/img_31.jpg" alt="background" fill />
                    </div>
                </div>


                <div className='flex-[0.5]' >
                    <div>
                        <div className='btn text-white-1 rounded-xl inline-flex text-sm p-2 font-semibold' >
                            Insight Tailored To You
                        </div>

                        <h3 className='sub-heading text-black-3 font-bold my-2' > Custom Data Analytics </h3>
                        <p className='text-black-3 text-lg' > Tailor analytics to your specific needs with customizable machine learning models for precise, actionable insights.</p>
                    </div>

                    <div className='card_grid_small mt-3' >
                        {benefit_data.map((data, index) => (
                            <div key={index} className=''>
                                <div className='icon_bg' >
                                    {data.icon}
                                </div>
                                <div className='flex flex-col gap-2 mt-4' >
                                    <h3 className='text-lg font-medium' > {data.title} </h3>
                                    <p> {data.desc} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Benefit
