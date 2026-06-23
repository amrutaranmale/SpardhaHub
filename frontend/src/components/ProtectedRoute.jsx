import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] text-white">
        <Loader2 className="animate-spin text-[#EF9F27]" size={28} />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/signin" state={{ from: loc }} replace />;
  }
  return children;
}
