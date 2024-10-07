"use client";

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
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

      {files && files.length > 0 ? (
  <Image 
    src={convertFileToUrl(files[0])} 
    alt='uploaded file' 
    width={1000} 
    height={1000} 
    className="w-[400px] overflow-hidden" 
  />
      ) : <Image src="/assets/icons/upload.svg" alt="patient" width={1000} height={1000} className="w-[400px] overflow-hidden"
          width={40}
          height={40}
          alt={upload}
      
        
        />
                  
      </>
      }

      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}