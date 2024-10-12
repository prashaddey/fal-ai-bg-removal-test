import React from 'react';

interface ImageDisplayProps {
  src: string;
  alt: string;
  icon: React.ReactNode;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt, icon }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />
      <div className="absolute top-2 left-2 bg-white rounded-full p-1">
        {icon}
      </div>
    </div>
  );
};

export default ImageDisplay;