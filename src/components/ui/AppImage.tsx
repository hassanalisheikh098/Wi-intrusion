interface Props {
  src: string; alt: string; fill?: boolean; priority?: boolean;
  className?: string; style?: React.CSSProperties; sizes?: string;
}
export default function AppImage({ src, alt, fill, className = '' }: Props) {
  if (fill) {
    return <img src={src} alt={alt} className={`absolute inset-0 w-full h-full object-cover ${className}`} />
  }
  return <img src={src} alt={alt} className={className} />
}
