"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const logoutUser = async () => {
    await dispatch(logout());
  };

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/50 to-background text-foreground overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-40 left-1/2 w-[700px] h-[700px] bg-primary/10 blur-3xl rounded-full -translate-x-1/2 pointer-events-none" />

        {/* Header */}
        <Header logoutUser={logoutUser} />

        {/* Hero Section */}
        {children}

        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
