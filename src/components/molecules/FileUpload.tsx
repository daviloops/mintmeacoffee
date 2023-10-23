'use client';

import { useState } from 'react';
import { uploadFile } from '@mintbase-js/storage';

const FileUpload = ({ setFileId }: { setFileId: Function }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: any) => setFile(e.target.files[0])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    //call storage method to upload file to arweave
    const metadata = {
      title: "Storage Guide",
      media: file
    }
    // const uploadResult = await uploadReference(metadata);
    await uploadFile(file)
      .then(res => {
        setFileId(res.id);
      });
  };
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;