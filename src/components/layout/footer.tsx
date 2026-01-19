
export function Footer() {
  return (
    <footer className="bg-[#EAEAE5] text-black border-t-2 border-black">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-2 border-black">
         <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r-2 border-black flex flex-col justify-between">
            <h3 className="font-heading font-black text-2xl uppercase mb-4">Help</h3>
            <ul className="space-y-2 font-mono text-sm uppercase tracking-wide">
              <li><a href="/shipping" className="hover:underline">Shipping</a></li>
              <li><a href="/shipping" className="hover:underline">Returns</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
              <li><a href="/track-order" className="hover:underline">Track Order</a></li>
            </ul>
         </div>
         <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r-2 border-black flex flex-col justify-between">
            <h3 className="font-heading font-black text-2xl uppercase mb-4">Company</h3>
            <ul className="space-y-2 font-mono text-sm uppercase tracking-wide">
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/size-guide" className="hover:underline">Size Guide</a></li>
            </ul>
         </div>
         <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-between">
            <h3 className="font-heading font-black text-2xl uppercase mb-4">Social</h3>
            <ul className="space-y-2 font-mono text-sm uppercase tracking-wide">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">TikTok</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
            </ul>
         </div>
         <div className="p-8 md:p-12 bg-black text-white flex flex-col justify-center">
            <h3 className="font-heading font-black text-3xl uppercase mb-4">Join the Movement</h3>
            <p className="mb-4 font-mono text-sm opacity-70">Enter your email for drop notifications.</p>
            <div className="flex border border-white/30">
               <input type="email" placeholder="EMAIL" className="bg-transparent w-full p-3 font-mono text-white placeholder:text-gray-500 outline-none uppercase" />
               <button className="bg-white text-black px-6 font-bold uppercase hover:bg-gray-200 transition-colors">→</button>
            </div>
         </div>
      </div>
      
      {/* Bottom Section */}
      <div className="p-4 md:p-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-bold uppercase tracking-widest opacity-60">
         <div>© 2026 HZRD. All Rights Reserved.</div>
         <div className="mt-2 md:mt-0 font-heading text-xl">HZRD</div>
      </div>
    </footer>
  )
}
