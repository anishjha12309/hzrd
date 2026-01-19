import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    // Check if secret key is configured
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keySecret === "YOUR_KEY_SECRET_HERE") {
      // Return mock order for testing when secret is not configured
      console.warn("Razorpay secret not configured - using mock order");
      return NextResponse.json({
        success: true,
        order: {
          id: `order_mock_${Date.now()}`,
          amount: amount * 100,
          currency,
          receipt: receipt || `receipt_${Date.now()}`,
          status: "created",
        },
        isMock: true,
      });
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Create order options
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1, // Auto capture
    };

    // Create order
    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to create order",
        details: error.error?.description || "Unknown error"
      },
      { status: 500 }
    );
  }
}
