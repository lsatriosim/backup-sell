export default function DesktopWarningPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Desktop Version Coming Soon 🚀
        </h1>
        <p className="text-gray-700 mb-6">
          This app is currently optimized for mobile devices.
          <br />
          Please try again on your phone for the best experience.
        </p>
      </div>
    </main>
  );
}