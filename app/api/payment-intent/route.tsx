import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2024-12-18.acacia", // Use a valid API version
});

interface PaymentRequest {
  amount: number;
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as PaymentRequest;
    if (
      typeof data.amount !== "number" ||
      isNaN(data.amount) ||
      data.amount <= 0
    ) {
      throw new Error(
        "Invalid or missing 'amount'. It must be a positive number."
      );
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount * 100, // Convert dollars to cents
      currency: "usd",
    });

    // Log success
    console.log("Payment intent created:", paymentIntent.id);

    // Return the client secret
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message, type: error.type },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
