"use client";

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  // Incluir 'onChange' en las dependencias
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} className='file-upload' />

      {files && files.length > 0 ? (
        <Image 
          src={convertFileToUrl(files[0])} 
          alt='uploaded file' 
          width={1000} 
          height={1000} 
          className="w-[400px] overflow-hidden" 
        />
      ) : (
        <>
          <Image 
            src="/assets/icons/upload.svg" 
            alt="upload" 
            className="w-[400px] overflow-hidden"
            width={20}
            height={20}
          />
          
          <div className='file-upload_label'>
            <p className='text-14-regular'>
              <span class
