import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top background with text */}
      <div className="relative h-[40vh] w-full">
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
      <div className="flex-1 bg-neutral-100 rounded-t-3xl -mt-6 shadow-lg px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-neutral-950 pt-4">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-md border px-3 py-2 text-neutral-600"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border px-3 py-2 text-neutral-600"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border px-3 py-2 pr-10 text-neutral-600"
            />
            <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
              👁
            </span>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-md border px-3 py-2 pr-10 text-neutral-600"
            />
            <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
              👁
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-surface-primary text-white py-3 rounded-md font-medium hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
