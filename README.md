# Social Media Content Analyzer

A full-stack web application that analyzes social media content and suggests engagement improvements.

##  Live Demo
Frontend: (https://social-media-content-analyzer-git-main-vishakha2304s-projects.vercel.app/)
Backend: (https://social-media-content-analyzer-lmtw.onrender.com)

## Approach
The Social Media Content Analyzer is a full-stack web application designed to extract and analyze text from user-uploaded documents. The frontend was built using React.js to provide a simple and responsive user interface with drag-and-drop and file picker support. Axios is used to handle API communication. The backend is developed using Node.js and Express.js. PDF files are processed using pdf-parse to extract text while maintaining structure, and image files are processed using Tesseract.js for OCR functionality. Basic error handling and loading states were implemented to enhance user experience. The backend was deployed on Render, and the frontend was deployed on Vercel, ensuring a production-ready setup with environment-based port handling and CORS configuration. The application architecture separates concerns between UI and processing logic, ensuring clean and maintainable code. The project demonstrates full-stack integration, document processing, and deployment best practices.

##  Tech Stack
Frontend: React.js, Axios
Backend: Node.js, Express.js
PDF Parsing: pdf-parse
OCR: Tesseract.js
Deployment: Vercel (Frontend), Render (Backend)

##  Features
- Upload PDF and image files
- Extract text from documents
- OCR for scanned images
- Analyze content and provide engagement suggestions
- Loading states and error handling
- Drag & Drop support

##  How It Works
1. User uploads PDF or image.
2. Backend extracts text using pdf-parse or Tesseract.
3. Extracted text is analyzed.
4. Suggestions are returned to frontend.
