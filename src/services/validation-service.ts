import { auth_schema } from "../schemas/auth-schema.js";
import { register_schema } from "../schemas/user-schema.js";

export class ValidationService {
    public static LoginInput(input: any) {
        return auth_schema.safeParse(input);
    }
    public static RegisterInput(input: any) {
        return register_schema.safeParse(input);
    }
}