import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature"); // or headers().get("Stripe-Signature") as String

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }
  }
}
