"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const PRODUCTS = [
  { id: 1, name: "ACID WASH CARGO", price: "₹ 2,499", image: "/images/p_cargo.png" },
  { id: 2, name: "OVERSIZED GRAFFITI TEE", price: "₹ 2,499", image: "/images/p_tee.png" },
  { id: 3, name: "TECHNICAL VEST", price: "₹ 2,499", image: "/images/p_vest.png" },
  { id: 4, name: "TECHNICAL CARGO", price: "₹ 2,499", image: "/images/p_redcargo.png" },
]

export function ProductGrid() {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#F4F4F0] border-b-2 border-black">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter text-black">
          Current Rotation
        </h2>
        <div className="hidden md:block text-xl font-bold tracking-widest">[ 04 ITEMS ]</div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <motion.div 
             key={product.id}
             whileHover={{ y: -10 }}
             transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="rounded-none border-2 border-black bg-white overflow-hidden group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
              <CardContent className="p-0 relative aspect-[3/4] overflow-hidden">
                 <Image 
                   src={product.image} 
                   alt={product.name} 
                   fill 
                   className="object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 
                 {/* Quick Cop Overlay */}
                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Button 
                      className="rounded-none bg-white text-black hover:bg-black hover:text-white font-bold tracking-widest uppercase border-2 border-black"
                      onClick={() => toast.success(`Added ${product.name} to cart`)}
                    >
                      Quick Cop
                    </Button>
                 </div>
              </CardContent>
              <CardFooter className="flex-col items-start p-4 border-t-2 border-black bg-white relative z-10">
                 <div className="w-full flex justify-between items-start mb-2">
                   <h3 className="font-bold font-heading text-lg md:text-xl uppercase leading-none">{product.name}</h3>
                 </div>
                 <p className="font-mono font-medium text-gray-600">{product.price}</p>
                 <Button className="w-full mt-4 rounded-none bg-black text-white group-hover:bg-red-600 font-bold uppercase tracking-wider md:hidden">
                    Quick Cop
                 </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
