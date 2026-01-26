import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { getUserByEmail } from './lib/queries';
import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email) as any;
                    if (!user) return null;

                    // Check if password exists (it might not for old users or OAuth users if we add them later)
                    // For now, we assume all users have passwords in Neon or demo mode
                    if (!user.password && process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') return null;

                    // In demo mode, we might skip password check or use a hardcoded one if not using real auth
                    // But since we implemented password column, let's try to verify it.
                    // Note: our query `getUserByEmail` returns the user object.
                    // Make sure `getUserByEmail` actually selects the password field.
                    // By default `SELECT *` does.

                    const passwordsMatch = await bcrypt.compare(password, user.password || '');
                    if (passwordsMatch) {
                        return {
                            id: user.id,
                            name: user.full_name,
                            email: user.email,
                            image: user.avatar_url,
                        };
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
