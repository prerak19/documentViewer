from fastapi import FastAPI
from fastapi.responses import FileResponse
import os
import json

app = FastAPI()

DOCUMENTS_FOLDER = "./documents"  # Folder containing PDF files

# Sample data for document metadata
document_metadata = {
    "Resume.pdf": {
        "name": "Resume.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
        "Resume1.pdf": {
        "name": "Resume1.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume2.pdf": {
        "name": "Resume2.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume3.pdf": {
        "name": "Resume3.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume4.pdf": {
        "name": "Resume4.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume5.pdf": {
        "name": "Resume5.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume6.pdf": {
        "name": "Resume6.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume7.pdf": {
        "name": "Resume7.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume8.pdf": {
        "name": "Resume8.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
      "Resume9.pdf": {
        "name": "Resume9.pdf",
        "overall_score": 40,
        "summary": "Document summary here",
        "feedback": "Our feedback here",
        "assessment_data": {
            "criteria_1": {"score": 35, "justification": "Justification for the score"},
            "criteria_2": {"score": 45, "justification": "Justification for the score"},
            "criteria_3": {"score": 35, "justification": "Justification for the score"},
            "criteria_4": {"score": 45, "justification": "Justification for the score"},
            "criteria_5": {"score": 30, "justification": "Justification for the score"},
            "criteria_6": {"score": 30, "justification": "Justification for the score"},
        },
    },
    # Add more documents as needed
}

@app.get("/documents")
def list_documents():
    documents = [f for f in os.listdir(DOCUMENTS_FOLDER) if f.endswith(".pdf")]
    return {"documents": documents}

@app.get("/documents/{document_name}")
def get_document_metadata(document_name: str):
    if document_name in document_metadata:
        return document_metadata[document_name]
    else:
        return {"error": "Document not found"}

@app.get("/documents/view/{document_name}")
def view_document(document_name: str):
    document_path = os.path.join(DOCUMENTS_FOLDER, document_name)
    if os.path.exists(document_path):
        return FileResponse(document_path, media_type="application/pdf")
    else:
        return {"error": "Document not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
