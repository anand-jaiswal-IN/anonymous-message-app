import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      username: string;
      email: string;
      isVerified: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    isVerified: boolean;
  }
}
