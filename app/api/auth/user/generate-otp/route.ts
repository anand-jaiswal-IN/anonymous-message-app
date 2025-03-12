import sendVerificationCode, {
  generateCode,
} from "@/helpers/sendVerificationCode";
import dbConnect from "@/lib/dbConnect";
import { ErrorResponse, SuccessResponse } from "@/types/ApiResponse";
import UserModel from "@/models/User.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username } = await request.json();
    if (!username) {
      return Response.json(ErrorResponse("Username is required"), {
        status: 400,
      });
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(ErrorResponse("User not found"), {
        status: 404,
      });
    }
    // send response if user is already verified
    if (user.isVerified) {
      return Response.json(ErrorResponse("User is already verified"), {
        status: 400,
      });
    }
    // if user is not verified then send otp to the email
    const code = generateCode();
    const messageResponse = await sendVerificationCode(
      user.email,
      user.username,
      code
    );

    if (!messageResponse.success) {
      return Response.json(messageResponse, {
        status: 400,
      });
    }

    // set code in database and send response
    user.verifyCode = code;
    await user.save();
    return Response.json(SuccessResponse("OTP sent successfully"), {
      status: 200,
    });
  } catch (error) {
    return Response.json(ErrorResponse("Something went wrong : ", error), {
      status: 500,
    });
  }
}
