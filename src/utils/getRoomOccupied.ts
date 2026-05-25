import type { Student } from '../types/student.ts'

export const getRoomOccupied = (roomId: string, students: Student[]) => {
  return students.filter((student) => student.roomId === roomId).length
}
