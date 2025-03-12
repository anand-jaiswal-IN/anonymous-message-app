import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { ErrorResponse, SuccessResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    if (!username && !code) {
      return Response.json(ErrorResponse("Username and code are required"), {
        status: 400,
      });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(ErrorResponse("User not found"), {
        status: 404,
      });
    }

    if (user.isVerified) {
      return Response.json(ErrorResponse("User is already verified"), {
        status: 400,
      });
    }

    if (user.verifyCode !== code) {
      return Response.json(ErrorResponse("Invalid code"), {
        status: 400,
      });
    }

    user.isVerified = true;
    user.verifyCode = "";
    await user.save();

    return Response.json(SuccessResponse("User verified successfully"), {
      status: 200,
    });
  } catch (error: unknown) {
    return Response.json(ErrorResponse("Something went wrong : ", error), {
      status: 500,
    });
  }
}
