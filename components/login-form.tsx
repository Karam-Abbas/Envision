"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";

export function LoginForm({
  setCreateAccountSwitch,
}: {
  setCreateAccountSwitch: (createAccountSwitch: boolean) => void;
}) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { login, loading } = useLogin();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = form.username.trim();
    const password = form.password.trim();

    if (!username && !password) {
      toast.info("Please enter your username and password");
      return;
    }
    if (!username) {
      toast.info("Please enter your username");
      return;
    }
    if (!password) {
      toast.info("Please enter your password");
      return;
    }

    await login(username, password);
  };
  return (
    <form
      className="flex flex-col gap-6 bg-transparent p-2 md:p-0 rounded-xl"
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to continue your creative journey
          </p>
        </div>

        {/* Username */}
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
              aria-hidden="true"
            />
            <Input
              id="username"
              placeholder="johndoe"
              className="pl-10 h-12 text-sm"
              required
              value={form?.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
        </Field>

        {/* Password */}
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="text-sm text-[var(--primary)] hover:underline underline-offset-4"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
              aria-hidden="true"
            />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-12 text-sm"
              required
              value={form?.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </Field>

        {/* Submit */}
        <Field>
          <Button
            type="submit"
            className="w-full h-10 rounded-lg font-medium tracking-tight bg-[var(--primary)] hover:bg-emerald-600 text-white transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        {/* Signup Link */}
        <Field>
          <FieldDescription className="text-center text-sm">
            New to Envision?{" "}
            <button
              className="text-[var(--primary)] underline underline-offset-4 hover:text-emerald-600 transition-colors"
              onClick={() => setCreateAccountSwitch(true)}
            >
              Create an account
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
