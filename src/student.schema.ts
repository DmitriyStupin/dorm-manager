import { z } from 'zod'

export const studentSchema = z.object({
  fullName: z.string().min(3, 'ФИО должно быть минимум 3 символа'),
  course: z.string().min(1, 'Выберите курс'),
  room: z.string().min(1, 'Выберите комнату'),
  institute: z.string().min(1, 'Выберите институт'),
  phone: z
    .string()
    .min(10, 'Телефон слишком короткий')
    .regex(/^\+?[0-9\s\-()]+$/, 'Неверный формат телефона'),
})

export type StudentFormData = z.infer<typeof studentSchema>
