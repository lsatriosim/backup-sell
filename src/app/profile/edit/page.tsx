'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import apiClient from "@/lib/apiClient";
import { ProfileUser } from "@/app/model/AuthModel";

export default function EditProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [originalForm, setOriginalForm] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/api/auth/get-profile`);
        const userProfile: ProfileUser = response.data;
        setForm({
          email: userProfile.email,
          name: userProfile.name,
          phone: userProfile.phone,
        });
        setOriginalForm({
          email: userProfile.email,
          name: userProfile.name,
          phone: userProfile.phone,
        });
      } catch (err) {
        setApiError("Failed to fetch profile");
        alert("Failed to fetch profile");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  useEffect(() => {
    const hasChanges =
      form.name !== originalForm.name || form.phone !== originalForm.phone;

    const isPhoneValid = !form.phone.startsWith("08");

    setIsValid(hasChanges && form.name.trim() !== "" && isPhoneValid);
  }, [form, originalForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      await apiClient.post(`/api/auth/update-profile`, {
        name: form.name,
        phone: form.phone,
      });
      router.back();
    } catch (err) {
      setApiError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-surface-primary text-white h-16 flex items-center px-4 shadow-md">
        <button onClick={() => router.back()} className="mr-4">
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
      </header>

      <main className="p-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email - read only */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            disabled
            className="w-full rounded-md border px-3 py-2 text-neutral-400 bg-gray-100 cursor-not-allowed"
          />

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border px-3 py-2 text-neutral-600 disabled:opacity-50 focus-visible:border-surface-primary"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (e.g. 628532454)"
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border px-3 py-2 text-neutral-600 disabled:opacity-50"
            required
          />

          {apiError && (
            <p className="text-red-500 text-sm">{apiError}</p>
          )}

          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full bg-surface-primary text-neutral-50 py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
