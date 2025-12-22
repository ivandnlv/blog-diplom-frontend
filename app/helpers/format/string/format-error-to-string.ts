export function formatErrorToString(error: string | string[] | null | undefined): string {
  if (!error) return 'Что-то пошло не так...'

  if (typeof error === 'string') return error

  return error.join(', ')
}
