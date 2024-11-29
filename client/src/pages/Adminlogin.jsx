import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logInFailure, logInStart, logInSuccess } from '../redux/admin/adminSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // New state for login error
  
  const {user} = useSelector(state => state.admin)
 //
 if(user) navigate('/admin-dashboard')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(""); // Reset email error state
    setPasswordError(""); // Reset password error state
    setLoginError(""); // Reset login error state

    // Basic email validation
    if (!formData.email || !formData.email.trim()) {
      setEmailError("Email is required");
      return;
    }

    // Basic password validation
    if (!formData.password || !formData.password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    try {
      console.log('Form submitted', formData);
      dispatch(logInStart());
      const res = await fetch("/api/admin/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('API response', data);
      if (!data.success) {
        setLoginError(data.message); // Set login error message
        dispatch(logInFailure(data.message));
        return;
      }
      dispatch(logInSuccess()); // Pass user data to logInSuccess
      navigate("/admin-dashboard");
    } catch (error) {
      console.error('Error during login:', error);
      dispatch(logInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError && "border-red-500"}`}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError && "border-red-500"}`}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          </div>
          {loginError && <p className="text-red-500 text-xs italic">{loginError}</p>} {/* Display login error */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-10"
              style={{ marginLeft: '9rem' }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
