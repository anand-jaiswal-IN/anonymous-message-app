"use client";
import { useParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const params = useParams();

  async function handleSendMessage() {
    try {
      setLoading(true);
      const response = await axios.post("/api/send-message", {
        username: params.username,
        message,
      });
      toast.success(response.data.message, { duration: 5000 });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        toast.error(`Something went wrong : ${error}`, { duration: 5000 });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="w-1/2 mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl">
            Send Message to @{params.username}
          </CardTitle>
          <CardDescription>
            Anonymous message to {params.username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Textarea
              placeholder="Write your anonymous message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <br />
            <Button className="w-full" onClick={handleSendMessage}>
              {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/auth/user/create" className="btn-primary">
            Create Account
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
