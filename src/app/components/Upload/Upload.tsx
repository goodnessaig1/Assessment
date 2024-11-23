import React, { useState } from "react";
import { AppTheme, useAppContext } from "@/app/context/AppContext";
import { uploadToArweave } from "@/app/utils/arweave";
import Uploaded from "./Uploaded";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";
import classNames from "classnames";

const FileUpload = () => {
  const { isDarkTheme } = useAppContext();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    setUploading(true);
    try {
      const fileUrl = await uploadToArweave(file);
      setUploadedFiles([...uploadedFiles, fileUrl]);
      toast.success("File uploaded successfully!");
    } catch (error: any) {
      toast.error("An error occured");
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  const cancelButtonClass = classNames(
    "rounded-full w-8 h-8 flex items-center justify-center text-3xl",
    {
      "text-white": isDarkTheme,
      "text-gray-900": !isDarkTheme,
    },
  );

  const dropzoneClass = classNames(
    "w-full max-w-md p-6 h-32 border-2 border-dashed rounded-lg text-center cursor-pointer",
    {
      "border-blue-500": dragging,
      "border-gray-300": !dragging,
      "bg-gray-800 text-white": isDarkTheme,
      "bg-gray-100 text-gray-900": !isDarkTheme,
    },
  );

  return (
    <div className="w-full min-h-screen flex items-center flex-col">
      <div className="flex flex-col mt-8 items-center justify-center w-full gap-4">
        <h3 className="font-dancing text-2xl">Upload Files to Arweave</h3>
        <div
          className={dropzoneClass}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {file && (
            <div className="absolute max-w-md w-full flex items-en ml-[-36px] mt-[-24px]  justify-end">
              <button
                className={cancelButtonClass}
                onClick={e => {
                  e.stopPropagation();
                  clearFile();
                }}
              >
                &times;
              </button>
            </div>
          )}
          {file ? (
            <p className="text-sm">
              Selected File: <strong>{file.name}</strong>
            </p>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center">
              <FiUploadCloud size={24} />
              <p className="text-sm">
                Drag and drop a file here, or click to select one.
              </p>
            </div>
          )}
        </div>

        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />

        {file && (
          <div className="text-sm">
            <p>File Name: {file.name}</p>
            <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        {!uploading ? (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out shadow-md transform bg-gradient-to-r from-blue-500 to-teal-500 dark:from-purple-500 dark:to-pink-500 hover:scale-105 shadow-lg`}
          >
            Upload to Arweave
          </button>
        ) : (
          <div className="flex h-10 w-full items-center justify-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="gray"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}

        {uploadedFiles.length > 0 && <Uploaded uploadedFiles={uploadedFiles} />}
      </div>
    </div>
  );
};

export default FileUpload;
