import Benefit from "@/src/components/my_components/Benefit";
import Hero from "@/src/components/my_components/Hero";
import Reviews from "@/src/components/my_components/Reviews";
import Image from "next/image";

export default function Home() {

  const data = [
    {
      heading: "Real-Time Traffic Monitoring",
      desc: "Track and analyze website traffice in real-time to identify trends and optimize user experiene",
      image: "/bg/img_11.jpg",
      gradient: "from-[#ffffff00] to-[#d384eb40]",
    },
    {
      heading: "Predictive Traffic Modeling",
      desc: "Use advanced predictive models to forecast visitor behavior and plan ahead for peak traffic times.",
      image: "/bg/img_11.jpg",
      gradient: "from-[#ffffff00] to-[#8494eb40]",
    },
    {
      heading: "Comprehensive Traffic Reports",
      desc: "Generate detailed reports on website traffic, user engagement, and conversion rates for better decision-making",
      image: "/bg/img_31.jpg",
      gradient: "from-[#ffffff00] to-[#eb848440]",
    },
  ]

  return (
    <>
      <Hero />

      <section className='section_container py-[7rem] z-[1] relative' >
        <div className="w-full">
          <div className="card_grid" >
            {data.map((item, id) => (
              <div className="flex flex-col" key={id}>
                <div key={id} className={`w-full rounded-2xl py-10 pl-10 flex bg-gradient-to-r ${item.gradient} h-[20rem]`} >
                  <div className=" w-full relative self-center h-[90%]" >
                    <Image src={item.image} alt="background" fill />
                  </div>
                </div>
                <div className="pl-10 mt-4" >
                  <h3 className="text-xl-medium" > {item.heading} </h3>
                </div>
                <div className="pl-10 mt-4" >
                  <p className="text-small-medium !font-normal" > {item.desc} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Benefit />

      <Reviews/>
    </>
  )
}
