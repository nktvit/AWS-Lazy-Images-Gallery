import React, { useState, useEffect } from 'react';
import { uploadData } from 'aws-amplify/storage';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file:any) => {
    try {
      const result = await uploadData({
        key: file.key,
        data: file,
        options: {
          accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          onProgress: (e) => {
            console.log(e);
          }
        }
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
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