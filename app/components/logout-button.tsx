'use client';

import { createClient } from '@/lib/supabase/client';
import React from 'react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        const supabase = createClient();

        supabase.auth.signOut();
      }}
    >
      logout
    </button>
  );
}
