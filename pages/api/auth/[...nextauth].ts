import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // id: { label: 'Id' },
        // username: { label: 'Username' },
        // name: { label: 'Name' },
        // type: { label: 'Type' },
        // token: { label: 'Token' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const { id, username, name, type, token } = credentials as {
          id: string;
          username: string;
          name: string;
          type: string;
          token: string;
        };

        try {
          if (credentials) {
            return {
              id: id,
              username: username,
              name: name,
              type: type,
              token: token,
              // id: credentials.id,
              // username: credentials.username,
              // name: credentials.name,
              // type: credentials.type,
              // token: credentials.token,
            };
          }
          return null; // Add this line to satisfy the `authorize` typings
        } catch (e: any) {
          //const errorMessage = e.response.data.message;
          //throw new Error(errorMessage);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.type = user.type;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.username = token.username;
        session.type = token.type;
        session.token = token.token;
        delete session.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
};

export default NextAuth(authOptions);
