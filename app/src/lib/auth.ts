// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "./prisma"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// Debug environment variables
console.log("Environment check:", {
  clientId: process.env.GOOGLE_CLIENT_ID ? "Present" : "Missing",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ? "Present" : "Missing",
  nextAuthUrl: process.env.NEXTAUTH_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET ? "Present" : "Missing"
})

export const authOptions = {
  // adapter: PrismaAdapter(prisma), // Temporarily disabled for Cloudflare Workers compatibility
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Temporary demo implementation without database
        // In a real app, you'd verify against a database
        return {
          id: "1",
          email: credentials.email,
          name: credentials.email.split('@')[0],
          image: null,
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, account }: any) {
      console.log("JWT callback:", { token, user, account })
      if (user) {
        token.id = user.id
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      console.log("Session callback:", { session, token })
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, account, profile }: any) {
      console.log("SignIn callback:", { user, account, profile })
      return true
    }
  },
}