"use client";

import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";

interface UseAuthOptions {
  redirectTo?: string; // where to redirect if unauthorized
}

export function useAuth(options: UseAuthOptions) {
  const { redirectTo = "/login" } = options || {};
  const router = useRouter();
  const { refreshToken, accessToken } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {  // prevents the error that shows up on next icon
      setIsInitialized(true);
      return;
    }
    if (!accessToken || !refreshToken) {
      console.log("Not authenticated");
      router.replace(redirectTo);
    } 
  }, [accessToken, refreshToken, redirectTo, router, isInitialized]);
  return { refreshToken, accessToken };
}