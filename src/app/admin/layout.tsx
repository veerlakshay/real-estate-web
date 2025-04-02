'use client';

import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await authService.signOut();
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleSignOut}
                                className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-900"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
} 