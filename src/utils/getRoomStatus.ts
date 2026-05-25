export const getRoomStatus = (capacity: number, occupied: number) => {
  if (occupied === 0) {
    return { label: 'свободна', color: 'success' as const }
  }
  if (occupied === capacity) {
    return { label: 'занята', color: 'error' as const }
  }
  return { label: 'частично занята', color: 'warning' as const }
}
