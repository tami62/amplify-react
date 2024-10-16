import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);


  return (
    <main>
      <FileUploader
        acceptedFileTypes={['image/*']}
        path={({ identityId }) => `protected/${identityId}/`}
        maxFileCount={1}
        isResumable
      />
      
    </main>
  );
}

export default App;
