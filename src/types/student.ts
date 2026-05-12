export type StudentStatus = 'Проживает' | 'Выселен'

export type Student = {
  id: number
  fullName: string
  room: string
  institute: string
  course: string
  phone: string
  status: StudentStatus
}

export type StudentFormData = {
  fullName: string
  course: string
  room: string
  institute: string
  phone: string
}
