import React, { useState } from "react";
import { supabase } from "../Supabase/supabase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AuthPages.css";

const ADMIN_EMAIL = "admin@bookhub.com";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        alert("Signup successful! Logging you in...");
        if (email === ADMIN_EMAIL) navigate("/admindashboard");
        else navigate("/userdashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="auth-container">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select name="" id="" onChange={(e) => setRole(e.target.value)}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          {error && <p className="auth-error">{error}</p>}
          <button
            className="auth-button"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>

      <p style={{ fontSize: "0.875rem", marginTop: "1rem", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/" className="auth-link">
          Login
        </Link>
      </p>
    </>
  );
}