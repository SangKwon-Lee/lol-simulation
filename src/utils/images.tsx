'use client';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface Props {
  style?: CSSProperties;
  className?: string;
  src: string;
  width?: number;
  height?: number;
  onClick?: any;
}

export default function Images({ height, src, width, className, onClick, style }: Props) {
  return (
    <Image
      src={`${src}`}
      alt={src}
      quality={1}
      width={width}
      fill={!width && !height ? true : false}
      height={height}
      onClick={onClick}
      style={{ ...style }}
      className={className}
    />
  );
}
