export function formatBoolean(value: boolean, words: [string, string] = ['да', 'нет']) {
  return value ? words[0] : words[1]
}
