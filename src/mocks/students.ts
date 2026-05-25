import type { Student } from '../types/student.ts'

export const students: Student[] = [
  {
    id: 1,
    fullName: 'Иванов Иван Иванович',
    roomId: '1',
    institute: 'ИКИТ',
    livingUntil: '2026-05-08',
    phone: '+7 (999) 123-45-67',
    debt: 0,
  },
  {
    id: 2,
    fullName: 'Петров Петр Сергеевич',
    roomId: '2',
    institute: 'ПИ',
    livingUntil: '2027-07-31',
    phone: '+7 (999) 234-56-78',
    debt: 0,
  },
  {
    id: 3,
    fullName: 'Сидорова Анна Викторовна',
    roomId: '2',
    institute: 'ИКИТ',
    livingUntil: '2028-07-31',
    phone: '+7 (999) 345-67-89',
    debt: 4350,
  },
]
