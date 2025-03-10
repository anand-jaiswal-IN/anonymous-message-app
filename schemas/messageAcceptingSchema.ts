import { z } from "zod";

const messageAcceptingSchema = z.object({
  isMessageAccepting: z.boolean(),
});

export default messageAcceptingSchema;
