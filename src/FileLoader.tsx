import React, { useState, useEffect } from 'react';
import Storage from '@aws-amplify/storage';



const FileUploader = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    listFiles();
  }, []);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file:any) => {
    try {
      const response = await Storage.put(file.name, file, {
        contentType: file.type,
      });
      console.log(response);
      // Optionally, fetch the list of files from S3 to update the UI
      listFiles();
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  const listFiles = async () => {
    try {
      const files = await Storage.list('');
      console.log(files);
      // Update your state/UI with this files array
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>
        {files.map((file, index) => (
          <div key={index}>{file.key}</div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;