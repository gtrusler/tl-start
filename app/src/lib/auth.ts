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
  debug: true, // Enable debug mode
  logger: {
    error(code: any, metadata: any) {
      console.error("NextAuth Error:", code, metadata)
    },
    warn(code: any) {
      console.warn("NextAuth Warning:", code)
    },
    debug(code: any, metadata: any) {
      console.log("NextAuth Debug:", code, metadata)
    }
  },
  // adapter: PrismaAdapter(prisma), // Temporarily disabled for Cloudflare Workers compatibility
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
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
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn(message: any) {
      console.log("NextAuth signIn event:", message)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signOut(message: any) {
      console.log("NextAuth signOut event:", message)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createUser(message: any) {
      console.log("NextAuth createUser event:", message)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session(message: any) {
      console.log("NextAuth session event:", message)
    }
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
      console.log("SignIn callback - user object:", JSON.stringify(user, null, 2))
      console.log("SignIn callback - account object:", JSON.stringify(account, null, 2))
      
      // Allow all OAuth sign-ins
      if (account?.provider === "google") {
        console.log("Google OAuth sign-in approved")
        return true
      }
      
      // Allow credentials sign-in 
      if (account?.provider === "credentials") {
        console.log("Credentials sign-in approved")
        return true
      }
      
      console.log("Sign-in rejected - unknown provider:", account?.provider)
      return false
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async redirect({ url, baseUrl }: any) {
      console.log("Redirect callback - URL:", url, "BaseURL:", baseUrl)
      
      // Handle post-authentication redirects
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      
      // Default redirect to dashboard after successful auth
      return `${baseUrl}/dashboard`
    }
  },
}