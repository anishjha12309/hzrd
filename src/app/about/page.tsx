import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "About | HZRD",
  description: "HZRD - Defining the grey area between black and white. Industrial manufacturing meets luxury streetwear.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-24 md:py-32">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                Est. 2024
              </span>
              <h1 className="font-heading text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.85]">
                About
                <br />
                <span className="text-gray-300">HZRD</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                01 / Philosophy
              </span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="font-sans text-2xl md:text-3xl leading-relaxed text-gray-700 max-w-3xl">
                "Defining the grey area between black and white as the color Off-White."
              </p>
              <p className="font-sans text-base md:text-lg text-gray-500 mt-8 max-w-2xl leading-relaxed">
                HZRD was born from the intersection of industrial manufacturing and luxury streetwear. 
                We believe in the power of monochrome, the beauty of brutalist design, and the confidence 
                that comes from wearing something intentionally crafted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-[#F5F5F5] border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-16">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                02 / Values
              </span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-tighter">
                What We Stand For
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-gray-200">
              <span className="font-mono text-6xl text-gray-200 block mb-4">01</span>
              <h3 className="font-heading text-xl uppercase tracking-tight mb-4">Quality Over Quantity</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Every piece is made with premium materials. 400gsm cotton, metal hardware, 
                and attention to every stitch.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-200">
              <span className="font-mono text-6xl text-gray-200 block mb-4">02</span>
              <h3 className="font-heading text-xl uppercase tracking-tight mb-4">Limited Editions</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                We produce in small batches. Once it's gone, it's gone. This is not fast fashion.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-200">
              <span className="font-mono text-6xl text-gray-200 block mb-4">03</span>
              <h3 className="font-heading text-xl uppercase tracking-tight mb-4">Made for the Bold</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Our designs are for those who define their own rules. Statement pieces for confident individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-6xl uppercase tracking-tighter mb-6">
            Get in Touch
          </h2>
          <p className="font-sans text-gray-500 mb-8 max-w-md mx-auto">
            Have questions about our products or want to collaborate? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-4 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
