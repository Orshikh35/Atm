import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Login with Token Key',
      credentials: {
        tokenKey: { label: 'Token Key', type: 'text' },
      },
      async authorize(credentials, req) {
        const tokenKey = credentials?.tokenKey;
        const url = `${process.env.BASE_LOGIN}/${tokenKey}`;

        try {
          console.log('Base Login URL:', url);
          const res = await fetch(url);;
          console.log('Response from login:', res);
          if (!res.ok) throw new Error('Invalid token');

          const userData = await res.json();
          const result = userData.result?.[0];

          console.log('User data:', userData);
          console.log('Result:', result);
          

          if (!res.ok || !userData.status || !result?.user?.id) {
            // logger.error(`Login failed: ${userData.message}`);s
            return null;
          }
          const { user, jwtToken, orgId, userRole, menu } = result;

          return {
            id: result.user.id.toString(), // ← string, not number
            name: `${result.user.firstName ?? ''} ${
              result.user.lastName ?? ''
            }`.trim(),
            email: result.user.email ?? '',
            image: result.user.avatar,
            jwtToken: jwtToken ?? '',
            orgId: orgId ?? 0,
            role: userRole ?? '',
            menu: menu ?? [],
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.jwtToken as string;
        token.orgId = user.orgId as number;
        token.role = user.role as string;
        token.menu = user.menu as [any];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.jwtToken = token.jwtToken as string;
        session.user.orgId = token.orgId as number;
        session.user.role = token.role as string;
        session.user.menu = token.menu as [any];
      }
      return session;
    },
    
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
