import { z } from "zod";
import { DB } from "./user-schema.js";

export const auth_schema = z.object({
    email: z.string().email().max(DB.MAX_LENGTH_EMAIL),
    password: z.string().max(DB.MAX_LENGTH_PASSWORD),
})