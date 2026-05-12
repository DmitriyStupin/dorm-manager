import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import type { StudentFormData } from '../../types/student.ts'
import { Controller, useForm } from 'react-hook-form'

type StudentFormDialogProps = {
  open: boolean
  handleClose: () => void
  onSubmit: (student: StudentFormData) => void
}

const rooms = ['101', '102', '103', '104', '105', '106', '107']

const StudentFormDialog = (props: StudentFormDialogProps) => {
  const { open, handleClose, onSubmit } = props
  const { register, handleSubmit, reset, control } = useForm<StudentFormData>({
    defaultValues: {
      fullName: '',
      course: '',
      room: '',
      institute: '',
      phone: '',
    },
  })

  const submitHandler = (data: StudentFormData) => {
    onSubmit(data)
    handleClose()
    reset()
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
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
            required
            label={'ФИО'}
            type={'text'}
            {...register('fullName')}
          />
          <Controller
            name={'course'}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
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
                  <TextField {...params} label={'Комната'} />
                )}
              />
            )}
          />

          <Controller
            name={'institute'}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
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
              </FormControl>
            )}
          />

          <TextField
            required
            label={'Номер телефона'}
            type={'tel'}
            {...register('phone')}
          />

          <Button type={'submit'} variant={'contained'} color={'info'}>
            Сохранить
          </Button>
          <Button variant={'outlined'} color={'error'} onClick={handleClose}>
            Отмена
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default StudentFormDialog
