// API logic for auth, shorten, stats
// src/api/index.ts
import { sendLog } from "../middleware/logger";

let bearerToken: string | null = null;

const BASE_URL = "http://20.244.56.144/evaluation-service";

const credentials = {
  clientID: "your-client-id",
  clientSecret: "your-client-secret",
  companyName: "Your Company Name",
  clientName: "Your Name",
  ownerEmail: "your@email.com",
  ownerPhone: "1234567890",
  rollNo: "YOUR_ROLL_NO",
};

export const authenticate = async (): Promise<string> => {
  try {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Auth failed");

    bearerToken = data.access_token;

    await sendLog({
      stack: "frontend",
      level: "info",
      package: "auth",
      message: "Successfully authenticated and received token.",
    });

    return bearerToken;
  } catch (err: any) {
    await sendLog({
      stack: "frontend",
      level: "fatal",
      package: "auth",
      message: `Authentication failed: ${err.message}`,
    });
    throw err;
  }
};

export const getAuthHeader = () => {
  if (!bearerToken) throw new Error("Token not initialized");
  return {
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/json",
  };
};

export const getToken = () => bearerToken;
