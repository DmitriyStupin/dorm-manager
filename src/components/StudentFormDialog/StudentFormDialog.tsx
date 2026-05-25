import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import type { Student, StudentFormData } from '../../types/student.ts'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentSchema } from '../../student.schema.ts'
import { useEffect } from 'react'
import { rooms } from '../../mocks/rooms.ts'

type StudentFormDialogProps = {
  open: boolean
  handleClose: () => void
  onSubmit: (student: StudentFormData) => void
  student: Student | null
}

const StudentFormDialog = (props: StudentFormDialogProps) => {
  const { open, handleClose, onSubmit, student } = props

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: '',
      livingUntil: '',
      roomId: '',
      institute: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (student) {
      reset({
        fullName: student.fullName,
        livingUntil: student.livingUntil,
        roomId: student.roomId,
        institute: student.institute,
        phone: student.phone,
      })
    } else {
      reset({
        fullName: '',
        livingUntil: '',
        roomId: '',
        institute: '',
        phone: '',
      })
    }
  }, [student, reset])

  const submitHandler = (data: StudentFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => {
        handleClose()
        reset()
      }}
    >
      <DialogTitle>
        {student ? 'Редактировать' : 'Добавить студента'}
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Box
          component={'form'}
          onSubmit={handleSubmit(submitHandler)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label={'ФИО'}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            {...register('fullName')}
          />
          <TextField
            type="date"
            label="Проживание до"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            error={!!errors.livingUntil}
            helperText={errors.livingUntil?.message}
            {...register('livingUntil')}
          />

          <Controller
            control={control}
            name={'roomId'}
            render={({ field }) => (
              <Autocomplete
                options={rooms}
                getOptionLabel={(option) => option.number}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={rooms.find((room) => room.id === field.value) || null}
                onChange={(_, value) => field.onChange(value?.id || '')}
                renderInput={(params) => (
                  <TextField
                    error={!!errors.roomId}
                    helperText={errors.roomId?.message}
                    {...params}
                    label={'Комната'}
                  />
                )}
              />
            )}
          />

          <Controller
            name={'institute'}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.institute}>
                <InputLabel id={'institute-select'}>Институт</InputLabel>

                <Select
                  id="institute-select"
                  label="Институт"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value={'ИКИТ'}>ИКИТ</MenuItem>
                  <MenuItem value={'ИУБП'}>ИУБП</MenuItem>
                  <MenuItem value={'ПИ'}>ПИ</MenuItem>
                </Select>

                <FormHelperText>{errors.institute?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <TextField
            label={'Номер телефона'}
            type={'tel'}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register('phone')}
          />

          <Button
            type={'button'}
            variant={'outlined'}
            color={'error'}
            onClick={() => {
              handleClose()
              reset()
            }}
          >
            Отмена
          </Button>
          <Button type={'submit'} variant={'contained'} color={'info'}>
            Сохранить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default StudentFormDialog
