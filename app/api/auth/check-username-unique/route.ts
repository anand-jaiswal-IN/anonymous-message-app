import mongoose from "mongoose";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { usernameValidation } from "@/schemas/signUpSchema";
import z from "zod";
import { ErrorResponse, SuccessResponse } from "@/types/ApiResponse";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = { username: searchParams.get("username") };

    const validation = usernameQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      return Response.json(
        ErrorResponse(
          validation.error.format().username?._errors.join(", ") ||
            "Validation error"
        ),
        {
          status: 400,
        }
      );
    }

    const user = await UserModel.findOne({
      username: validation.data.username,
    });

    if (user) {
      return Response.json(
        SuccessResponse("Username exist", { isUnique: true }),
        { status: 200 }
      );
    } else {
      return Response.json(
        SuccessResponse("Username does not exist", { isUnique: true }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(ErrorResponse("Error checking username"), {
      status: 500,
    });
  }
}
