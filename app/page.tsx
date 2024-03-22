import CommentForm from '@/app/components/comment-form';
import Comments from '@/app/components/comments';
import Hero from '@/app/components/hero/hero';
import LoginButton from '@/app/components/login-button';
import LogoutButton from '@/app/components/logout-button';
import SignInedIn from '@/components/auth/sigined-in';
import SignedOut from '@/components/auth/sigined-out';

export default function Home() {
  return (
    <div className="bg-black">
      <div className="fixed flex p-10 inset-x-0 bg-red-400 inset-y-20">
        <Hero />

        <div className="flex-1"></div>

        <div className="flex bg-black min-w-80 relative z-10 flex-col rounded-xl overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Comments />
          </div>
          <CommentForm />
        </div>

        <SignInedIn>
          <LogoutButton />
        </SignInedIn>
        <SignedOut>
          <LoginButton />
        </SignedOut>
      </div>
    </div>
  );
}
