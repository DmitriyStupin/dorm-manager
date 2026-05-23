import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import InfoItem from '../InfoItem/InfoItem.tsx'
import type { Room } from '../../types/room.ts'
import { getRoomStatus } from '../../utils/getRoomStatus.ts'

type RoomDetailsDialogProps = {
  isOpen: boolean
  handleClose: () => void
  room: Room | null
}

const RoomDetailsDialog = (props: RoomDetailsDialogProps) => {
  const { isOpen, handleClose, room } = props

  const roomStatus = getRoomStatus(room)

  if (!room) return null

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
      <DialogTitle>Комната {room.number}</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
              },
              gap: 3,
            }}
          >
            <InfoItem label={'Этаж'} value={room?.floor} />
            <InfoItem label={'Вместимость'} value={room.capacity} />
            <InfoItem
              label={'Занято'}
              value={`${room.occupied} из ${room.capacity} мест`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant={'subtitle1'} color={'textSecondary'}>
                Статус
              </Typography>

              <Box>
                <Chip label={roomStatus.label} color={roomStatus.color} />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
              Проживающие
            </Typography>
            <List>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between', p: 0 }}
              >
                <ListItemText
                  primary={'Ступин Дмитрий Андреевич'}
                  secondary={`ИКИТ · проживает до 08.08.2027 · 89964278036`}
                />
                <Chip label={'0 ₽'} color={'success'} />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          onClick={handleClose}
          variant="outlined"
          color={'error'}
          sx={{ marginInline: 1.5 }}
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RoomDetailsDialog
