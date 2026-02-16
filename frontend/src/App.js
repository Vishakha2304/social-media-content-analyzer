import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setError("");
    setLoading(true);
    setExtractedText("");
    setSuggestions([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://social-media-content-analyzer-lmtw.onrender.com/upload",
        formData
      );

      
      setExtractedText(
        response.data.extractedText || response.data.text || ""
      );

      setSuggestions(response.data.suggestions || []);

    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false); 
    }
  };

  /*return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Social Media Content Analyzer</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing... Please wait ⏳" : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && (
        <p style={{ color: "blue" }}>
          Analyzing document... Please wait.
        </p>
      )}

      <h3>Extracted Text</h3>
      <textarea
        rows="12"
        cols="80"
        value={extractedText}
        readOnly
      />

      <h3>Suggestions</h3>
      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );*/

  return (
  <div style={{
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <div style={{
      background: "white",
      padding: "40px",
      borderRadius: "10px",
      width: "700px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{ textAlign: "center" }}>
        Social Media Content Analyzer
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: "20px" }}
      />

      <br /><br />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {loading ? "Processing..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Extracted Text</h3>
      <textarea
        rows="8"
        style={{ width: "100%" }}
        value={extractedText}
        readOnly
      />

      <h3>Suggestions</h3>
      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

}

export default App;
