interface Props { size?: number; onClick?: () => void }
export default function AppLogo({ size = 48, onClick }: Props) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0, cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="48" height="48" rx="5" fill="#141816" stroke="rgba(245,166,35,0.3)" strokeWidth="1"/>
        <circle cx="24" cy="32" r="3.5" fill="#F5A623"/>
        <path d="M16 25 Q24 17.5 32 25" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M10 19.5 Q24 10 38 19.5" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35"/>
      </svg>
    </div>
  )
}
