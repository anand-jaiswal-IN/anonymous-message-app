"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { useRouter, useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [resendOtpLoading, setResendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const params = useParams();

  async function sendVerificationOtp() {
    try {
      setVerifyOtpLoading(true);
      const response = await axios.post("/api/auth/user/verify", {
        username: params.username,
        code: otp,
      });
      toast.success(response.data.message, { duration: 5000 });
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        toast.error("Something went wrong", { duration: 5000 });
      }
    } finally {
      setVerifyOtpLoading(false);
    }
  }
  async function sendVerificationOtpToEmail() {
    try {
      setResendOtpLoading(true);
      const response = await axios.post("/api/auth/user/generate-otp", {
        username: params.username,
      });
      toast.success(response.data.message, { duration: 5000 });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        toast.error("Something went wrong", { duration: 5000 });
      }
    } finally {
      setResendOtpLoading(false);
    }
  }

  return (
    <>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">OTP Verification</CardTitle>
          <CardDescription className="">Verify your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button
            variant="outline"
            onClick={() => sendVerificationOtpToEmail()}
            className="mx-auto mt-8 w-full"
          >
            {resendOtpLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Resend OTP"
            )}
          </Button>
          <br />
          <Button
            variant="default"
            className="mx-auto mt-2 w-full"
            onClick={() => sendVerificationOtp()}
          >
            {verifyOtpLoading ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
