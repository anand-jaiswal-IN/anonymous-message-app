import { VerificationEmailTemplate } from "./emails/verificationEmailTemplate";
import ApiResponse, {
  ErrorResponse,
  SuccessResponse,
} from "@/types/ApiResponse";
import { getTransport } from "./emailService";

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationCode(
  sender_email: string,
  username: string,
  code: string,
): Promise<ApiResponse> {
  try {
    const transport = await getTransport();
    const mailOptions = {
      from: `${process.env.NEXT_PUBLIC_APP_NAME} <${process.env.NEXT_PUBLIC_APP_EMAIL}>`,
      to: sender_email,
      subject: "Verification Code",
      html: (await VerificationEmailTemplate({ username, code })) as string,
    };
    const result = await transport.sendMail(mailOptions);
    return SuccessResponse("Email sent successfully", result);
  } catch (error) {
    console.error(error);
    return ErrorResponse("Error sending email", error);
  }
}

export default sendVerificationCode;
