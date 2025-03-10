import { z } from "zod";

export const usernameValidation = z
  .string()
  .regex(/^[a-z0-9_]{3,16}$/, "Please enter a valid username")
  .toLowerCase();

const signUpSchema = z.object({
  firstname: z.string().max(20).toLowerCase(),
  lastname: z.string().max(20).toLowerCase(),
  username: usernameValidation,
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
});

export default signUpSchema;
