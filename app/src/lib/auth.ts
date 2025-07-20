import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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

        // In a real app, you'd verify the password against a hash
        // For demo purposes, we'll accept any password for any email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        }

        // Create new user if doesn't exist (demo only)
        const newUser = await prisma.user.create({
          data: {
            email: credentials.email,
            name: credentials.email.split('@')[0],
          }
        })

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          image: newUser.image,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}