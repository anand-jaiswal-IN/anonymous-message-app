import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Message } from "@/models/Message.model";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
export default function MessageCard({
  messageObj,
  onDelete,
}: {
  messageObj: Message & { _id: string };
  onDelete: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/dashboard/delete-message`, {
        data: {
          messageId: messageObj._id,
        },
      });
      onDelete(messageObj._id);
      toast.success(response.data.message, { duration: 5000 });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        toast.error("Something went wrong", { duration: 5000 });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <p className="text-xl font-bold">{messageObj.message}</p>
      <p className="text-xs mt-1">{messageObj.createdAt.toString()}</p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="mt-2 cursor-pointer">
            {loading ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete this message?
            </AlertDialogTitle>
            <AlertDialogDescription>
              By confirming, you agree to delete this message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
