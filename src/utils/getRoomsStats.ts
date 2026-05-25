import type { Room } from '../types/room.ts'
import type { Student } from '../types/student.ts'
import { getRoomStatus } from './getRoomStatus.ts'
import { getRoomOccupied } from './getRoomOccupied.ts'

export const getRoomsStats = (rooms: Room[], students: Student[])=> {
  let free = 0
  let partial = 0
  let full = 0

  for (const room of rooms) {
    const occupied = getRoomOccupied(room.id, students)

    const status = getRoomStatus(room.capacity, occupied)

    if (status.label === 'свободна') {
      free++
    }

    if (status.label === 'частично занята') {
      partial++
    }

    if (status.label === 'занята') {
      full++
    }
  }
  
  return [
    {
      title: 'Всего комнат',
      value: rooms.length,
      color: 'info',
    },
    {
      title: 'Свободно',
      value: free,
      color: 'success',
    },
    {
      title: 'Частично заняты',
      value: partial,
      color: 'warning',
    },
    {
      title: 'Полностью заняты',
      value: full,
      color: 'error',
    },
  ] as const
}