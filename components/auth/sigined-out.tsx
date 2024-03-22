'use client';

import { createClient } from '@/lib/supabase/client';
import React, { useEffect, useState } from 'react';

export default function SignedOut({ children }: { children: React.ReactNode }) {
  const [siginedIn, setSignedIn] = useState<boolean>();

  useEffect(() => {
    const supabase = createClient();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSignedIn(Boolean(session));
    });

    return data.subscription.unsubscribe;
  }, []);

  if (siginedIn) {
    return null;
  } else {
    return children;
  }
}
