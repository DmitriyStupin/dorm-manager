import { useEffect } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl, FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import type { Request, RequestFormData } from '../../types/request.ts'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type RequestFormDataZod, requestSchema } from '../../request.schema.ts'
import { rooms } from '../../mocks/rooms.ts'

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
      roomId: '',
      status: 'новое',
    },
  })

  useEffect(() => {
    if (request) {
      reset({
        description: request.description,
        roomId: request.roomId,
        status: request.status
      })
    } else {
      reset({
        description: '',
        roomId: '',
        status: 'новое'
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

          <Controller
            control={control}
            name="roomId"
            render={({ field }) => (  
              <Autocomplete
                options={rooms}
                getOptionLabel={(room) => room.number}
                value={rooms.find((room) => room.id === field.value) || null}
                onChange={(_, value) => field.onChange(value?.id || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Комната"
                    error={!!errors.roomId}
                    helperText={errors.roomId?.message}
                  />
                )}
              />
            )}
          />

          {request && (
            <Controller
              control={control}
              name={'status'}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id={'status-select'}>Статус</InputLabel>

                  <Select
                    id="status-select"
                    label="Статус"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <MenuItem value={'новое'}>новое</MenuItem>
                    <MenuItem value={'в процессе'}>в процессе</MenuItem>
                    <MenuItem value={'выполнено'}>выполнено</MenuItem>

                    <FormHelperText>{errors.status?.message}</FormHelperText>
                  </Select>
                </FormControl>
              )}
            />
          )}

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
