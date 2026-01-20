import Marquee from "react-fast-marquee";

export function Ticker() {
  return (
    <div className="bg-black text-white py-3 border-b border-white/10 uppercase text-sm md:text-base tracking-[0.2em] font-bold z-30 relative">
      <Marquee gradient={false} speed={80} className="overflow-hidden">
        <span className="mx-12 font-heading">WARNING: HEAVY TRAFFIC</span>
        <span className="mx-12">///</span>
        <span className="mx-12 font-heading">SECURE THE BAG</span>
        <span className="mx-12">///</span>
        <span className="mx-12 font-heading">DO NOT TOUCH THE ART</span>
        <span className="mx-12">///</span>
        <span className="mx-12 font-heading">HZRD™ GLOBAL DISTRIBUTION</span>
        <span className="mx-12">///</span>
        <span className="mx-12 font-heading">EST. 2026 // NEW DELHI</span>
        <span className="mx-12">///</span>
      </Marquee>
    </div>
  )
}
