import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  console.log(user, "user");

  const handleLogout = () => {
    window.location.href = "http://localhost:5000/auth/logout";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-blue-700 text-3xl font-semibold text-center mb-4">
          Dashboard
        </h1>

        {user ? (
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-800">
              Welcome, {user.displayName}
            </h2>
            <div className="flex items-center justify-center my-4">
              {user.photos[0].value && (
                <img
                  src={user.photos[0].value}
                  width={60}
                  height={60}
                  alt="User"
                  className="rounded-full border border-gray-300 shadow-sm"
                />
              )}
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center cursor-pointer text-gray-600">
            You are not logged in.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
