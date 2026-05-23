import type { Room } from '../types/room.ts'

export const getRoomStatus = (room: Room) => {
  if (room?.occupied === 0) {
    return { label: 'свободна', color: 'success' as const }
  }
  if (room?.occupied === room?.capacity) {
    return { label: 'занята', color: 'error' as const }
  }
  return { label: 'частично занята', color: 'warning' as const }
}