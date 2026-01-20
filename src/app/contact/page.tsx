"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Support" },
  { value: "wholesale", label: "Wholesale" },
  { value: "collaboration", label: "Collaboration" },
  { value: "press", label: "Press" },
];

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

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
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
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
                      required
                      className="w-full border-b-2 border-gray-200 focus:border-black py-4 font-sans text-lg outline-none transition-colors bg-transparent placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                    Subject
                  </label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="w-full border-0 border-b-2 border-gray-200 rounded-none focus:border-black py-6 font-sans text-lg bg-transparent shadow-none focus:ring-0 h-auto px-0">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {SUBJECTS.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="font-sans text-base py-3 px-4 cursor-pointer hover:bg-gray-50 focus:bg-gray-100"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell us what's on your mind..."
                    className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans text-lg outline-none transition-colors bg-transparent placeholder:text-gray-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-12 py-4 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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
