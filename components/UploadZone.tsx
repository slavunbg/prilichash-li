'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { LikenessResult } from '@/types';

interface UploadZoneProps {
  onImageUpload: (image: string) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  setResult: (result: LikenessResult | null) => void;
}

export default function UploadZone({
  onImageUpload,
  onLoading,
  onError,
  setResult
}: UploadZoneProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      onError('Моля, качете изображение (JPEG, PNG, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError('Изображението е твърде голямо. Максимален размер: 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onImageUpload(reader.result as string);
      setResult(null);
      onError(null);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all
        ${isDragActive 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
        }`}
    >
      <input {...getInputProps()} />
      
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? 'Пусни снимката тук' : 'Кликни или влачи снимка тук'}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Поддържани формати: JPG, PNG, WEBP (до 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}