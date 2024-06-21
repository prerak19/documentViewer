export default async function handler(req, res) {
    const { documentName } = req.query;
    const response = await fetch(`http://127.0.0.1:8000/documents/${documentName}`);
    const data = await response.json();
    res.status(200).json(data);
  }
  