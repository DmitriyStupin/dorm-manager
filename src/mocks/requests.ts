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
]
