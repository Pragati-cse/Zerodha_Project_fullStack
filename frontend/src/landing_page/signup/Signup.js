import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://zerodha-uj7z.onrender.com/api/auth/register", // deployed backend URL
        formData
      );
      alert(response.data.message || "Signup successful! 🎉");
      console.log("User Registered:", response.data);

      // save token to localStorage for dashboard if backend returns
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // redirect to dashboard
      window.location.href = "https://zerodhaa-pl59.onrender.com";
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); 
      } else {
        alert("Signup failed! ❌ Please try again.");
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="container mt-5 p-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
