import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (
                    credentials?.username === process.env.ADMIN_USERNAME &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    return { id: "1", name: "David Admin" };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // If the url starts with the base, allow it (this handles callbackUrl)
            if (url.startsWith(baseUrl)) return url;
            // If it's a relative path, prepend base
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Default: go to admin
            return `${baseUrl}/admin`;
        }
    },
    pages: {
        signIn: "/api/auth/signin",
    }
};
