"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle, MapPin, Clock, Search, Box } from "lucide-react";
import { Footer } from "@/components/layout/footer";

// Mock tracking data
const MOCK_TRACKING = {
  orderNumber: "HZRD-K7M2X9LP",
  status: "in_transit",
  carrier: "BlueDart Express",
  trackingNumber: "BD987654321IN",
  estimatedDelivery: "January 25, 2026",
  shippingAddress: "456 Connaught Place, New Delhi, Delhi 110001",
  timeline: [
    {
      id: 1,
      status: "Order Placed",
      description: "Order confirmed and payment received",
      date: "Jan 19, 2026",
      time: "9:00 PM",
      location: "Online",
      completed: true,
    },
    {
      id: 2,
      status: "Processing",
      description: "Package being prepared",
      date: "Jan 20, 2026",
      time: "10:30 AM",
      location: "HZRD Warehouse, Delhi",
      completed: true,
    },
    {
      id: 3,
      status: "Shipped",
      description: "Handed to courier partner",
      date: "Jan 20, 2026",
      time: "4:00 PM",
      location: "Delhi Hub",
      completed: true,
    },
    {
      id: 4,
      status: "In Transit",
      description: "Package is on its way",
      date: "Jan 21, 2026",
      time: "8:00 AM",
      location: "Delhi Sorting Facility",
      completed: true,
      current: true,
    },
    {
      id: 5,
      status: "Out for Delivery",
      description: "With delivery agent",
      date: "Jan 25, 2026",
      time: "9:00 AM",
      location: "Local Hub",
      completed: false,
    },
    {
      id: 6,
      status: "Delivered",
      description: "Package delivered",
      date: "Jan 25, 2026",
      time: "By 8:00 PM",
      location: "Your Address",
      completed: false,
    },
  ],
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [tracking, setTracking] = useState<typeof MOCK_TRACKING | null>(null);
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }
    // Mock tracking - in real app, would fetch from API
    setTracking(MOCK_TRACKING);
    setError("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Order Placed":
        return CheckCircle;
      case "Processing":
        return Box;
      case "Shipped":
        return Package;
      case "In Transit":
        return Truck;
      case "Out for Delivery":
        return Truck;
      case "Delivered":
        return CheckCircle;
      default:
        return Package;
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
            Order Tracking
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
            Track Your Order
          </h1>
        </div>
      </section>

      {/* Track Form */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleTrack} className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter order number"
                  className="w-full border-2 border-gray-200 focus:border-black pl-12 pr-4 py-4 font-mono text-sm outline-none transition-colors uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
              >
                Track
              </button>
            </form>
            {error && (
              <p className="text-red-500 font-mono text-sm mt-3">{error}</p>
            )}
            <p className="font-mono text-xs text-gray-400 mt-3 text-center">
              Enter any text to see a demo result
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Result */}
      {tracking && (
        <>
          {/* Status Banner */}
          <section className="bg-black text-white py-6">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-heading text-xl uppercase tracking-tight">
                      In Transit
                    </p>
                    <p className="font-mono text-xs text-gray-400 mt-0.5">
                      Est. delivery: {tracking.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-gray-400">
                    {tracking.carrier}
                  </p>
                  <p className="font-mono text-sm">
                    {tracking.trackingNumber}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl mx-auto">
                <h3 className="font-heading text-lg uppercase tracking-tight mb-8">
                  Shipment Progress
                </h3>

                <div className="relative">
                  {tracking.timeline.map((event, index) => {
                    const Icon = getStatusIcon(event.status);
                    const isLast = index === tracking.timeline.length - 1;

                    return (
                      <div key={event.id} className="relative flex gap-5">
                        {/* Timeline Column */}
                        <div className="flex flex-col items-center">
                          {/* Icon Circle */}
                          <div
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                              event.current
                                ? "bg-blue-600 border-blue-600 text-white scale-110"
                                : event.completed
                                ? "bg-green-500 border-green-500 text-white"
                                : "bg-white border-gray-200 text-gray-300"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Connecting Line */}
                          {!isLast && (
                            <div
                              className={`w-0.5 flex-1 min-h-[60px] ${
                                event.completed && !event.current
                                  ? "bg-green-500"
                                  : event.current
                                  ? "bg-gradient-to-b from-blue-600 to-gray-200"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pb-6 ${isLast ? "pb-0" : ""}`}>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                            <div>
                              <h4
                                className={`font-heading text-sm uppercase tracking-tight ${
                                  event.completed || event.current
                                    ? "text-black"
                                    : "text-gray-400"
                                }`}
                              >
                                {event.status}
                                {event.current && (
                                  <span className="ml-2 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-mono normal-case">
                                    Current
                                  </span>
                                )}
                              </h4>
                              <p
                                className={`font-sans text-sm mt-0.5 ${
                                  event.completed || event.current
                                    ? "text-gray-600"
                                    : "text-gray-400"
                                }`}
                              >
                                {event.description}
                              </p>
                            </div>
                            <div className="text-left md:text-right mt-1 md:mt-0">
                              <p
                                className={`font-mono text-xs ${
                                  event.completed || event.current
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {event.date} • {event.time}
                              </p>
                              <p
                                className={`font-mono text-xs ${
                                  event.completed || event.current
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Address */}
          <section className="py-6 bg-[#F5F5F5] border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl mx-auto flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-1">
                    Delivery Address
                  </span>
                  <p className="font-sans text-sm text-gray-700">
                    {tracking.shippingAddress}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Help Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-xl md:text-2xl uppercase tracking-tighter mb-3">
            Need Help?
          </h2>
          <p className="font-sans text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            Questions about your order? Our support team is here for you.
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
