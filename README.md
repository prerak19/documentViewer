
# Document Viewer

## Overview

This is a Document Viewer web application that allows users to select and view PDF documents along with their assessment metadata. The project is built using ReactJS with NextJS, Tailwind CSS for the frontend, and Python with FastAPI for the backend.

## Technologies

- Frontend: ReactJS, NextJS, Tailwind CSS
- Backend: FastAPI, Python
- Database: SQL (Optional for future enhancements)

## Features

- List and upload available PDF documents
- Display selected document in an iframe
- Show assessment metadata for the selected document

## Setup and Installation

### Prerequisites

- Node.js (>= v18.17.0) and npm
- Python 3.7+
- pip (Python package installer)

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prerak19/documentViewer.git
   cd document_viewer_backend

2. **Install FastAPI and Uvicorn:**
   ```bash
    pip install fastapi uvicorn
    or
    pip3 install fastapi uvicorn

3. **Start the FastAPI Backend:**
   ```bash
    uvicorn main:app --reload
    or
    python3 -m uvicorn main:app --reload  

4. Server running on [http://127.0.0.1:8000/all-documents] with your browser to see the result.      

### Frontend Setup
    cd document_viewer_frontend

1. **Install the dependencies**
   ```bash
   npm install

2. **Start the NextJS Frontend**
   ```bash
    npm run dev

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
