import { create } from 'zustand'
import type { Student, StudentFormData } from '../types/student.ts'
import { students as mockStudents } from '../mocks/students'

type StudentsStore = {
  students: Student[]
  addStudent: (data: StudentFormData) => void
  updateStudent: (id: number, data: StudentFormData) => void
  deleteStudent: (id: number) => void
}

export const useStudentsStore = create<StudentsStore>((set) => ({
  students: mockStudents,
  addStudent: (data) =>
    set((state) => ({
      students: [
        ...state.students,
        {
          id: Date.now(),
          ...data,
          debt: 0,
        },
      ],
    })),
  updateStudent: (id, data) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...data } : student
      ),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id)
    }))
}))
