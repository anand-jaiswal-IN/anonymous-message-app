import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ErrorResponse, SuccessResponse } from "@/types/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !user) {
    return Response.json(ErrorResponse("Unauthorized"), {
      status: 401,
    });
  }
  await dbConnect();

  try {
    // send post data `isAcceptingMessages`
    const { isAcceptingMessages } = await req.json();
    if (!isAcceptingMessages) {
      return Response.json(ErrorResponse("isAcceptingMessages is required"), {
        status: 400,
      });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      user.id,
      {
        isAcceptingMessages,
      },
      { new: true }
    ).select("isAcceptingMessages");

    return Response.json(
      SuccessResponse("Messages accepted successfully", updatedUser),
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(ErrorResponse("Error accepting messages"), {
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
