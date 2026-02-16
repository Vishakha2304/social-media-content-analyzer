const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const cors = require("cors");

const analyzeText = require("./utils/analyzeText");

const app = express();
app.use(cors());

// Multer setup for file upload
const upload = multer({
  dest: "uploads/",
});

// Upload API
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Check file existence
    if (!req.file) {
      return res.status(400).json({
        error: "File not received",
      });
    }

    const filePath = req.file.path;
    const fileType = req.file.mimetype;

    let extractedText = "";

    // ================= PDF Handling =================
    if (fileType === "application/pdf") {
      const buffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    }

    // ================= Image Handling (OCR) =================
    else if (fileType.startsWith("image/")) {
      const result = await Tesseract.recognize(filePath, "eng");
      extractedText = result.data.text;
    }

    // ================= Invalid File Type =================
    else {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(400).json({
        error: "Only PDF and image files are supported",
      });
    }

    // Check if text extraction failed
    if (!extractedText || extractedText.trim() === "") {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(400).json({
        error: "No text could be extracted from the file",
      });
    }

    // Analyze content
    const suggestions = analyzeText(extractedText);

    // Safely delete file after processing
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({
      extractedText,
      suggestions,
    });

  } catch (err) {
    console.error("Error processing file:", err);

    // Attempt cleanup if file exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: "Server error while processing file",
    });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
