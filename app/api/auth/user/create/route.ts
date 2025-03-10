import sendVerificationCode, {
  generateCode,
} from "@/helpers/sendVerificationCode";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import signUpSchema from "@/schemas/signUpSchema";
import { SuccessResponse, ErrorResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    // validation check -> all parameters exists in body or not
    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        ErrorResponse("Validation error", validation.error.errors),
        {
          status: 400,
        }
      );
    }
    // check if user already exists
    const oldUser = await UserModel.findOne({
      $or: [
        { email: validation.data.email },
        { username: validation.data.username },
      ],
    });

    if (oldUser) {
      return Response.json(
        ErrorResponse("User already exists with username or email"),
        {
          status: 400,
        }
      );
    }

    // creating new user and send verification email

    const code = generateCode();
    const messageResponse = await sendVerificationCode(
      validation.data.email,
      validation.data.username,
      code
    );

    if (!messageResponse.success) {
      return Response.json(messageResponse, {
        status: 500,
      });
    }
    const user = await UserModel.create({
      firstname: validation.data.firstname,
      lastname: validation.data.lastname,
      username: validation.data.username,
      email: validation.data.email,
      password: await bcrypt.hash(validation.data.password, 10), // set the hashed password
      verifyCode: code,
    });

    return Response.json(SuccessResponse("User created successfully", user), {
      status: 201,
    });
  } catch (error: any) {
    console.error(error?.message || "Error creating user:", error);
    return Response.json(
      ErrorResponse(error?.message || "Error creating user", error),
      {
        status: 500,
      }
    );
  }
}
