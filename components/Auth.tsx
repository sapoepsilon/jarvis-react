import { FC } from 'react';
import { supabase } from '../utils/supabaseClient';

const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
    },
  });
};

const Auth: FC = () => (
  <div>
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  </div>
);

export default Auth;
