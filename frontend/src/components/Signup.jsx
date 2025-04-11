import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Signup successful!");
      setTimeout(() => navigate("/login"), 2000); // delay to let toast show
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Join Us 🎉</h2>
        <p style={styles.subtext}>Create a new account</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p style={styles.switch}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>

      {/* ✅ Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #ff758c, #ff7eb3)",
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
    background: "#ff758c",
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

export default Signup;
