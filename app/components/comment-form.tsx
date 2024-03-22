'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase/client';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  body: string;
};

export default function CommentForm() {
  const { handleSubmit, register, reset } = useForm<FormData>();

  const onSubmit = async ({ body }: FormData) => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('ログインしてください');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({ body, userId: user.id });

    console.log(error);

    reset();
  };

  return (
    <div className="p-4 bg-black border-t">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea {...register('body')} />
        <Button>送信</Button>
      </form>
    </div>
  );
}
