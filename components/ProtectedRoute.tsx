"use client";
import { useAuth } from '@/hooks/useAuth';
import React from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAuth({ redirectTo: "/login" });
    if (!accessToken) {
        return <div>Loading...</div>
    }
  return (
    <div className='h-full w-full'>{children}</div>
  )
}

export default ProtectedRoute