import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInterceptor";
import {useLogin} from "@/hooks/useLogin";
import { signUpResponse } from "@/types/userTypes";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useLogin();

    const signUp = async (form: {first_name: string, last_name: string, username: string, email: string, password: string, confirm_password: string}) => {
        setLoading(true);
        try {
            const response: signUpResponse = await axiosInstance.post("/auth/users/", {
                first_name: form.first_name,
                last_name: form.last_name,
                username: form.username,
                email: form.email,
                password: form.password,
            });
            await login(form.username, form.password);
            toast.success("Sign up successful");
        }
        catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 400 && error.response.data) {
                    // 400 usually means validation errors, often an object of fields
                    const data = error.response.data;
                    let messages: string[] = [];
                    Object.keys(data).forEach((key) => {
                        if (Array.isArray(data[key])) {
                            messages.push(`${key}: ${data[key].join(", ")}`);
                        } else if (typeof data[key] === "string") {
                            messages.push(`${key}: ${data[key]}`);
                        }
                    });
                    toast.error(messages.length ? messages.join(" | ") : "Invalid registration data.");
                } else if (status === 409) {
                    toast.error("User already exists.");
                } else if (status === 500) {
                    toast.error("A server error occurred. Please try again later.");
                } else {
                    toast.error(`Sign up failed (${status}).`);
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return { signUp, loading };
}