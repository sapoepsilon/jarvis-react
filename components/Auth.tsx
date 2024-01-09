import { FC } from 'react'
import { supabase } from '../utils/supabaseClient'

const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({ provider: 'google' })
}

const Auth: FC = () => (
  <div>
    <button 
      onClick={handleGoogleLogin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  </div>
)

export default Auth