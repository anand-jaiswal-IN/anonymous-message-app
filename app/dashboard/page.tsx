"use client";

import MessageCard from "@/components/MessageCard";
import { Message } from "@/models/Message.model";
import axios, { AxiosError } from "axios";
import { Check, Loader, Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<(Message & { _id: string })[]>([]);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);
  const [loadingIsAcceptingMessages, setLoadingIsAcceptingMessages] =
    useState(false);

  async function fetchMessages() {
    try {
      setLoadingMessage(true);
      const response = await axios.get("/api/dashboard/messages");
      setMessages(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        toast.error("Something went wrong", { duration: 5000 });
      }
    } finally {
      setLoadingMessage(false); // Mark loading as false after fetching
    }
  }

  async function fetchIsAcceptingMessages() {
    try {
      setLoadingIsAcceptingMessages(true);
      const response = await axios.get("/api/dashboard/accepting-messages");
      setIsAcceptingMessages(response.data.data.isAcceptingMessages);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        toast.error("Something went wrong", { duration: 5000 });
      }
    } finally {
      setLoadingIsAcceptingMessages(false);
    }
  }

  useEffect(() => {
    if (status !== "authenticated") return; // Ensure session exists

    fetchMessages();
    fetchIsAcceptingMessages();
  }, [status]); // Depend on session status

  async function toggleIsAcceptingMessages() {
    try {
      setLoadingIsAcceptingMessages(true);
      const response = await axios.post("/api/dashboard/accepting-messages", {
        isAcceptingMessages: !isAcceptingMessages,
      });
      setIsAcceptingMessages(response.data.data.isAcceptingMessages);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        toast.error("Something went wrong", { duration: 5000 });
      }
    } finally {
      setLoadingIsAcceptingMessages(false);
    }
  }

  return (
    <div className="md:px-40">
      <div className="mb-10">
        {!session?.user.isVerified ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            {/* <AlertTitle>Error</AlertTitle> */}
            <AlertDescription className="inline">
              You will not be going to accept the message until you verify
              &nbsp;
              <Link
                href={`/auth/user/${session?.user?.username}/verify`}
                className="underline text-gray-200"
              >
                Verify your account
              </Link>
            </AlertDescription>
          </Alert>
        ) : null}
      </div>
      <div className="flex justify-between flex-wrap mb-16">
        <div className="md:w/2">
          <h1 className="text-2xl font-bold mb-4">
            Hi, @{session?.user?.username}
          </h1>
          <div>
            <button
              className={`font-bold py-1 px-4 rounded cursor-pointer ${
                isAcceptingMessages
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } `}
              onClick={toggleIsAcceptingMessages}
            >
              {loadingIsAcceptingMessages ? (
                <Loader2 className="animate-spin" />
              ) : isAcceptingMessages ? (
                <span>
                  <Check className="inline" /> Accepting messages
                </span>
              ) : (
                <span>
                  <X className="inline" /> Not accepting messages
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Your Messaging Link */}
        <div className="md:w-1/2">
          <label htmlFor="messaging-link" className="mb-1 block">
            Your Messaging Link :{" "}
          </label>
          <Input
            type="text"
            value={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${session?.user?.username}/send-message`}
            readOnly
            className="mb-2"
          />
          <Button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${session?.user?.username}/send-message`
              );
              toast.success("Copied to clipboard", { duration: 5000 });
            }}
          >
            Copy
          </Button>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">
        Your Messages : &nbsp;
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={fetchMessages}
        >
          <Loader />
        </Button>
      </h2>
      <div className="flex items-center flex-wrap">
        {loadingMessage ? (
          <Loader2 className="animate-spin" />
        ) : messages && messages.length > 0 ? (
          messages.map((m) => (
            <div className="w-1/3 pr-4 pb-4" key={String(m._id)}>
              <MessageCard
                messageObj={m}
                onDelete={() => {
                  setMessages((prev) =>
                    prev.filter((msg) => msg._id !== m._id)
                  );
                }}
              />
            </div>
          ))
        ) : (
          "No messages found"
        )}
      </div>
    </div>
  );
}
