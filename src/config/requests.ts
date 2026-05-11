type RequestStatus = 'новое' | 'в процессе' | 'выполнено'

export const requests: {
  requestID: number
  title: string
  room: number
  date: string
  status: RequestStatus
}[] = [
  {
    requestID: 1,
    title: 'Сломался кран',
    room: 101,
    date: '11.05.2026',
    status: 'новое',
  },
  {
    requestID: 2,
    title: 'Не работает унитаз',
    room: 504,
    date: '16.05.2026',
    status: 'в процессе',
  },
  {
    requestID: 3,
    title: 'Пищит сигнализация',
    room: 567,
    date: '17.05.2026',
    status: 'выполнено',
  },
]
