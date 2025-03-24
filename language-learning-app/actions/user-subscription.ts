"use server";
import { getUserSubscription } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await getUserSubscription();

  if (userSubscription && userSubscription?.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: returnUrl,
    cancel_url: returnUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "Language Learning App Pro",
            description: "Unlimited hearts",
          },
          unit_amount: 2000, // this is same as $20
          recurring: {
            interval: "month",
          },
          product: process.env.STRIPE_PRODUCT_ID,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
  });

  return { data: stripeSession.url };
};
