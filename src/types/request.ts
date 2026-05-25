export type RequestStatus = 'новое' | 'в процессе' | 'выполнено'

export type Request = {
  id: number
  description: string
  roomId: string
  createdAt: string
  status: RequestStatus
}

export type RequestFormData = {
  description: string
  roomId: string
}