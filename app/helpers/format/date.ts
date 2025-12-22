import { format } from 'date-fns'

export function formatISOtoDDMMYYYY(iso: string) {
  return format(iso, 'dd.MM.yyyy')
}
