"use client";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleBitrixSignIn = async () => {
    // Define your client ID and the callback URL
    const clientId = "local.674d1906f062b3.17136796"; // Use your actual client ID
    const redirectUri = encodeURIComponent(
      "https://pcm-btx-app.vercel.app/bitrix/callback" // Update to your Next.js callback route
    );
    const bitrixAuthUrl = `https://oauth.bitrix.info/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    // Redirect user to Bitrix login page
    router.push(bitrixAuthUrl);
  };

  return (
    <button onClick={handleBitrixSignIn}>Sign in with Bitrix</button>
  );
};
