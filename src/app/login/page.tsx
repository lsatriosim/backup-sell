"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { LoginRequest } from "../model/AuthModel";
import apiClient from "@/lib/apiClient";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const requestBody: LoginRequest = {
                email: form.email,
                password: form.password
            }

            await apiClient.post(
                '/api/auth/login',
                requestBody
            );
            router.push('/home');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErrorMessage(err.response?.data?.data?.error);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Top background with text */}
            <div className="relative h-[40vh] w-full z-0">
                <Image
                    src="/loginBackground.jpg"
                    alt="Padel court"
                    fill
                    className="object-cover object-bottom brightness-75"
                    priority
                />
                <div className="absolute inset-0 flex">
                    <h1 className="text-white text-4xl font-bold text-start px-16 py-32">
                        Plans Change, <br /> Value Stays
                    </h1>
                </div>
            </div>

            {/* Signup form */}
            <div className="flex-1 bg-neutral-100 rounded-t-3xl -mt-6 shadow-lg px-6 py-2 z-1">
                <h2 className="text-2xl font-bold mb-6 text-neutral-950 pt-4">Sign In</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-md border px-3 py-2 text-neutral-600 disabled:opacity-50"
                        required
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-md border px-3 py-2 pr-10 text-neutral-600 disabled:opacity-50"
                            required
                        />
                        <span
                            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-surface-primary text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Doesn&apos;t have an account?{" "}
                    <a href="/login" className="text-blue-600 font-medium">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
