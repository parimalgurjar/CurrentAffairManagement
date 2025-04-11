import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AffairForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    source: "",
    pageNumber: "",
    title: "",
    subject: "",
    topic: "",
    description: "",
    photo: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const subjects = [
    "History",
    "Polity",
    "Geography",
    "Economy",
    "Science & Tech",
    "Environment",
    "Current Events",
    "International Affairs",
    "Sports",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.date || !formData.source || !formData.title || !formData.subject || !formData.description) {
      toast.warn("⚠️ Please fill all the required fields.");
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/affairs`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Article Uploaded Successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("❌ Failed to upload article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 style={styles.heading}>Upload Current Affair</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Date</label>
        <input type="date" name="date" onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Source</label>
        <input type="text" name="source" placeholder="e.g. The Hindu, PIB" onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Page Number</label>
        <input type="text" name="pageNumber" placeholder="Page Number" onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Title</label>
        <input type="text" name="title" placeholder="Headline" onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Subject</label>
        <select name="subject" value={formData.subject} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select Subject --</option>
          {subjects.map((subj, index) => (
            <option key={index} value={subj}>{subj}</option>
          ))}
        </select>

        <label style={styles.label}>Topic</label>
        <input type="text" name="topic" placeholder="Topic" onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          placeholder="Description of the article"
          onChange={handleChange}
          required
          style={{ ...styles.input, height: "100px", resize: "vertical" }}
        />

        <label style={styles.label}>Upload Image</label>
        <input type="file" name="photo" onChange={handleChange} style={styles.input} />

        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: isLoading ? 0.6 : 1,
            pointerEvents: isLoading ? "none" : "auto",
          }}
          disabled={isLoading}
        >
          {isLoading ? "⏳ Uploading..." : "📤 Upload"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AffairForm;
