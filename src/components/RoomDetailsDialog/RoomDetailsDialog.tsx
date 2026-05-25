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
import { students } from '../../mocks/students.ts'
import {getRoomOccupied} from "../../utils/getRoomOccupied.ts";

type RoomDetailsDialogProps = {
  isOpen: boolean
  handleClose: () => void
  room: Room | null
}

const RoomDetailsDialog = (props: RoomDetailsDialogProps) => {
  const { isOpen, handleClose, room } = props
  
  if (!room) return null

  const roomStudents = students.filter((student) => student.roomId === room?.id)

  const occupied = getRoomOccupied(room.id, students)

  const roomStatus = getRoomStatus(room?.capacity, occupied)


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
              value={`${occupied} из ${room.capacity} мест`}
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
              {roomStudents.length > 0 ? (
                roomStudents.map((roomStudent) => (
                  <ListItem
                    key={roomStudent.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      p: 0,
                    }}
                  >
                    <ListItemText
                      primary={roomStudent.fullName}
                      secondary={`${roomStudent.institute} · проживает до ${new Intl.DateTimeFormat(
                        'ru-RU',
                      ).format(
                        new Date(roomStudent.livingUntil),
                      )} · ${roomStudent.phone}`}
                    />

                    <Chip
                      label={`${roomStudent.debt} ₽`}
                      color={roomStudent.debt === 0 ? 'success' : 'error'}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography color="text.secondary">
                  В комнате никто не проживает
                </Typography>
              )}
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
