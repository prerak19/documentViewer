from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import random, string
import sqlite3
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

DOCUMENTS_FOLDER = "./documents"  # Folder containing PDF files
DATABASE = 'documents.db'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the database
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY,
            name TEXT,
            submission_time TEXT,
            overall_score REAL,
            overall_rating TEXT,
            summary TEXT,
            feedback TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS assessments (
            document_id INTEGER,
            criteria TEXT,
            score INTEGER,
            FOREIGN KEY(document_id) REFERENCES documents(id)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS assessment_criteria (
            document_id INTEGER,
            criteria TEXT,
            score INTEGER,
            justification TEXT,
            FOREIGN KEY(document_id) REFERENCES documents(id)
        )
    ''')
    conn.commit()
    conn.close()

init_db()


@app.get("/documents/view/{document_name}")
def view_document(document_name: str):
    document_path = os.path.join(DOCUMENTS_FOLDER, document_name)
    if os.path.exists(document_path):
        return FileResponse(document_path, media_type="application/pdf")
    else:
        return {"error": "Document not found"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Save file to local storage
    file_location = os.path.join(DOCUMENTS_FOLDER, file.filename)
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    
    # Generate random assessment data
    submission_time = "5:01PM 5/18/23"  # Replace with actual timestamp
    overall_score = random.randint(0, 100)
    overall_rating = random.choice(["Needs Improvement", "Satisfactory", "Good", "Excellent"])
    summary = ' '.join(''.join(random.choices(string.ascii_lowercase, k=random.randint(3, 10))) for _ in range(30)).capitalize() + '.'
    feedback = ' '.join(''.join(random.choices(string.ascii_lowercase, k=random.randint(3, 10))) for _ in range(30)).capitalize() + '.'
    assessment_data = {
        "rag_implementation_score": random.randint(0, 100),
        "fine_tuning_score": random.randint(0, 100),
        "multimodal_ai_score": random.randint(0, 100),
        "python_and_libraries_score": random.randint(0, 100),
        "ai_modeling_score": random.randint(0, 100),
        "analyzing_user_data_score": random.randint(0, 100),
        "problem_solving_score": random.randint(0, 100),
        "teamwork_score": random.randint(0, 100),
        "motivation_score": random.randint(0, 100),
    }
    assessment_criteria = {
        "criteria_1": {"score": random.randint(0, 100), "justification": "Justification for the score"},
        "criteria_2": {"score": random.randint(0, 100), "justification": "Justification for the score"},
        "criteria_3": {"score": random.randint(0, 100), "justification": "Justification for the score"},
        "criteria_4": {"score": random.randint(0, 100), "justification": "Justification for the score"},
        "criteria_5": {"score": random.randint(0, 100), "justification": "Justification for the score"},
        "criteria_6": {"score": random.randint(0, 100), "justification": "Justification for the score"},
    }
    
    # Store metadata in database
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO documents (name, submission_time, overall_score, overall_rating, summary, feedback)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (file.filename, submission_time, overall_score, overall_rating, summary, feedback))
    document_id = cursor.lastrowid
    for criteria, score in assessment_data.items():
        cursor.execute('''
            INSERT INTO assessments (document_id, criteria, score)
            VALUES (?, ?, ?)
        ''', (document_id, criteria, score))
    for criteria, data in assessment_criteria.items():
        cursor.execute('''
            INSERT INTO assessment_criteria (document_id, criteria, score, justification)
            VALUES (?, ?, ?, ?)
        ''', (document_id, criteria, data["score"], data["justification"]))
    conn.commit()
    conn.close()
    
    return {"message": "File uploaded successfully"}

@app.get("/all-documents")
def get_all_documents():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM documents')
    documents = cursor.fetchall()
    
    all_documents = []
    for doc in documents:
        document_id, name, submission_time, overall_score, overall_rating, summary, feedback = doc
        cursor.execute('SELECT criteria, score FROM assessments WHERE document_id=?', (document_id,))
        assessments = cursor.fetchall()
        assessment_data = {criteria: score for criteria, score in assessments}
        cursor.execute('SELECT criteria, score, justification FROM assessment_criteria WHERE document_id=?', (document_id,))
        assessment_criteria = cursor.fetchall()
        assessment_criteria_data = {criteria: {"score": score, "justification": justification} for criteria, score, justification in assessment_criteria}
        all_documents.append({
            "name": name,
            "submission_time": submission_time,
            "overall_score": overall_score,
            "overall_rating": overall_rating,
            "summary": summary,
            "feedback": feedback,
            "assessment_data": assessment_data,
            "assessment_criteria": assessment_criteria_data        
        })
    conn.close()
    return all_documents

@app.get("/documents/{document_name}")
def get_document_metadata(document_name: str):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM documents WHERE name=?', (document_name,))
    doc = cursor.fetchone()
    if doc:
        document_id, name, submission_time, overall_score, overall_rating, summary, feedback = doc
        cursor.execute('SELECT criteria, score FROM assessments WHERE document_id=?', (document_id,))
        assessments = cursor.fetchall()
        assessment_data = {criteria: score for criteria, score in assessments}
        
        cursor.execute('SELECT criteria, score, justification FROM assessment_criteria WHERE document_id=?', (document_id,))
        assessment_criteria = cursor.fetchall()
        # Print fetched data for verification
        print(f'Fetched from assessment_criteria: {assessment_criteria}')
        
        assessment_criteria_data = {criteria: {"score": score, "justification": justification} for criteria, score, justification in assessment_criteria}
        
        document_metadata = {
            "name": name,
            "submission_time": submission_time,
            "overall_score": overall_score,
            "overall_rating": overall_rating,
            "summary": summary,
            "feedback": feedback,
            "assessment_data": assessment_data,
            "assessment_criteria": assessment_criteria_data        
        }
        conn.close()
        return document_metadata
    conn.close()
    return {}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
