import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {

    const links = [
        {
            title: "Fetaures",
        },
        {
            title: "Benefits",
        },
        {
            title: "Solutions",
        },
        {
            title: "Testimonial",
        },
        {
            title: "FAQ",
        },
    ]

    const officials = [
        {
            title: "Guide",
        },
        {
            title: "License",
        },
        {
            title: "Change Log",
        },
    ]
    return (
        <footer className='bg-white-1 backdrop-blur-md pb-8' >
            <div className="section_container">
                <div className=' flex justify-between items-center border-b-2 border-b-grey-1' >
                    <div className='flex flex-col gap-4 py-20' >
                        <div> <Image src="/logo_xl.png" alt='logo' width={150} height={60} /> </div>
                        <ul className='flex gap-4' >
                            {
                                links.map((link, i) => (
                                    <li key={i} className='text-xl' >
                                        <Link href={"#"} >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <Link href="#" className='btn flex p-4 rounded-xl text-white' >
                        Get App
                    </Link>
                </div>

                <div className='w-full flex justify-between items-center' >
                    <ul className='py-5 flex gap-8' >
                        {officials.map((official, i) => (
                            <li key={i} className='text-base opacity-60 font-normal' >
                                {official.title}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <em className='opacity-60' > An Initiative of <span className='!opacity-100 text-base underline textColor font-medium' > Panthar Info Hub PVT. LTD. </span> </em>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
