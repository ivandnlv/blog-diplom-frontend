import { differenceInMinutes, format, isThisYear, isToday, isValid, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

// 01-01-2025T00:00:00 -> 01.01.2025
export function formatISOtoDDMMYYYY(iso: string) {
  return format(iso, 'dd.MM.yyyy')
}

export function formatISOToDateWithConditions(iso: string) {
  const date = parseISO(iso)
  if (!isValid(date)) return ''

  const minutes = differenceInMinutes(new Date(), date)

  // Если дата в будущем — можно вывести "только что" (или обработай иначе, как хочешь)
  if (minutes < 0) return 'только что'

  // < 1 часа: "Менее минуты назад", "15 минут назад" и тд
  if (minutes < 60) {
    if (minutes < 1) return 'Менее минуты назад'
    // для русского "минуту/минуты/минут" — самый простой вариант без склонений:
    return `${minutes} минут назад`
    // если хочешь склонения — скажи, накину функцию.
  }

  // >= 1 часа
  if (isToday(date)) {
    return `сегодня в ${format(date, 'HH:mm')}`
  }

  if (isThisYear(date)) {
    return format(date, 'd MMMM', { locale: ru }) // "15 июля"
  }

  return format(date, 'd MMMM yyyy', { locale: ru }) // "15 июля 2024"
}
