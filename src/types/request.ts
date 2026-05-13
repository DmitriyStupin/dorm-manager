export type Request = {
  id: number
  description: string
  room: string
  createdAt: string
  status: string
}

export type RequestFormData = {
  description: string
  room: string
}