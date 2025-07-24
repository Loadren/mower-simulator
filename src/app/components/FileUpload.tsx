import React, { useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface FileUploadProps {
  onFileChange: (file: File) => void;
  loading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, loading }) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <Box
      ref={dropRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      border="2px dashed #5865F2"
      borderRadius={2}
      bgcolor="#23272A"
      color="#B9BBBE"
      sx={{ cursor: 'pointer', transition: 'border 0.2s', width: '100%' }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".txt"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
      {loading ? <CircularProgress color="primary" /> : 'Drag & Drop your .txt file here or click to select'}
    </Box>
  );
}; 