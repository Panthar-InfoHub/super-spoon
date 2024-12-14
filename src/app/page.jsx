import { Timer } from "lucide-react";
import TimerComp from "../components/Timer"
import InputComp from "../components/InputComp"
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const benefits = [
    { text: "Instant SOS Alerts" },
    { text: "Real-Time Location Sharing" },
    { text: "Voice Command Functionality" },
    { text: "Offline Capability" },
    { text: "Guardian Protection" },
    { text: "AI-Powered Health Insights" },
  ]

  const working = [
    {
      heading: "Download & Register",
      description: "Get started by downloading the app and registering your profile with simple steps."
    },
    {
      heading: "Add Emergency Contacts",
      description: "Add trusted contacts who will receive alerts and updates during emergencies."
    },
    {
      heading: "Activate Safety Features",
      description: "Use features like SOS alerts, voice activation, and real-time tracking to stay protected."
    },
    {
      heading: "Stay Informed",
      description: "AI-powered insights to monitor health and enhance overall safety."
    },
  ]

  const socials = [
    { name: "Twitter", link: "https://x.com/pantharinfohub" },
    { name: "Linkedin", link: "https://www.linkedin.com/company/panthar-infohub/" },
    { name: "Facebook", link: "https://www.facebook.com/people/Panthar-Infohub/pfbid037e7G5wJ4EJU9peVhh5H5BR7gyx1DnxfES879yMtDzT21koiV8gQG9wHLq1EXpeNjl/" },
    { name: "Instagram", link: "https://www.instagram.com/panthar.infohub/" },
    { name: "connect@pantharinfohub.com", mailto: "mailto:connect@pantharinfohub.com" },
  ];

  return (
    <section id={"welcome"}>
      <div className='flex w-full flex-col gap-10 relative pb-24'>
        <div className="absolute top-0 left-0 p-10" >
          <header>
            <Image src="/logo.png" width={85} height={55} alt="logo" />
          </header>
        </div>

        <div className="flex flex-col justify-center px-10 items-start gap-16 sm:gap-0" >

          {/* first container */}
          <div className="min-h-screen w-full flex items-center justify-between flex-wrap" >
            <div className="md:w-[70%] w-full h-screen flex justify-center items-center" >
              <h3 className="font-semibold leading-[110%] tracking-[-0.04rem] sm:text-[3rem] md:text-[4.5rem] text-[3rem]" > Suraksha Kawach App: Your Personal Safety Companion </h3>
            </div>

            <div className="md:w-auto w-full" >
              <div className="flex gap-4 items-center justify-center mb-3" >
                <Timer />
                <TimerComp />
              </div>
              <div className="border border-black rounded-xl p-4 flex flex-col gap-4" >
                <p className="font-light text-base" > Be an Early Tester for Suraksha Kawach! </p>

                <InputComp />

                <div className="opacity-65" >
                  <p> For more info, reach us at <br />
                    <span> connect@pantharinfohub.com </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Container */}
          <div className="flex flex-col gap-28 w-[90%]" >
            <div className="flex flex-col gap-8" >
              <p> At Suraksha Kawach, we've created a mobile app that prioritizes your safety and well-being, combining advanced technology with a user-friendly experience. Our app is designed to empower individuals by providing real-time emergency assistance and peace of mind, no matter where you are.</p>
              <p className="opacity-70" > Your Safety, Our Priority.</p>
            </div>

            <div className="w-[75%] flex flex-col gap-14  " >


              <div className="flex gap-24 flex-wrap" >

                <div className="flex flex-col gap-8 flex-1" >
                  <div>
                    <h3 className="font-semibold leading-[150%] text-2xl" > How It Works.</h3>
                  </div>
                  <div className="flex flex-col gap-3" >
                    {working.map((work, index) => (
                      <div key={index}>
                        <p className="font-semibold text-lg" >{work.heading} :</p>
                        <span className="ml-2" > {work.description} </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-8 flex-1" >
                  <div>
                    <h3 className="font-semibold leading-[150%]  text-2xl" > Why Suraksha Kawach ?</h3>
                  </div>

                  <div className="flex flex-col gap-3" >
                    {benefits.map((benefit, index) => (
                      <p key={index} >
                        {benefit.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>


              {/* Last PArt */}
              <div className="flex gap-24 flex-wrap">
                <div className="flex flex-col gap-8 flex-1">
                  <div>
                    <h3 className="font-semibold leading-[150%] text-2xl">Meet Our Team</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>
                      Our team at Suraksha Kawach is composed of dedicated professionals who bring their expertise to
                      ensure the success of our app:
                    </p>
                    <p>
                      <a href="https://www.linkedin.com/in/abhay-namdev-2797b6252/" target="_blank" rel="noopener noreferrer"
                         className="font-bold text-blue-500 hover:underline">
                        Abhay Namdev
                      </a>, the CEO & Founder, leads with vision and innovation.
                      <a href="https://www.linkedin.com/in/abhishek-pal-940a5524b/" target="_blank" rel="noopener noreferrer"
                         className="font-bold text-blue-500 hover:underline">
                        Abhishek Pal
                      </a>, CMO & Co-Founder, spearheads marketing strategies.
                      <a href="https://linkedin.com/in/badenforcer" target="_blank" rel="noopener noreferrer"
                         className="font-bold text-blue-500 hover:underline">
                        Raj Dwivedi
                      </a>, Fullstack Developer, builds reliable and scalable solutions.
                      <a href="https://www.linkedin.com/in/gagan-deep-singh-666158238/" target="_blank" rel="noopener noreferrer"
                         className="font-bold text-blue-500 hover:underline">
                        Gagandeep Singh
                      </a>, Fullstack Developer, ensures seamless app functionality.
                      <a href="https://linkedin.com/in/ankitbose904" target="_blank" rel="noopener noreferrer"
                         className="font-bold text-blue-500 hover:underline">
                        Ankit Bose
                      </a>, UI/UX Designer, crafts intuitive user experiences. Finally,
                      <a href="https://linkedin.com/in/arqam365" target="_blank" rel="noopener noreferrer"
                         className="font-bold text-blue-500 hover:underline">
                        Arqam Ahmad Siddiqui
                      </a>, Mobile Fullstack Developer, drives mobile app development with expertise.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-8 flex-1">
                  <div>
                    <h3 className="font-semibold leading-[150%] text-2xl">Find Us On Internet</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {socials.map((social, index) => (
                        <p key={index}>
                          {social.mailto ? (
                              <a href={social.mailto} className="text-gray-500">
                                {social.name}
                              </a>
                          ) : (
                              <Link href={social.link} className="underline hover:underline">
                                {social.name}
                              </Link>
                          )}
                        </p>
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}