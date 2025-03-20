import React from "react";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-12 w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome Back!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sign in to access your dashboard
        </p>
        <button
          onClick={handleLogin}
          className="flex items-center cursor-pointer justify-center gap-2 w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
            className="w-8 h-8"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Home;
