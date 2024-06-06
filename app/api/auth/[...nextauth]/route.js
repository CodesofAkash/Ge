import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import connectDB from '@/db/connectDb'
import User from '@/models/User'

const authOptions = NextAuth({

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
            try {
                await connectDB();
                if (account.provider === "github") {
                    const currentUser = await User.findOne({ email: user.email });
                    if (!currentUser) {
                        await User.create({
                            email: user.email,
                            username: profile.login,
                            name: user.name,
                            provider: account.provider,
                        });
                    } else {
                        user.name = currentUser.username;
                    }
                }

                if (account.provider === "google") {
                    const currentUser = await User.findOne({ email: user.email});
                    if (!currentUser) {
                        await User.create({
                            email: user.email,
                            username: profile.name,
                            name: user.name,
                            provider: account.provider,
                        });
                    }
                }
                return true;
            } catch (error) {
                console.error("Error during signIn callback:", error);
                return false;
            }
        },

        async session({ session }) {
            try {
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.name = dbUser.username;
                }
                return session;
            } catch (error) {
                console.error("Error during session callback:", error);
                return session;
            }
        },
    }
});

export default authOptions;
