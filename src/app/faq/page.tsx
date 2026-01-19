"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Footer } from "@/components/layout/footer";

const FAQ_ITEMS = [
  {
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached. Sale items are final sale and cannot be returned.",
  },
  {
    question: "How long does shipping take?",
    answer: "Domestic orders (India) typically arrive within 5-7 business days. Metro cities may receive orders faster. International shipping takes 10-15 business days depending on destination.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to most countries worldwide. International shipping costs and duties are calculated at checkout. The customer is responsible for any import duties or taxes.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also view order status in your account dashboard.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, Net Banking, and Cash on Delivery (select locations). International orders can be paid via credit card or PayPal.",
  },
  {
    question: "Are your products true to size?",
    answer: "Most of our pieces are designed with an oversized, relaxed fit. We recommend checking our Size Guide for detailed measurements. When in doubt, size down for a more fitted look.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "Orders can be modified or cancelled within 2 hours of placement. After this window, the order enters processing and cannot be changed. Contact us immediately if you need assistance.",
  },
  {
    question: "Do you restock sold-out items?",
    answer: "We produce limited quantities of each design. Some items may be restocked, but we don't guarantee it. Sign up for notifications on product pages to be alerted of restocks.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                Help Center
              </span>
              <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                FAQ
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex items-end">
              <p className="font-sans text-sm text-gray-500 max-w-sm">
                Can't find what you're looking for? Contact us at hello@hzrd.in
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="divide-y divide-gray-200">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center text-left group"
                >
                  <span className="font-sans text-lg md:text-xl font-medium pr-8 group-hover:text-gray-600 transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openIndex === index ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-sans text-gray-500 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#F5F5F5] border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-tighter mb-4">
            Still have questions?
          </h2>
          <p className="font-sans text-gray-500 mb-6">
            Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-4 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
