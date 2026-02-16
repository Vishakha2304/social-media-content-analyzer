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
        "http://localhost:5000/upload",
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

  return (
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
  );
}

export default App;
