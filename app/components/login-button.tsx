'use client';

import { createClient } from '@/lib/supabase/client';
import React from 'react';

export default function LoginButton() {
  return (
    <button
      onClick={() => {
        const supabase = createClient();

        supabase.auth.signInWithOAuth({
          provider: 'discord',
        });
      }}
    >
      login
    </button>
  );
}
