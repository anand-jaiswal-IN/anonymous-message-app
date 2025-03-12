import type { NextApiRequest, NextApiResponse } from "next";
import { VerificationEmailTemplate } from "./emails/verificationEmailTemplate";
import resend from "./emailService";
import ApiResponse, {
  ErrorResponse,
  SuccessResponse,
} from "@/types/ApiResponse";

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationCode(
  sender_email: string,
  username: string,
  code: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: sender_email,
      subject: "Verification Code",
      react: await VerificationEmailTemplate({ username, code }),
    });
    return SuccessResponse("Email sent successfully", data);
  } catch (error) {
    return ErrorResponse("Error sending email", error);
  }
}

export default sendVerificationCode;
