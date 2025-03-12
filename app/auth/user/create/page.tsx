"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import signUpSchema from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Define your form.
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { setError, clearErrors, watch } = form;
  const username = watch("username");

  // Checking the debouncing technique for username availability
  useEffect(() => {
    if (!username || username.trim().length < 3) {
      clearErrors("username");
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const response = await axios.get(`/api/auth/check-username-unique`, {
          params: { username },
        });
        if (response.data.data.isUnique) {
          clearErrors("username");
        } else {
          setError("username", {
            type: "manual",
            message: "Username is already taken.",
          });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setError("username", {
            type: "manual",
            message: error.response?.data.message,
          });
        } else {
          setError("username", {
            type: "manual",
            message: "Error checking username availability.",
          });
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [username, setError, clearErrors]);

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/user/create", values);
      toast.success(response.data.message, { duration: 5000 });
      router.push(`/auth/user/${response.data.data.username}/verify`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message, { duration: 5000 });
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }

    console.log(values);
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign Up Form</CardTitle>
        <CardDescription className="">Sign up to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    Username does not contains special symbols and must be at
                    least 3 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@me.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Already have an account &nbsp;
          <Link href="/auth/login" className="underline">
            Login Here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
