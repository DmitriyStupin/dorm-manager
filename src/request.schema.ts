import { z } from 'zod'

export const requestSchema = z.object({
  description: z.string().min(1, 'Описание должно быть минимум 1 символ'),
  roomId: z.string().min(1, 'Выберите комнату'),
  status: z.enum(['новое', 'в процессе', 'выполнено'], {
    message: 'Выберите статус',
  }),
})

export type RequestFormDataZod = z.infer<typeof requestSchema>
