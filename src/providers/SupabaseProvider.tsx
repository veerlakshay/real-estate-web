'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Session } from '@supabase/auth-helpers-nextjs';

export default function SupabaseProvider({
    children,
    initialSession,
}: {
    children: React.ReactNode;
    initialSession: Session | null;
}) {
    const [supabase] = useState(() => createClientComponentClient());

    return (
        <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
            {children}
        </SessionContextProvider>
    );
} 