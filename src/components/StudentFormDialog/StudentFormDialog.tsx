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
import {useEffect} from "react";

type StudentFormDialogProps = {
  open: boolean
  handleClose: () => void
  onSubmit: (student: StudentFormData) => void
  student: Student | null
}

const rooms = ['101', '102', '103', '104', '105', '106', '107']

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
      course: '',
      room: '',
      institute: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (student) {
      reset({
        fullName: student.fullName,
        course: student.course,
        room: student.room,
        institute: student.institute,
        phone: student.phone,
      })
    } else {
      reset({
        fullName: '',
        course: '',
        room: '',
        institute: '',
        phone: '',
      })
    }
  }, [student, reset]);

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
      <DialogTitle>Добавить студента</DialogTitle>

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
          <Controller
            name={'course'}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.course}>
                <InputLabel id={'course-select'}>Курс</InputLabel>

                <Select
                  id="course-select"
                  label="Курс"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4</MenuItem>
                  <MenuItem value={'5'}>5</MenuItem>
                  <MenuItem value={'6'}>6</MenuItem>
                </Select>

                <FormHelperText>{errors.course?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name={'room'}
            render={({ field }) => (
              <Autocomplete
                options={rooms}
                value={field.value || null}
                onChange={(_, value) => field.onChange(value || '')}
                renderInput={(params) => (
                  <TextField
                    error={!!errors.room}
                    helperText={errors.room?.message}
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

          <Button type={'submit'} variant={'contained'} color={'info'}>
            Сохранить
          </Button>
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
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default StudentFormDialog
