import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      login(res.data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        toast.dismiss(); // Clear the success toast
        navigate("/");
      }, 2000);
      
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>
        <p style={styles.subtext}>Login to your account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.switch}>
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtext: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#777",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    background: "#667eea",
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
  switch: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "0.9rem",
  },
};

export default Login;
