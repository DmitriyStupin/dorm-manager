export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('ru-RU').format(new Date(date))
}
