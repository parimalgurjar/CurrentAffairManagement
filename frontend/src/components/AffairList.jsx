import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AffairList = ({ subject, dateRange, topic }) => {
  const [affairs, setAffairs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setCurrentUserId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    const fetchAffairs = async () => {
      try {
        setLoading(true);

        const params = {};
        if (subject) params.subject = subject;
        if (dateRange?.from) params.from = dateRange.from;
        if (dateRange?.to) params.to = dateRange.to;
        if (topic) params.topic = topic;

        const res = await axios.get("http://localhost:5000/api/affairs", {
          params,
        });
        setAffairs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load affairs.");
        toast.error("Failed to load affairs.", { autoClose: 2000 });
      } finally {
        setLoading(false);
      }
    };

    fetchAffairs();
  }, [subject, dateRange, topic]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/affairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAffairs((prev) => prev.filter((item) => item._id !== id));
      toast.success("Affair deleted successfully.", { autoClose: 2000 });
    } catch (err) {
      toast.error("You can only delete your own post.", { autoClose: 2000 });
    }
  };

  const confirmDelete = (id) => {
    const toastId = toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button
              onClick={() => {
                handleDelete(id);
                toast.dismiss(toastId);
              }}
              style={{
                padding: "6px 12px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
              style={{
                padding: "6px 12px",
                background: "gray",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />

      {loading && <p>Loading affairs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && affairs.length === 0 && <p>No affairs found for this filter.</p>}

      {affairs.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <h3>{item.title || "Untitled"}</h3>
          <p>
            <b>Date:</b>{" "}
            {item.date ? new Date(item.date).toLocaleDateString("en-IN") : "N/A"}
          </p>
          <p>
            <b>Source:</b> {item.source || "Unknown"} (Page {item.pageNumber || "N/A"})
          </p>
          <p>
            <b>Subject:</b> {item.subject || "N/A"} | <b>Topic:</b>{" "}
            {item.topic || "N/A"}
          </p>
          <p>{item.description || "No description provided."}</p>

          {item.photo && (
            <img
              src={`http://localhost:5000/uploads/${item.photo}`}
              alt={item.title || "Affair image"}
              style={{
                maxWidth: "300px",
                marginTop: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          )}

          {item.user === currentUserId && (
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => confirmDelete(item._id)}
                style={{
                  color: "white",
                  background: "#dc3545",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AffairList;
