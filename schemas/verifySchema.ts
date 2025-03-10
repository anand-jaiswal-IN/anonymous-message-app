import { z } from "zod";

const verifySchema = z.object({
  code: z.string().length(6, "Please enter a valid code"),
});

export default verifySchema;
