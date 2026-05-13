import { useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import type { Request, RequestFormData } from '../../types/request.ts'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type RequestFormDataZod, requestSchema } from '../../request.schema.ts'

type RequestsFormDialogProps = {
  open: boolean
  handleClose: () => void
  onSubmit: (request: RequestFormData) => void
  request: Request | null
}

const RequestsFormDialog = (props: RequestsFormDialogProps) => {
  const { open, handleClose, onSubmit, request } = props

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RequestFormDataZod>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      description: '',
      room: '',
    },
  })

  useEffect(() => {
    if (request) {
      reset({
        description: request.description,
        room: request.room,
      })
    } else {
      reset({
        description: '',
        room: '',
      })
    }
  }, [request, reset])

  const submitHandler = (data: RequestFormData) => {
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
      <DialogTitle>Добавить заявку</DialogTitle>
      <DialogContent>
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
            label={'Описание поломки'}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
          />

          <TextField
            label={'Комната'}
            error={!!errors.room}
            helperText={errors.room?.message}
            {...register('room')}
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

export default RequestsFormDialog
