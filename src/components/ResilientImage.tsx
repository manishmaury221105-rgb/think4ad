import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  fit?: 'cover' | 'contain';
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[16/9]',
  fit = 'cover',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200 border border-slate-200 text-slate-500 p-6 text-center ${aspectClassName} ${className}`}
      >
        <Layers className="w-8 h-8 text-slate-400 mb-3" strokeWidth={1.5} />
        <p className="text-sm font-medium text-slate-700 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${fit === 'contain' ? 'bg-white' : 'bg-slate-100'} ${aspectClassName} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className={`w-full h-full ${
          fit === 'contain' ? 'object-contain' : 'object-cover object-center'
        } transition-transform duration-500 ease-out`}
      />
    </div>
  );
};
