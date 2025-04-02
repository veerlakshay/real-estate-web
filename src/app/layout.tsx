import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './components/layout/ClientLayout';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SupabaseProvider from '@/providers/SupabaseProvider';

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DreamHome - Real Estate",
    description: "Find your perfect home",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <html lang="en">
            <body className={inter.className}>
                <SupabaseProvider initialSession={session}>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </SupabaseProvider>
            </body>
        </html>
    );
}