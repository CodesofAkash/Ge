import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import connectDB from '@/db/connectDb'
import User from '@/models/User'

export const authoptions = NextAuth({

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,


    callbacks: {
        async signIn({ user, account, profile}) {
            if (account.provider === "github") {
                console.log("Hi")
                await connectDB();
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        username: profile.login,
                        name: user.name,
                        provider: account.provider,
                    });
                    user.name = newUser.username;
                } else {
                    user.name = currentUser.username;
                }
            }
            

            if (account.provider === "google") {
                await connectDB();
                const currentUser = await User.findOne({ email: user.email});
                if(!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        username: profile.name,
                        name: user.name,
                        provider: account.provider,
                    })
                }
                return true;
            }
            return true;
        },

        async session({ session }) {
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.name = dbUser.username;
            }
            return session;
        },
    }
});

export { authoptions as GET, authoptions as POST };
