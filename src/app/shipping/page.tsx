import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Shipping & Returns | HZRD",
  description: "HZRD shipping information, delivery times, and return policy.",
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                Policies
              </span>
              <h1 className="font-heading text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Shipping & Returns
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="py-16 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                01
              </span>
              <h2 className="font-heading text-3xl uppercase tracking-tighter">
                Shipping
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 space-y-8">
              <div>
                <h3 className="font-sans font-medium text-lg mb-3">Domestic Shipping (India)</h3>
                <ul className="space-y-2 font-sans text-gray-600">
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span>Metro Cities (Mumbai, Delhi, Bangalore, etc.)</span>
                    <span className="font-mono text-sm">3-5 days</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span>Tier 2 Cities</span>
                    <span className="font-mono text-sm">5-7 days</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span>Other Locations</span>
                    <span className="font-mono text-sm">7-10 days</span>
                  </li>
                </ul>
                <p className="font-sans text-sm text-gray-500 mt-4">
                  Free shipping on all orders above ₹1,500. Standard shipping: ₹99.
                </p>
              </div>

              <div>
                <h3 className="font-sans font-medium text-lg mb-3">International Shipping</h3>
                <ul className="space-y-2 font-sans text-gray-600">
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span>USA, UK, Europe</span>
                    <span className="font-mono text-sm">10-14 days</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span>UAE, Singapore, Australia</span>
                    <span className="font-mono text-sm">7-12 days</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span>Rest of World</span>
                    <span className="font-mono text-sm">14-21 days</span>
                  </li>
                </ul>
                <p className="font-sans text-sm text-gray-500 mt-4">
                  International shipping starts at ₹999. Customs duties and taxes are the responsibility of the customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Returns Section */}
      <section className="py-16 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                02
              </span>
              <h2 className="font-heading text-3xl uppercase tracking-tighter">
                Returns
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 space-y-6">
              <div className="p-6 bg-[#F5F5F5] border border-gray-200">
                <h3 className="font-heading text-xl uppercase mb-3">14-Day Return Window</h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Not happy with your purchase? We accept returns within 14 days of delivery. 
                  Items must be unworn, unwashed, and in original packaging with all tags attached.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-sans font-medium text-lg">Return Conditions</h3>
                <ul className="space-y-3 font-sans text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    Item must be unworn and unwashed
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    Original tags must be attached
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    Original packaging required
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    Sale items are final sale
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    Accessories (rings, chains) cannot be returned for hygiene reasons
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-sans font-medium text-lg mb-3">Refund Process</h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Once we receive and inspect your return, refunds will be processed within 5-7 business days. 
                  The refund will be credited to your original payment method. Shipping costs are non-refundable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                03
              </span>
              <h2 className="font-heading text-3xl uppercase tracking-tighter">
                Exchanges
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="font-sans text-gray-600 leading-relaxed mb-6">
                Need a different size? We offer free exchanges for size swaps within India. 
                Simply contact us within 14 days of delivery, and we'll arrange the pickup and 
                send your new size at no additional cost.
              </p>
              <p className="font-sans text-gray-600 leading-relaxed">
                For international orders, we recommend returning the item for a refund and 
                placing a new order for the correct size.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-block bg-black text-white px-8 py-4 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                >
                  Request Exchange
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
