import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DocumentViewer from '../../components/DocumentViewer';

export default function Submission() {
  const router = useRouter();
  const { documentName } = router.query;
  const [documentMetadata, setDocumentMetadata] = useState(null);

  useEffect(() => {
    if (documentName) {
      fetch(`http://localhost:8000/documents/${documentName}`)
        .then((res) => res.json())
        .then((data) => setDocumentMetadata(data));
    }
  }, [documentName]);

  return (
    documentMetadata !== null ? (
      <DocumentViewer documentMetadata={documentMetadata} />
    ) : (
      <p>Please Wait...</p>
    )
  );
}
