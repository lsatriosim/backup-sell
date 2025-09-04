'use client';

import Link from "next/link";
import { User, LogOut, Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { ProfileUser } from "../model/AuthModel";

export default function ProfilePage() {
  const [user, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    id: ""
  })

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);

    try {
      const response = await apiClient.get(`/api/auth/get-profile`);
      const userProfile: ProfileUser = response.data;
      setUserProfile(userProfile);
    } catch (err) {
      setApiError(`Failed to fetch user profile`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user.name == "") {
      fetchUserProfile()
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-surface-primary text-white h-28 flex items-end px-6 pb-4 rounded-b-2xl shadow-md w-full justify-center">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </header>

      <main className="px-4 py-6 space-y-8">
        {/* User Info Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-2">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Link
            href="/profile/edit"
            className="flex items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Pencil className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Edit Profile</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </Link>

          <button
            onClick={() => alert("Sign out clicked")}
            className="w-full flex items-center justify-between px-4 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Sign Out</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </button>
        </div>
      </main>
    </div>
  );
}
