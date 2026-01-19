"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { useCartStore } from "@/store/cart-store";
import { Footer } from "@/components/layout/footer";
import { Loader2, Lock, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 1500 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const required = ["firstName", "lastName", "email", "phone", "address", "city", "state", "pincode"];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order on server
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          receipt: `order_${Date.now()}`,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Check if this is a mock order (secret not configured)
      if (orderData.isMock) {
        toast.success("Demo mode: Simulating successful payment");
        // Simulate payment success in mock mode
        setTimeout(() => {
          clearCart();
          router.push(
            `/order-success?orderId=${orderData.order.id}&paymentId=pay_demo_${Date.now()}`
          );
        }, 1500);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "HZRD",
        description: "Streetwear Purchase",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Clear cart and redirect to success page
            clearCart();
            router.push(
              `/order-success?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}`
            );
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white pt-28">
        <div className="container mx-auto px-4 md:px-8 py-24 text-center">
          <h1 className="font-heading text-4xl md:text-6xl uppercase tracking-tighter mb-6">
            Your Cart is Empty
          </h1>
          <p className="font-sans text-gray-500 mb-8">
            Add some items to your cart to proceed with checkout.
          </p>
          <a
            href="/shop"
            className="inline-block bg-black text-white px-8 py-4 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <main className="min-h-screen bg-white pt-28">
        {/* Hero */}
        <section className="border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-8 py-12">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
              Secure Checkout
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter">
              Checkout
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-16">
              {/* Form Section */}
              <div className="col-span-12 lg:col-span-7">
                {/* Shipping Information */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-5 h-5" />
                    <h2 className="font-heading text-xl uppercase tracking-tight">
                      Shipping Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="9876543210"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="House No, Street, Landmark"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-black p-4 font-sans outline-none transition-colors"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-5 h-5" />
                    <h2 className="font-heading text-xl uppercase tracking-tight">
                      Payment
                    </h2>
                  </div>

                  <div className="p-6 bg-[#F5F5F5] border border-gray-200 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-8 bg-white border border-gray-200 flex items-center justify-center">
                        <span className="font-bold text-blue-600 text-xs">RZP</span>
                      </div>
                      <span className="font-sans text-sm">Razorpay Secure Checkout</span>
                    </div>
                    <p className="font-sans text-sm text-gray-500">
                      Pay securely using Credit/Debit Cards, UPI, Net Banking, or Wallets.
                      Your payment information is encrypted and secure.
                    </p>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-5 font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay ₹{total.toLocaleString()}
                      </>
                    )}
                  </button>

                  <p className="text-center mt-4 font-mono text-xs text-gray-400 flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" />
                    Secured by Razorpay. Test Mode Active.
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-span-12 lg:col-span-5">
                <div className="sticky top-32 bg-[#F5F5F5] p-6 md:p-8 border border-gray-200">
                  <h2 className="font-heading text-xl uppercase tracking-tight mb-6 pb-4 border-b border-gray-300">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
                        <div className="w-20 h-24 bg-white relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover mix-blend-multiply p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-sans text-sm font-medium uppercase leading-tight">
                            {item.name}
                          </h3>
                          <p className="font-mono text-xs text-gray-500 mt-1">
                            {item.color} / {item.size}
                          </p>
                          <p className="font-mono text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-mono text-sm">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="font-mono text-xs text-green-600">
                        ✓ Free shipping on orders above ₹1,500
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between font-heading text-xl uppercase pt-4 border-t border-gray-300">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
