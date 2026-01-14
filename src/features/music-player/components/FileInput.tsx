import React from "react";

interface FileInputProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptTypes?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  fileInputRef,
  onFileSelect,
  acceptTypes = "audio/*",
}) => {
  return (
    <input
      type="file"
      ref={fileInputRef}
      onChange={onFileSelect}
      multiple
      accept={acceptTypes}
      className="hidden"
    />
  );
};
