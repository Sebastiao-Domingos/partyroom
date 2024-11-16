'use client';
import React, { createRef, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { FilePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageFileType {
  onSelectedImage: (files: FileList) => void;
  className?: string;
  children?: React.ReactNode;
}

function ImageFile({ onSelectedImage, className = '' }: ImageFileType) {
  const [imageSelected, setImageSelected] = useState<FileList>();
  const inputFile = createRef<HTMLInputElement>();

  useEffect(() => {
    if (imageSelected && imageSelected?.item(0)) {
      onSelectedImage(imageSelected);
      setImageSelected(undefined);
    }
  }, [imageSelected, onSelectedImage]);
  return (
    <div>
      <label
        htmlFor="imagem"
        className={cn(
          'flex justify-center items-center h-[100px] hover:border-primary/60 w-[100px] rounded border border-dashed',
          className
        )}
        onClick={(evt) => {
          evt.preventDefault();
          inputFile.current?.click();
        }}
      >
        <FilePlus size={40} />
      </label>
      <Input
        type="file"
        id="imagem"
        placeholder="Imagem"
        className="hidden"
        ref={inputFile}
        onChange={(e) => {
          setImageSelected(e.currentTarget.files!);
        }}
        accept="image/jpeg, image/svg, image/png, image/webp"
      />
    </div>
  );
}

export default ImageFile;
