import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { FileUploader } from '@aws-amplify/ui-react-storage';
import { Storage } from 'aws-amplify'; // Import Storage for file upload
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  // Handle file upload success
  const handleUploadSuccess = async (file) => {
    try {
      // Upload the file to S3
      const result = await Storage.put(`public/${file.name}`, file, {
        level: 'public', // Ensure this matches your IAM policy and bucket configuration
        contentType: file.type, // Optional: specify the content type
      });
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

 

  return (
    <main>
      <FileUploader
        acceptedFileTypes={['image/*']}
        path="public/"
        maxFileCount={1}
        isResumable
        onUploadSuccess={handleUploadSuccess} // Callback for successful uploads
       
      />
      {/* Additional UI elements can be added here, like displaying the uploaded todos */}
    </main>
  );
}

export default App;
