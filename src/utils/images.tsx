import Image from 'next/image';
import { CSSProperties } from 'react';

interface Props {
  style?: CSSProperties;
  className?: string;
  src: string;
  width?: number;
  height?: number;
  onClick?: any;
  loader?: any;
}

export default function Images({ height, src, width, className, onClick, style, loader }: Props) {
  return (
    <Image
      src={`${src}`}
      loader={loader}
      alt={src}
      quality={100}
      width={width}
      fill={!width && !height ? true : false}
      height={height}
      onClick={onClick}
      style={{ ...style }}
      className={className}
      loading="eager"
      priority
      unoptimized
    />
  );
}
