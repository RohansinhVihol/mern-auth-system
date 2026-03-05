import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
   try {
      await resend.emails.send({
         from: "MERN Auth <onboarding@resend.dev>",
         to,
         subject,
         html
      });
   } catch (error) {
      throw new Error("Email send failed");
   }
};