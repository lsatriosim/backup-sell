'use client';

import Link from "next/link";
import { LogOut, Pencil, ChevronRightIcon, User, FileText, Tag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { ProfileUser } from "../model/AuthModel";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/app/context/UserContext"

const menus = [
  { name: "My Post", href: "/profile/my-post", icon: FileText },
  { name: "My Offer", href: "/profile/my-offer", icon: Tag },
];

export default function ProfilePage() {
  const [user, setUserProfile] = useState<ProfileUser | null>(null);
  const userContext = useUser();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/auth/get-profile`);
      const userProfile: ProfileUser = response.data;
      setUserProfile(userProfile);
    } catch (err) {
      console.log(err)
      setUserProfile(null); // fallback state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [fetchUserProfile, user]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await apiClient.post("/api/auth/logout");
      userContext.deleteUserId();
      router.push("/login");
    } catch (err) {
      console.log(err);
      alert(`Failed to log out`);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  }, [router, userContext]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-surface-primary text-white h-28 flex items-end px-6 pb-4 rounded-b-2xl shadow-md w-full justify-center">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </header>

      <main className="px-4 py-6 space-y-8">
        {/* User Info Section */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-300" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ) : user ? (
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
        ) : (
          // Fallback card when not logged in
          <Link
            href="/login"
            className="block bg-white rounded-2xl shadow-sm p-6 text-center hover:bg-gray-50 transition"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User className="h-6 w-6" />
              </div>
              <p className="text-gray-700 font-medium">You are not logged in</p>
              <p className="text-sm text-gray-500">Tap here to log in</p>
            </div>
          </Link>
        )}

        {/* Menu Section */}
        {user && (
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {menus.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-4 ${idx !== menus.length - 1 ? "border-b border-gray-100" : ""
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">{item.name}</span>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-600"></ChevronRightIcon>
                      </Link>
                    );
                  })}
                </div>
              </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <Link
                href="/profile/edit"
                className="flex items-center justify-between px-4 py-4 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Pencil className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">Edit Profile</span>
                </div>
                <ChevronRightIcon className="text-gray-600" />
              </Link>

              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5 text-rose-600" />
                  <span className="text-rose-600 font-medium">Sign Out</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/75 z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-lg relative">
            <h2 className="text-xl font-semibold text-center mb-2 text-neutral-800">
              Log Out
            </h2>
            <p className="text-center text-gray-700 mb-4">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-medium disabled:opacity-50"
              >
                No
              </button>
              <button
                onClick={logout}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
