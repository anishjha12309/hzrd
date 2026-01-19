import Image from 'next/image'

export function Editorial() {
  return (
     <section className="bg-[#111] text-white relative border-t-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
           {/* Left/Top text heavy */}
           <div className="p-8 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r-2 border-black relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
              <h2 className="text-6xl md:text-8xl font-black font-heading uppercase leading-[0.85] mb-8 relative z-10">
                Streets<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Of India</span>
              </h2>
              <div className="font-mono text-sm md:text-lg opacity-80 max-w-md relative z-10 space-y-6">
                 <p className="border-l-2 border-white pl-4">
                 &quot;OWN YOUR CHAOS&quot;
                 </p> 
                 <p>
                 From the crowded lanes of Mumbai to the underground rave scenes of Bangalore. HZRD is not just clothing; it&apos;s the uniform of the new rebellion.
                 </p>
                 <button className="px-8 py-3 border border-white uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                    Read The Story
                 </button>
              </div>
           </div>
           
           {/* Right Image Grid */}
           <div className="grid grid-cols-2 grid-rows-2 h-[60vh] md:h-auto border-black">
              <div className="relative border-r-2 border-b-2 border-black group overflow-hidden">
                 <Image 
                    src="/images/ed_street.png" 
                    alt="Street" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-all duration-700" 
                 />
              </div>
              <div className="relative border-b-2 border-black group overflow-hidden">
                 <Image 
                    src="/images/ed_chaos.png" 
                    alt="Chaos" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-all duration-700" 
                 />
              </div>
              <div className="relative border-r-2 border-black group overflow-hidden">
                 <Image 
                    src="/images/ed_portrait.png" 
                    alt="Portrait" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-all duration-700" 
                 />
              </div>
              <div className="relative flex flex-col items-center justify-center p-6 bg-red-600 text-black group hover:bg-white transition-colors cursor-pointer">
                  <div className="text-center">
                     <div className="text-2xl md:text-4xl font-heading font-black mb-1 uppercase">Urban</div>
                     <div className="text-2xl md:text-4xl font-heading font-black text-transparent" style={{ WebkitTextStroke: '1px black' }}>Uniform</div>
                  </div>
                  <div className="mt-4 font-mono text-xs uppercase tracking-widest border-b border-black group-hover:border-black/50 pb-1">
                     View Lookbook
                  </div>
              </div>
           </div>
        </div>
     </section>
  )
}
