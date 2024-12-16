import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className=' pt-[9rem] pb-20 z-[1] relative' >
            <div className='section_container flex flex-col ' >
                <div className='section_bg' />
                <div>
                    <div className='text-center' >
                        <div className='max-w-[62rem] w-full mx-auto flex flex-col gap-5' >
                            <div>
                                <div className='btn rounded-xl inline-flex text-sm p-2 font-semibold text-white-1' >
                                    The Ultimate Saftey Application
                                </div>
                                <h1 className="heading text-black-3" > Aapki Suraksha Aapke Haath
                                    <br />
                                    <span className='btn text-grey-4 ' > Real Time Traffic Insight </span>
                                </h1>
                            </div>
                            <p className='text-small-medium' > Gain deep insights into your website’s performance with real-time analytics and detailed traffic reports. </p>

                            <div className='flex flex-wrap gap-4 justify-center text-base' >
                                <Button className="btn !px-3 !py-5" > Get Started </Button>
                                <Button className="!px-3 !py-5 second_btn" > Know More </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECOND DIV FOR MOCKUPS */}
                <div className='mt-10' >
                    <div className='w-full sm:w-[60%] min-h-[50rem] mx-auto relative p-4 bg-white_glass border-border-color border backdrop-blur-xl rounded-2xl' >
                        <Image src="/hero.png" fill alt='hero' priority quality={100} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero