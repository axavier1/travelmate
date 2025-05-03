export default function SignupPage() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h1>
  
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
                placeholder="Jane Doe"
              />
            </div>
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>
  
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-green-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </main>
    );
  }
  