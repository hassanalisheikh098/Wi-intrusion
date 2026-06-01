import { useMemo } from 'react'
import { useSystem } from '../context/SystemContext'
import type { Alert } from '../data/mockData'

type SeverityFilter = 'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE'

interface UseAlertsOptions {
  severityFilter?: SeverityFilter
  page?: number
  perPage?: number
}

interface UseAlertsReturn {
  alerts: Alert[]
  totalCount: number
  unreadCount: number
  totalPages: number
  todayCount: number
}

export function useAlerts(options: UseAlertsOptions = {}): UseAlertsReturn {
  const { alerts: allAlerts } = useSystem()
  const { severityFilter = 'ALL', page = 1, perPage = 10 } = options

  return useMemo(() => {
    const filtered = severityFilter === 'ALL'
      ? allAlerts
      : allAlerts.filter(a => a.severity === severityFilter)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayCount = allAlerts.filter(a => new Date(a.timestamp) >= today).length
    const unreadCount = allAlerts.filter(a => !a.isRead).length

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
    const start = (page - 1) * perPage
    const paged = filtered.slice(start, start + perPage)

    return {
      alerts: paged,
      totalCount: filtered.length,
      unreadCount,
      totalPages,
      todayCount,
    }
  }, [allAlerts, severityFilter, page, perPage])
}
