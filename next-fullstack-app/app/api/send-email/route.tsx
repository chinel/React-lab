import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

//The Resend is a class so we have to create a new instance of it
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "XXXXXXXXXXXXXXXXXXXXX", // The from has to be from an email that belongs to a domain name that you own and you have to add the domain name to the resend dashboard under domain and in the process add some DNS records
    to: "XXXXXXXXXXXXXXXX",
    subject: "Hello World",
    react: <WelcomeTemplate name="Ann" />, // this is the react email component to use
    // html: "<strong>It works!</strong>",
  });

  return NextResponse.json({ message: "Email sent" }, { status: 200 });
}
