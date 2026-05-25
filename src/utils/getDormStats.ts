import type { Room } from '../types/room.ts'
import type { Student } from '../types/student.ts'

export const getDormStats = (rooms: Room[], students: Student[]) => {
  const totalSeats = rooms.reduce((sum, room) => sum + room.capacity, 0)

  const occupied = students.length

  const freeSeats = totalSeats - occupied

  return { totalSeats, occupied, freeSeats }
}