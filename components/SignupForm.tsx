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
import { User, Lock, Mail, UserCheck } from "lucide-react";
import { useState } from "react";
import { useSignUp } from "@/hooks/useSignUp";

const SignupForm = (
{setCreateAccountSwitch}: {setCreateAccountSwitch: (createAccountSwitch: boolean) => void}
) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { signUp, loading } = useSignUp();
  
  // Check if all fields are filled
  const isFormValid = () => {
    return Object.values(form).every(value => value.trim() !== "");
  };
  
  // Check if passwords match
  const doPasswordsMatch = () => {
    return form.password === form.confirm_password && form.password !== "";
  };
  
  // Check if form is ready to submit
  const isFormReady = () => {
    return isFormValid() && doPasswordsMatch();
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormReady()) {
      await signUp({...form});
    }
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
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Join us to start your creative journey
          </p>
        </div>

        {/* First Name & Last Name - Same Row */}
        <div className="flex flex-row gap-4">
          {/* First Name */}
          <Field className="w-full">
            <FieldLabel htmlFor="first_name">First Name</FieldLabel>
            <div className="relative">
              <UserCheck
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                aria-hidden="true"
              />
              <Input
                id="first_name"
                placeholder="John"
                className="pl-10 h-12 text-sm"
                required
                value={form?.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />
            </div>
          </Field>
          {/* Last Name */}
          <Field className="w-full">
            <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
            <div className="relative">
              <UserCheck
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                aria-hidden="true"
              />
              <Input
                id="last_name"
                placeholder="Doe"
                className="pl-10 h-12 text-sm"
                required
                value={form?.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              />
            </div>
          </Field>
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

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
              aria-hidden="true"
            />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="pl-10 h-12 text-sm"
              required
              value={form?.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </Field>

        {/* Password & Confirm Password - Same Row */}
        <div className="flex flex-row gap-4">
          {/* Password */}
          <Field className="w-full">
            <FieldLabel htmlFor="password">Password</FieldLabel>
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
          {/* Confirm Password */}
          <Field className="w-full">
            <FieldLabel htmlFor="confirm_password">Confirm Password</FieldLabel>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                aria-hidden="true"
              />
              <Input
                id="confirm_password"
                type="password"
                placeholder="••••••••"
                className={`pl-10 h-12 text-sm ${
                  form.confirm_password && !doPasswordsMatch()
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                required
                value={form?.confirm_password}
                onChange={(e) =>
                  setForm({ ...form, confirm_password: e.target.value })
                }
              />
            </div>
            {form.confirm_password && !doPasswordsMatch() && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
          </Field>
        </div>

        {/* Submit */}
        <Field>
          <Button
            type="submit"
            disabled={!isFormReady() || loading}
            className={`w-full h-10 rounded-lg font-medium tracking-tight transition-all duration-200 ${
              isFormReady() && !loading
                ? "bg-[var(--primary)] hover:bg-emerald-600 text-white"
                : "bg-emerald-800 text-white cursor-not-allowed"
            }`}
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
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        {/* Login Link */}
        <Field>
          <FieldDescription className="text-center text-sm">
            Already have an account?{" "}
            <button
              className="text-[var(--primary)] underline underline-offset-4 hover:text-emerald-600 transition-colors"
              onClick={() => setCreateAccountSwitch(false)}
            >
              Login
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;