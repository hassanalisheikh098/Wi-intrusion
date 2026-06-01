export interface Alert {
  id: string
  timestamp: string
  type: 'Movement Detected'
  severity: 'HIGH' | 'CRITICAL' | 'MODERATE'
  zone: 'CENTER' | 'NW' | 'SE' | 'NE' | 'SW'
  confidence: number
  isRead: boolean
}

const ZONES: Alert['zone'][] = ['CENTER', 'NW', 'SE', 'NE', 'SW']

function randomSeverity(): Alert['severity'] {
  const r = Math.random()
  if (r < 0.15) return 'CRITICAL'
  if (r < 0.50) return 'HIGH'
  return 'MODERATE'
}

function randomZone(): Alert['zone'] {
  return ZONES[Math.floor(Math.random() * ZONES.length)]
}

function randomConfidence(): number {
  return Math.floor(Math.random() * (97 - 78 + 1)) + 78
}

export function generateAlert(): Alert {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type: 'Movement Detected',
    severity: randomSeverity(),
    zone: randomZone(),
    confidence: randomConfidence(),
    isRead: false,
  }
}

function pastTimestamp(minutesAgo: number): string {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString()
}

export const INITIAL_ALERTS: Alert[] = [
  {
    id: crypto.randomUUID(),
    timestamp: pastTimestamp(15),
    type: 'Movement Detected',
    severity: 'HIGH',
    zone: 'NW',
    confidence: 91,
    isRead: true,
  },
  {
    id: crypto.randomUUID(),
    timestamp: pastTimestamp(32),
    type: 'Movement Detected',
    severity: 'CRITICAL',
    zone: 'CENTER',
    confidence: 96,
    isRead: true,
  },
  {
    id: crypto.randomUUID(),
    timestamp: pastTimestamp(58),
    type: 'Movement Detected',
    severity: 'MODERATE',
    zone: 'SE',
    confidence: 83,
    isRead: false,
  },
  {
    id: crypto.randomUUID(),
    timestamp: pastTimestamp(87),
    type: 'Movement Detected',
    severity: 'MODERATE',
    zone: 'NE',
    confidence: 79,
    isRead: true,
  },
  {
    id: crypto.randomUUID(),
    timestamp: pastTimestamp(112),
    type: 'Movement Detected',
    severity: 'HIGH',
    zone: 'SW',
    confidence: 88,
    isRead: false,
  },
]
