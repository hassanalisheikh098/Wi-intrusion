import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { INITIAL_ALERTS, generateAlert, type Alert } from '../data/mockData'

export type SystemStatus = 'ARMED' | 'DISARMED'
export type NodeStatus = 'ONLINE' | 'OFFLINE' | 'UNSTABLE'

export interface Node {
  id: string
  role: 'Transmitter' | 'Receiver'
  status: NodeStatus
  rssi: number
  lastSeen: string
}

export interface LogEntry {
  timestamp: string
  type: 'ARM' | 'DISARM' | 'ALERT' | 'NODE' | 'INFO'
  message: string
}

export interface SystemContextValue {
  status: SystemStatus
  nodes: Node[]
  alerts: Alert[]
  logs: LogEntry[]
  arm: () => void
  disarm: () => void
  markAlertRead: (id: string) => void
  markAllRead: () => void
}

const SystemContext = createContext<SystemContextValue | null>(null)

function makeTimestamp(): string {
  return new Date().toISOString()
}

function formatLogTime(iso: string): string {
  const d = new Date(iso)
  return d.toTimeString().slice(0, 8)
}

const INITIAL_NODES: Node[] = [
  { id: 'M-NODE', role: 'Transmitter', status: 'ONLINE', rssi: -42, lastSeen: makeTimestamp() },
  { id: 'S-NODE-A', role: 'Receiver', status: 'ONLINE', rssi: -48, lastSeen: makeTimestamp() },
  { id: 'S-NODE-B', role: 'Receiver', status: 'ONLINE', rssi: -51, lastSeen: makeTimestamp() },
]

export function SystemProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SystemStatus>('DISARMED')
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES)
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS)
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: makeTimestamp(), type: 'INFO', message: 'System initialized — Dashboard v1.0' },
    { timestamp: makeTimestamp(), type: 'NODE', message: 'All nodes reporting ONLINE' },
  ])
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nodeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    const ts = makeTimestamp()
    setLogs(prev => [...prev, { timestamp: ts, type, message }])
  }, [])

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  // Mock alert timer — generate alerts when ARMED
  useEffect(() => {
    if (status !== 'ARMED') {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current)
      return
    }

    const scheduleAlert = () => {
      const delay = 15000 + Math.random() * 10000 // 15–25 seconds
      alertTimerRef.current = setTimeout(() => {
        const newAlert = generateAlert()
        setAlerts(prev => [newAlert, ...prev])
        addLog('ALERT', `Movement Detected — Zone ${newAlert.zone} — Severity: ${newAlert.severity} — Confidence: ${newAlert.confidence}%`)

        // Browser notification when tab not active
        if (
          'Notification' in window &&
          Notification.permission === 'granted' &&
          document.hidden
        ) {
          new Notification('⚠ WiIntrusion Alert', {
            body: `Movement Detected · Zone ${newAlert.zone} · Severity: ${newAlert.severity}`,
            icon: '/favicon.ico',
          })
        }

        scheduleAlert()
      }, delay)
    }

    scheduleAlert()

    return () => {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current)
    }
  }, [status, addLog])

  // Node instability simulation
  useEffect(() => {
    const simulateInstability = () => {
      const delay = 8000 + Math.random() * 4000
      nodeTimerRef.current = setTimeout(() => {
        const nodeIndex = Math.floor(Math.random() * 3)
        setNodes(prev => {
          const copy = [...prev]
          copy[nodeIndex] = { ...copy[nodeIndex], status: 'UNSTABLE', lastSeen: makeTimestamp() }
          return copy
        })
        addLog('NODE', `${INITIAL_NODES[nodeIndex].id} status changed to UNSTABLE`)

        // Recover after 5 seconds
        setTimeout(() => {
          setNodes(prev => {
            const copy = [...prev]
            copy[nodeIndex] = {
              ...copy[nodeIndex],
              status: 'ONLINE',
              lastSeen: makeTimestamp(),
              rssi: -40 - Math.floor(Math.random() * 15),
            }
            return copy
          })
          addLog('NODE', `${INITIAL_NODES[nodeIndex].id} recovered — ONLINE`)
        }, 5000)

        simulateInstability()
      }, delay)
    }

    simulateInstability()

    return () => {
      if (nodeTimerRef.current) clearTimeout(nodeTimerRef.current)
    }
  }, [addLog])

  // Update node lastSeen periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n =>
        n.status === 'ONLINE' ? { ...n, lastSeen: makeTimestamp() } : n
      ))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const arm = useCallback(() => {
    setStatus('ARMED')
    addLog('ARM', 'System ARMED — Monitoring active')
  }, [addLog])

  const disarm = useCallback(() => {
    setStatus('DISARMED')
    addLog('DISARM', 'System DISARMED — Monitoring paused')
  }, [addLog])

  const markAlertRead = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a))
  }, [])

  const markAllRead = useCallback(() => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })))
  }, [])

  return (
    <SystemContext.Provider value={{ status, nodes, alerts, logs, arm, disarm, markAlertRead, markAllRead }}>
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem(): SystemContextValue {
  const ctx = useContext(SystemContext)
  if (!ctx) throw new Error('useSystem must be used within SystemProvider')
  return ctx
}
