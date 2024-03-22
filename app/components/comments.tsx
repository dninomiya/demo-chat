'use client';

import { createClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

type Comment = {
  id: number;
  body: string;
  userId: string;
  createdAt: Date;
};

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from('comments')
      .select()
      .order('createdAt', { ascending: false })
      .then(({ data, error }) => {
        setComments(data as Comment[]);
        console.log(error);
      });

    const channel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments' },
        (payload) => {
          setComments((prev) => [payload.new, ...prev] as Comment[]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-black space-y-4 h-full p-4 text-muted-foreground">
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
          <time className="text-xs text-muted-foreground/80">
            {format(comment.createdAt, 'yyyy/MM/dd HH:mm:ss')}
          </time>
        </div>
      ))}
    </div>
  );
}
