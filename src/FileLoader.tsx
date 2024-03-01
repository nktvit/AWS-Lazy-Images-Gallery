import { uploadData } from 'aws-amplify/storage';
import { useState, useEffect } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState()

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file)
  };
  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(event);
    
    if (file) {
      console.log(file);

      handleFileUpload(file);
    }
  }

  const handleFileUpload = async (file: any) => {
    try {
      const result = await uploadData({
        key: file.key,
        data: file,
        options: {
          accessLevel: 'guest',
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round((transferredBytes / totalBytes) * 100)
                } %`
              );
            }
          }
        }
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FileUploader;