'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';

// Define navigation items interface for type safety
interface NavItem {
    label: string;
    href: string;
}

// Navigation items array - easy to modify and maintain
const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const session = useSession();

    // State for mobile menu toggle
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
            {/* Main navbar container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            DreamHome
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            {!isMobileMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                // Close icon
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Authentication buttons */}
                    <div className="flex items-center">
                        {session ? (
                            <button
                                onClick={handleSignOut}
                                className="ml-4 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="ml-4 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;