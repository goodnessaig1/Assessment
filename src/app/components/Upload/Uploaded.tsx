import React from "react";

interface FileProps {
  uploadedFiles: string[];
}

const Uploaded: React.FC<FileProps> = ({ uploadedFiles }) => {
  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((fileUrl, index) => (
          <li key={index}>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Uploaded;
