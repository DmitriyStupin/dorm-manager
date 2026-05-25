import { rooms } from '../mocks/rooms.ts'

export const roomsInfo = [
  {
    title: 'Всего комнат',
    value: rooms.length,
    color: 'info',
  },
  {
    title: 'Свободно',
    value: 162,
    color: 'success',
  },
  {
    title: 'Частично заняты',
    value: 412,
    color: 'warning',
  },
  {
    title: 'Полностью заняты',
    value: 161,
    color: 'error',
  },
] as const