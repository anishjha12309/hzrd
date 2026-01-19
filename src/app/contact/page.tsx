import { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with HZRD. Customer support, wholesale inquiries, press, and collaborations. Based in Delhi, India.",
  keywords: [
    "contact HZRD",
    "streetwear customer support",
    "wholesale inquiry",
    "fashion collaboration",
  ],
  openGraph: {
    title: "Contact | HZRD",
    description: "Get in touch with our team.",
  },
  alternates: {
    canonical: "https://hzrd.store/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                Get in Touch
              </span>
              <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Contact
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            {/* Contact Info */}
            <div className="col-span-12 md:col-span-4">
              <div className="space-y-12">
                <div>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                    Email
                  </span>
                  <a href="mailto:hello@hzrd.in" className="font-sans text-lg hover:underline">
                    hello@hzrd.in
                  </a>
                </div>
                <div>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                    Phone
                  </span>
                  <a href="tel:+919876543210" className="font-sans text-lg hover:underline">
                    +91 98765 43210
                  </a>
                </div>
                <div>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                    Location
                  </span>
                  <p className="font-sans text-lg text-gray-700">
                    Delhi, India
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                    Social
                  </span>
                  <div className="flex gap-6">
                    <a href="#" className="font-sans text-sm uppercase hover:underline">Instagram</a>
                    <a href="#" className="font-sans text-sm uppercase hover:underline">Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-span-12 md:col-span-8">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border-b-2 border-gray-200 focus:border-black py-4 font-sans text-lg outline-none transition-colors bg-transparent placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border-b-2 border-gray-200 focus:border-black py-4 font-sans text-lg outline-none transition-colors bg-transparent placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                    Subject
                  </label>
                  <select className="w-full border-b-2 border-gray-200 focus:border-black py-4 font-sans text-lg outline-none transition-colors bg-transparent">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Wholesale</option>
                    <option>Collaboration</option>
                    <option>Press</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans text-lg outline-none transition-colors bg-transparent placeholder:text-gray-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black text-white px-12 py-4 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
