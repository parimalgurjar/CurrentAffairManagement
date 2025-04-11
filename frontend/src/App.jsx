import React, { useContext, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "./context/AuthContext";

import AffairForm from "./components/AffairForm";
import AffairList from "./components/AffairList";
import ArticleDetail from "./components/ArticleDetail";
import Filter from "./components/Filter";
import Login from "./components/Login";
import Signup from "./components/Signup";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [filter, setFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [topic, setTopic] = useState("");

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const AuthButtons = () => (
    <div className="position-absolute top-0 end-0">
      {user ? (
        <button onClick={logout} className="btn btn-danger px-4">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="btn btn-primary me-2 px-4">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success px-4">
            Signup
          </Link>
        </>
      )}
    </div>
  );

  const handleUploadClick = () => {
    if (!user) {
      toast.error("You have to login first!");
      return;
    }
    navigate("/upload");
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <header className="mb-4">
  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
    <h1 className="fw-bold text-dark mb-3 mb-md-0">
      📰 Current Affair Management
    </h1>
    <div className="d-flex gap-2">
      {user ? (
        <button onClick={logout} className="btn btn-danger px-4">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="btn btn-primary px-4">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success px-4">
            Signup
          </Link>
        </>
      )}
    </div>
  </div>

  <nav className="d-flex gap-3 mt-4">
    <Link
      to="/"
      className="nav-btn text-primary fw-medium px-3 py-1 border border-primary rounded-pill text-decoration-none"
    >
      Home
    </Link>

    <span
      onClick={handleUploadClick}
      className="nav-btn text-primary fw-medium px-3 py-1 border border-primary rounded-pill text-decoration-none"
      style={{ cursor: "pointer" }}
    >
      Upload
    </span>
  </nav>
</header>


      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filter
                selectedSubject={filter}
                onSubjectChange={setFilter}
                onDateRangeChange={setDateRange}
                onTopicChange={setTopic}
              />
              <AffairList
                subject={filter}
                dateRange={dateRange}
                topic={topic}
              />
            </>
          }
        />
        <Route path="/upload" element={<AffairForm />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <h2 className="text-danger fs-4 text-center">
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
