import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const subjects = [
  "All Subjects",
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

const Filter = ({ selectedSubject, onSubjectChange, onDateRangeChange,onTopicChange }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleDateChange = (from, to) => {
    if (from && to && new Date(to) < new Date(from)) {
      toast.error("End date cannot be earlier than start date.");
      return;
    }
    onDateRangeChange({ from, to });
  };

  return (
    <div className="my-5 p-4 border border-gray-300 rounded-md bg-white shadow-sm max-w-4xl mx-auto">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Subject Filter */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Filter by Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="px-3 py-2 border rounded-md w-full sm:w-60"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject === "All Subjects" ? "" : subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>






{/* Topic Search */}
<div className="mb-4">
  <label className="font-semibold block mb-1">Search by Topic:</label>
  <input
    type="text"
    placeholder="Enter topic to search..."
    onChange={(e) => onTopicChange(e.target.value)}
    className="px-3 py-2 border rounded-md w-full sm:w-60"
  />
</div>







      {/* Date Range Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="font-semibold">Filter by Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => {
            const value = e.target.value;
            setFromDate(value);
            handleDateChange(value, toDate);
          }}
          className="px-2 py-1 border rounded-md"
        />
        <span>to</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => {
            const value = e.target.value;
            setToDate(value);
            handleDateChange(fromDate, value);
          }}
          className="px-2 py-1 border rounded-md"
        />
      </div>
    </div>
  );
};

export default Filter;
