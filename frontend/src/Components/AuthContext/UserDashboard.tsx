import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function UserDashboard() {
  const { user, isLoggedIn, isLoading, login, logout } = useAuth();
  const [emailInput, setEmailInput] = useState('');

  const handleLoginSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      login(emailInput.trim());
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-8 text-center bg-white border rounded-xl shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Identity Portal</h2>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Corporate Email</label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="developer@savanna.io"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition">
          Authenticate Session
        </button>
      </form>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
      <div className="border-b pb-3">
        <span className="text-xs font-mono font-bold uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
          Access Granted: {user?.role}
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-2">Welcome Back, {user?.username}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
      </div>
      
      <div className="text-xs text-gray-400 font-mono break-all">
        Secure Token ID: {user?.id}
      </div>

      <button onClick={logout} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded-lg transition">
        Terminate Session
      </button>
    </div>
  );
}