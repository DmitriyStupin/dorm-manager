import type { Request } from '../types/request.ts'

export const requests: Request[] = [
  {
    id: 1,
    description: 'Протекает кран',
    roomId: '1',
    createdAt: '2026-05-01',
    status: 'новое',
  },
  {
    id: 2,
    description: 'Не работает розетка',
    roomId: '2',
    createdAt: '2026-05-02',
    status: 'в процессе',
  },
  {
    id: 3,
    description: 'Сломан шкаф',
    roomId: '1',
    createdAt: '2026-05-03',
    status: 'выполнено',
  },
  {
    id: 4,
    description: 'Проблемы с освещением в комнате',
    roomId: '3',
    createdAt: '2026-05-04',
    status: 'новое',
  },
  {
    id: 5,
    description: 'Сломана дверная ручка',
    roomId: '4',
    createdAt: '2026-05-05',
    status: 'в процессе',
  },
  {
    id: 6,
    description: 'Течёт батарея отопления',
    roomId: '5',
    createdAt: '2026-05-06',
    status: 'выполнено',
  },
  {
    id: 7,
    description: 'Не работает интернет в комнате',
    roomId: '6',
    createdAt: '2026-05-07',
    status: 'новое',
  },
  {
    id: 8,
    description: 'Проблемы с замком двери',
    roomId: '7',
    createdAt: '2026-05-08',
    status: 'в процессе',
  },
  {
    id: 9,
    description: 'Разбитое окно',
    roomId: '8',
    createdAt: '2026-05-09',
    status: 'новое',
  },
  {
    id: 10,
    description: 'Шумный сосед',
    roomId: '9',
    createdAt: '2026-05-10',
    status: 'выполнено',
  },
]
