
export default function Home() {
  return (
    <section id={"welcome"}>
      <div className='flex w-full h-screen flex-col gap-10 relative'>
        <div className="absolute top-0 left-0" >
          <header>
            <h3> SurakshaKawach </h3>
          </header>
        </div>

        <div className="flex flex-col justify-center px-10 items-start" >

          {/* first container */}
          <div className="h-screen w-full flex items-center justify-between " >
            <div className="flex-[0.7]" >
              <h3 className="font-semibold text-[5rem] leading-[110%] tracking-[-0.04rem] " > We create products that work, feel and sell</h3>
            </div>

            <div>
              EMAIL SERVICE
            </div>
          </div>

          {/* Second Container */}
          <div className="flex flex-col gap-28 w-[70%]" >
            <div>
              <p> Meanwhile, here's what we've been up to.</p>
            </div>

            <div className="w-[85%] flex flex-col gap-14 " >


              <div className="flex gap-24" >

                <div className="flex flex-col gap-8" >
                  <div>
                    <h3 className="font-semibold leading-[150%] " > We created a highly differentiated primary care service for Loop Health, which is now a significant revenue channel in just 3 months of launch. </h3>
                  </div>
                  <div>
                    <p>We delivered a trustworthy health checkup as an acquisition channel, reinvented doctor consults to guide instead of prescribe, crafted a digital app that acts as a companion to your entire health journey, and conducted many crazy experiments that made it all possible — like prototyping a clinic with real patients and doctors in 15 days.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-8" >
                  <div>
                    <h3 className="font-semibold leading-[150%] " > We crafted an intuitive self-serve platform for Headout to handle their post-COVID surge.</h3>
                  </div>
                  <div>
                    <p>Headout quickly ramped up supply to meet their demand, and achieved 800% growth in one year, expanding to more continents, becoming EBIDTA profitable and raising a $42M Series B funding.</p>
                  </div>
                </div>

              </div>


              {/* Last PArt */}
              <div className="flex gap-24" >

                <div className="flex flex-col gap-8" >
                  <div>
                    <h3 className="font-semibold leading-[150%] " > We created a highly differentiated primary care service for Loop Health, which is now a significant revenue channel in just 3 months of launch. </h3>
                  </div>
                  <div>
                    <p>We delivered a trustworthy health checkup as an acquisition channel, reinvented doctor consults to guide instead of prescribe, crafted a digital app that acts as a companion to your entire health journey, and conducted many crazy experiments that made it all possible — like prototyping a clinic with real patients and doctors in 15 days.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-8" >
                  <div>
                    <h3 className="font-semibold leading-[150%] " > We crafted an intuitive self-serve platform for Headout to handle their post-COVID surge.</h3>
                  </div>
                  <div>
                    <p>Headout quickly ramped up supply to meet their demand, and achieved 800% growth in one year, expanding to more continents, becoming EBIDTA profitable and raising a $42M Series B funding.</p>
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
