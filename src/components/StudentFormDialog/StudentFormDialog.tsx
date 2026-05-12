import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import type {StudentFormData} from "../../types/student.ts";

type StudentFormDialogProps = {
  open: boolean
  handleClose: () => void
  onSubmit: (student: StudentFormData) => void
}

const StudentFormDialog = (props: StudentFormDialogProps) => {
  const { open, handleClose, onSubmit } = props

  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    course: '',
    room: '',
    institute: '',
    phone: ''
  })

  const handleChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const rooms = ['101', '102', '103', '104', '105', '106', '107']

  const handleSubmit = () => {
    onSubmit(formData)
    handleClose()
    setFormData({
      fullName: '',
      course: '',
      room: '',
      institute: '',
      phone: '',
    })
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Добавить студента</DialogTitle>
      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Box
          component={'form'}
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
            variant={'outlined'}
            type={'text'}
            value={formData.fullName}
            onChange={(event) => {
              handleChange('fullName', event.target.value)
            }}
          />
          <FormControl>
            <InputLabel id={'course-select'} required>
              Курс
            </InputLabel>
            <Select
              id="course-select"
              required
              label="Курс"
              value={formData.course}
              onChange={(event) => {
                handleChange('course', event.target.value)
              }}
            >
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
              <MenuItem value={'4'}>4</MenuItem>
              <MenuItem value={'5'}>5</MenuItem>
              <MenuItem value={'6'}>6</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            disablePortal
            value={formData.room}
            onChange={(_, newValue) => {
              handleChange('room', newValue || '')
            }}
            renderInput={(params) => (
              <TextField {...params} label={'Комната'} />
            )}
            options={rooms}
          />

          <FormControl>
            <InputLabel id={'institute-select'} required>
              Институт
            </InputLabel>
            <Select
              id="institute-select"
              required
              label="Институт"
              value={formData.institute}
              onChange={(event) => {
                handleChange('institute', event.target.value)
              }}
            >
              <MenuItem value={'ИКИТ'}>ИКИТ</MenuItem>
              <MenuItem value={'ИУБП'}>ИУБП</MenuItem>
              <MenuItem value={'ПИ'}>ПИ</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            name={'phone'}
            label={'Номер телефона'}
            type={'tel'}
            variant={'outlined'}
            value={formData.phone}
            onChange={(event) => {
              handleChange('phone', event.target.value)
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant={'outlined'} color={'error'} onClick={handleClose}>
          Отмена
        </Button>
        <Button onClick={handleSubmit} variant={'contained'} color={'info'}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StudentFormDialog
