"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");

  // Use orderId from URL as order number (it's already the real order number)
  const [orderNumber, setOrderNumber] = useState("HZRD-XXXXXXXX");
  const [formattedDeliveryDate, setFormattedDeliveryDate] = useState("Loading...");

  useEffect(() => {
    // Use orderId from URL if available, otherwise generate placeholder
    if (orderId) {
      setOrderNumber(orderId);
    }
    
    // Calculate delivery date on client only
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 6);
    setFormattedDeliveryDate(deliveryDate.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }));
  }, [orderId]);

  const steps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your payment was successful",
      time: "Just now",
      completed: true,
      current: true,
      icon: CheckCircle,
    },
    {
      id: 2,
      title: "Processing",
      description: "Preparing your order",
      time: "Est. 1-2 hours",
      completed: false,
      current: false,
      icon: Package,
    },
    {
      id: 3,
      title: "Shipped",
      description: "On the way to you",
      time: "Est. 2-3 days",
      completed: false,
      current: false,
      icon: Truck,
    },
    {
      id: 4,
      title: "Delivered",
      description: "At your doorstep",
      time: formattedDeliveryDate,
      completed: false,
      current: false,
      icon: Home,
    },
  ];

  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Success Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          {/* Success Animation */}
          <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3">
            Payment Successful
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
            Thank You!
          </h1>
          <p className="font-sans text-gray-500 max-w-md mx-auto">
            Your order has been confirmed. You'll receive an email confirmation shortly.
          </p>
        </div>
      </section>

      {/* Order Info Cards */}
      <section className="pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
            <div className="bg-[#F5F5F5] p-5 border border-gray-200">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                Order Number
              </span>
              <p className="font-heading text-lg uppercase tracking-tight">
                {orderNumber}
              </p>
            </div>
            <div className="bg-[#F5F5F5] p-5 border border-gray-200">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                Estimated Delivery
              </span>
              <p className="font-sans text-sm font-medium">
                {formattedDeliveryDate.split(",")[0]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Timeline */}
      <section className="py-12 bg-[#FAFAFA] border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-xl uppercase tracking-tighter mb-8 text-center">
              Order Status
            </h2>

            {/* Timeline */}
            <div className="relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={step.id} className="relative flex gap-6">
                    {/* Timeline Line & Dot */}
                    <div className="flex flex-col items-center">
                      {/* Dot/Icon */}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                          step.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : step.current
                            ? "bg-black border-black text-white"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Connecting Line */}
                      {!isLast && (
                        <div
                          className={`w-0.5 h-16 ${
                            step.completed ? "bg-green-500" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                      <h3
                        className={`font-heading text-base uppercase tracking-tight ${
                          step.completed || step.current
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`font-sans text-sm mt-0.5 ${
                          step.completed || step.current
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                      <span
                        className={`font-mono text-xs mt-1 block ${
                          step.completed
                            ? "text-green-600"
                            : step.current
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      >
                        {step.completed ? "✓ Completed" : step.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Details */}
      {paymentId && (
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Payment ID: {paymentId}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-tighter mb-4">
            Continue Exploring
          </h2>
          <p className="font-sans text-gray-400 mb-8 max-w-sm mx-auto text-sm">
            Check out more limited editions while you wait for your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-heading uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
            >
              Shop More
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/track-order"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-4 font-heading uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
            >
              Track Order
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
