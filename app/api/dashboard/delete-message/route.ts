import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ErrorResponse, SuccessResponse } from "@/types/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !user) {
    return Response.json(ErrorResponse("Unauthorized"), {
      status: 401,
    });
  }
  await dbConnect();

  try {
    const { messageId } = await req.json();
    if (!messageId) {
      return Response.json(ErrorResponse("messageId is required"), {
        status: 400,
      });
    }
    const result = await UserModel.findByIdAndUpdate(
      user.id,
      { $pull: { messages: { _id: messageId } } },
      { new: true } // Returns the updated document
    );

    if (!result) {
      return Response.json(ErrorResponse("Message not found"), {
        status: 404,
      });
    }
    return Response.json(
      SuccessResponse("Message deleted successfully", result),
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    return Response.json(ErrorResponse("Error deleting messages " + error), {
      status: 500,
    });
  }
}
