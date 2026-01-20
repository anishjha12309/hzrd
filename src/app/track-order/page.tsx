"use client";

import { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, MapPin, Clock, Search, Box, ShoppingBag } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useOrderStore, Order } from "@/store/order-store";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const getOrderByNumber = useOrderStore((state) => state.getOrderByNumber);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      setOrder(null);
      return;
    }
    
    const foundOrder = getOrderByNumber(orderNumber.trim());
    if (foundOrder) {
      setOrder(foundOrder);
      setError("");
    } else {
      setOrder(null);
      setError("Order not found. Please check your order number and try again.");
    }
  };

  // Generate timeline based on order status
  const getTimeline = (order: Order) => {
    const orderDate = new Date(order.orderDate);
    const formatDate = (date: Date) => date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
    const formatTime = (date: Date) => date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

    // Calculate estimated dates
    const processingDate = new Date(orderDate);
    processingDate.setHours(processingDate.getHours() + 2);
    
    const shippedDate = new Date(orderDate);
    shippedDate.setDate(shippedDate.getDate() + 1);
    
    const transitDate = new Date(orderDate);
    transitDate.setDate(transitDate.getDate() + 2);
    
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const statusOrder = ["processing", "shipped", "in_transit", "delivered"];
    const currentIndex = statusOrder.indexOf(order.status);

    return [
      {
        id: 1,
        status: "Order Placed",
        description: "Order confirmed and payment received",
        date: formatDate(orderDate),
        time: formatTime(orderDate),
        location: "Online",
        completed: true,
        current: currentIndex === 0,
      },
      {
        id: 2,
        status: "Processing",
        description: "Package being prepared at warehouse",
        date: formatDate(processingDate),
        time: formatTime(processingDate),
        location: "HZRD Warehouse, Delhi",
        completed: currentIndex >= 0,
        current: currentIndex === 0,
      },
      {
        id: 3,
        status: "Shipped",
        description: "Handed to courier partner",
        date: currentIndex >= 1 ? formatDate(shippedDate) : `Est. ${formatDate(shippedDate)}`,
        time: currentIndex >= 1 ? formatTime(shippedDate) : "",
        location: "Delhi Hub",
        completed: currentIndex >= 1,
        current: currentIndex === 1,
      },
      {
        id: 4,
        status: "In Transit",
        description: "Package is on its way",
        date: currentIndex >= 2 ? formatDate(transitDate) : `Est. ${formatDate(transitDate)}`,
        time: currentIndex >= 2 ? formatTime(transitDate) : "",
        location: "Sorting Facility",
        completed: currentIndex >= 2,
        current: currentIndex === 2,
      },
      {
        id: 5,
        status: "Delivered",
        description: "Package delivered",
        date: currentIndex >= 3 ? formatDate(deliveryDate) : `Est. ${formatDate(deliveryDate)}`,
        time: currentIndex >= 3 ? formatTime(deliveryDate) : "",
        location: "Your Address",
        completed: currentIndex >= 3,
        current: currentIndex === 3,
      },
    ];
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
      case "Delivered":
        return CheckCircle;
      default:
        return Package;
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "processing": return "Processing";
      case "shipped": return "Shipped";
      case "in_transit": return "In Transit";
      case "delivered": return "Delivered";
      default: return status;
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
                  placeholder="Enter order number (e.g., HZRD-XXXXXXXX)"
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
          </div>
        </div>
      </section>

      {/* Order Result */}
      {mounted && order && (
        <>
          {/* Status Banner */}
          <section className="bg-black text-white py-6">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    {order.status === "delivered" ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Truck className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="font-heading text-xl uppercase tracking-tight">
                      {getStatusLabel(order.status)}
                    </p>
                    <p className="font-mono text-xs text-gray-400 mt-0.5">
                      Order: {order.orderNumber}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-gray-400">
                    Order Total
                  </p>
                  <p className="font-mono text-lg">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Order Items */}
          <section className="py-8 border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto">
                <h3 className="font-heading text-lg uppercase tracking-tight mb-6">
                  Items Ordered
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-gray-50 border border-gray-100">
                      <div className="w-20 h-24 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-sans font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-1 uppercase">
                            Size: {item.size} / Color: {item.color}
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="font-mono text-xs text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-mono text-sm">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-mono">₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span className="font-mono">-₹{order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-mono">
                      {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="font-mono">₹{order.total.toLocaleString()}</span>
                  </div>
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
                  {getTimeline(order).map((event, index) => {
                    const Icon = getStatusIcon(event.status);
                    const timeline = getTimeline(order);
                    const isLast = index === timeline.length - 1;

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
                                {event.date} {event.time && `• ${event.time}`}
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
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="font-sans text-sm text-gray-700">
                    {order.shippingAddress.address}, {order.shippingAddress.city}
                  </p>
                  <p className="font-sans text-sm text-gray-700">
                    {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <p className="font-mono text-xs text-gray-500 mt-2">
                    {order.customer.phone} • {order.customer.email}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Order Date */}
          <section className="py-4 border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl mx-auto flex items-center gap-4">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    Order placed on {new Date(order.orderDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
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
