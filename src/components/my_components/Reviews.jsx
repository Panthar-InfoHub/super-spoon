import Image from 'next/image'
import React from 'react'

const Reviews = () => {


    const reviews = [
        {
            review: "Suraksha Kawach is best",
            author: {
                name: "Kim Ji-ho",
                designation: "UX/UI Designer",
                image: "/user/ankit.jpeg"
            },
        },
        {
            review: "Suraksha Kawach is best",
            author: {
                name: "Park Min-jun",
                designation: "UX/UI Designer",
                image: "/user/ankit.jpeg"
            },
        },
        {
            review: "Suraksha Kawach is best",
            author: {
                name: "Lee Soo-bin",
                designation: "UX/UI Designer",
                image: "/user/ankit.jpeg"
            },
        },
        {
            review: "Suraksha Kawach is best",
            author: {
                name: "Choi Hye-jin",
                designation: "UX/UI Designer",
                image: "/user/ankit.jpeg"
            },
        },
        {
            review: "Suraksha Kawach is best",
            author: {
                name: "Jeong Woo-jin",
                designation: "UX/UI Designer",
                image: "/user/ankit.jpeg"
            },
        },
    ];
    

    return (
        <section className='section_container py-[7rem] z-[1] relative' >
            <div className='text-center' >
                <div className='max-w-[50rem] w-full mx-auto flex flex-col gap-5' >
                    <div>
                        <div className='btn rounded-xl inline-flex text-sm p-2 font-medium text-white' >
                        Real Stories, Real Impact
                        </div>
                        <h1 className="heading text-black-3" > What Our Users Are Saying </h1>
                    </div>
                    <p className='text-small-medium' > Discover the real-world benefits of enhanced visitor experience, data-driven insights, and increased conversion rates through their experiences. </p>
                </div>
            </div>

            <div className='card_grid mt-14 mx-auto w-[80%]' >
                {reviews.map((review, index) => (
                    <div key={index} className='p-4 bg-white-glass rounded-2xl border border-[#d9e2ec]' >
                        <div>
                            "Suraksha Kawach is a smart safety app offering real-time SOS alerts, guardian monitoring, and AI-driven health insights, ensuring enhanced personal security and peace of mind"
                        </div>
                        <div className='flex mt-5 w-full justify-between items-center' >
                            <div>
                                <h3 className='font-medium' > {review.author.name} </h3>
                                <em className='text-xs' > {review.author.designation} </em>
                            </div>
                            <div  >
                                <Image src={review.author.image} alt='user' width={48} height={48} className='rounded-xl' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Reviews
