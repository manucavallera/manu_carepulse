"use client";

import { convertFileToUrl } from '@/lib/utils';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};


export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>

      <input {...getInputProps()} className='file-upload' />

      {files && files?.length > 0 ? (
        <Image src = {convertFileToUrl (files[0])} alt='uploaded file' width={1000} height={1000} />


        
      )}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}