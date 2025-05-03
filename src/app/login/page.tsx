export default function LoginPage() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to TravelMate</h1>
  
          {/* Login Form Placeholder */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-travelmategreen"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-travelmategreen text-white rounded-md hover:bg-green-700 transition"
            >
              Log In
            </button>
          </form>
  
          {/* Divider */}
          <div className="text-center my-4 text-gray-500 text-sm">or</div>
  
          {/* Signup Link */}
          <p className="text-center text-sm">
            Don’t have an account?{' '}
            <a href="/signup" className="text-travelmategreen hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </main>
    );
  }
  