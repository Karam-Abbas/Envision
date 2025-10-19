"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { setCredentials } from "@/store/slices/authSlice";
import { toast } from "sonner";

import axiosInstance from "@/lib/axiosInterceptor";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function loginUser(username: string, password: string) {
  try {
    const res = await axiosInstance.post(
      `${BASE_URL}/auth/jwt/create/`,
      {
        username,
        password,
      },  { withCredentials: true }
    );
    toast.success("Login successful");
    return res.data;
  } catch (error: any) {
    console.error(error.stack);
    console.log(error);
    if (error.response.status === 400) {
      toast.error("Invalid credentials");
    } else {
      toast.error("Something went wrong, unable to login");
    }
    throw new Error("Unable to login: " + error.message);
  }
}

export async function logoutUser() {
  try {
    const res = await axiosInstance.post(`${BASE_URL}/api/users/auth/logout/`,{});
    return res.data;
  } catch (error: any) {
    console.error(error.stack);
    toast.error("Unable to Logout");
    throw new Error("Unable to Logout: " + error.message);
  }
}


export function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { access, refresh } = await loginUser(username, password);
      dispatch(setCredentials({ access, refresh }));
      router.push("/auth/prompt");
    } catch (err: any) {
      if (err?.response && err.response.status === 400) {
        toast.error("Invalid credentials");
      } else if (err?.response && err.response.status === 401) {
        toast.error("Unauthorized access");
      } else {
        toast.error("Something went wrong, unable to login");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
