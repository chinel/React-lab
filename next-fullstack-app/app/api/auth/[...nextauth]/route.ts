import NextAuth from "next-auth";
import { authOptions } from "../../auth/authOptions";

//Creating a handler function
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Any get or post request sent to this endpoint will be handled by this handler function.
