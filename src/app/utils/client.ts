import { createThirdwebClient } from "thirdweb";

if (!process.env.NEXT_PUBLIC_THIRDWEB_API_KEY) {
  throw new Error(
    "NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set in your environment variables.",
  );
}

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_API_KEY,
});
