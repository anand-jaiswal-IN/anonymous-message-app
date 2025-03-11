import dbConnect from "@/lib/dbConnect";
import { Message } from "@/models/Message.model";
import messageSchema from "@/schemas/messageSchema";
import UserModel from "@/models/User.model";
import { ErrorResponse, SuccessResponse } from "@/types/ApiResponse";

export async function POST(req: Request) {
  await dbConnect();

  try {
    // getting the username and message from the body
    const { username, message } = await req.json();
    console.log(username, message);
    if (!username || !message) {
      return Response.json(ErrorResponse("Username and message are required"), {
        status: 400,
      });
    }

    // put validation on message
    const validation = messageSchema.safeParse({ message });
    if (!validation.success) {
      return Response.json(
        ErrorResponse(
          validation.error.format().message?._errors.join(", ") ||
            "Validation error"
        ),
        {
          status: 400,
        }
      );
    }

    // check if user exists and verified or not
    const user = await UserModel.findOne({ username });
    if (!user || !user.isVerified) {
      return Response.json(ErrorResponse("User not found"), {
        status: 404,
      });
    }

    // if everything is fine then push the message into the messages array of user
    user.messages.push({ message } as Message);
    await user.save();
    return Response.json(SuccessResponse("Message sent successfully"), {
      status: 200,
    });
  } catch (error) {
    return Response.json(ErrorResponse("Error sending message"), {
      status: 500,
    });
  }
}

// /send-message/user/username
