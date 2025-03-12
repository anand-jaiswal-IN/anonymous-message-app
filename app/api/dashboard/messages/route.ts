import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ErrorResponse, SuccessResponse } from "@/types/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { Message } from "@/models/Message.model";

export async function GET(_req: Request) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !user) {
    return Response.json(ErrorResponse("Unauthorized"), {
      status: 401,
    });
  }
  await dbConnect();

  try {
    const _user = await UserModel.findById(user.id).select("messages");

    if (!_user) {
      return Response.json(ErrorResponse("User or Messages not found"), {
        status: 404,
      });
    }

    const sortedMessages = _user.messages.sort(
      (a: Message, b: Message) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return Response.json(
      SuccessResponse("Messages accepted successfully", sortedMessages),
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(ErrorResponse("Error accessing messages " + error), {
      status: 500,
    });
  }
}

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);
//   const user: User = session?.user;

//   if (!session || !user) {
//     return Response.json(ErrorResponse("Unauthorized"), {
//       status: 401,
//     });
//   }
//   await dbConnect();
//   try {
//     const _user = await UserModel.findById(user.id).select(
//       "isAcceptingMessages"
//     );
//     return Response.json(
//       SuccessResponse("Messages accepted successfully", _user),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     return Response.json(ErrorResponse("Error accepting messages"), {
//       status: 500,
//     });
//   }
// }
