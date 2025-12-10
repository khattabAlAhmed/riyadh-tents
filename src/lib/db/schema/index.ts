import * as authSchema from "./auth-schema";
import * as websiteSchema from "./website-schema";

export const schema = {
    ...authSchema,
    ...websiteSchema,
}