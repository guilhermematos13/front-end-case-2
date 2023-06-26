import { parseISO } from 'date-fns'
import { format, zonedTimeToUtc } from 'date-fns-tz'
const timeZone = 'America/Sao_Paulo' // Let's see what time it is Down Under

export const getFormatDate = (date: Date, formatDate?: string) => {
  const dateISO = parseISO(`${date}Z`)
  return format(
    zonedTimeToUtc(dateISO, timeZone),
    formatDate ?? 'dd/MM/yyyy HH:mm',
  )
}
