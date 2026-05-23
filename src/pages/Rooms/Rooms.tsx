import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { roomsInfo } from '../../config/roomsInfo.ts'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import RoomDetailsDialog from '../../components/RoomDetailsDialog/RoomDetailsDialog.tsx'
import type { Room } from '../../types/room.ts'
import { getRoomStatus } from '../../utils/getRoomStatus.ts'

const rooms: Room[] = [
  { id: '1', number: '2-01', floor: 2, capacity: 2, occupied: 0 },
  { id: '2', number: '2-02', floor: 2, capacity: 3, occupied: 1 },
  { id: '3', number: '2-03', floor: 2, capacity: 2, occupied: 2 },
  { id: '4', number: '2-04', floor: 2, capacity: 4, occupied: 1 },
  { id: '5', number: '2-05', floor: 2, capacity: 1, occupied: 0 },

  { id: '6', number: '3-01', floor: 3, capacity: 2, occupied: 2 },
  { id: '7', number: '3-02', floor: 3, capacity: 3, occupied: 0 },
  { id: '8', number: '3-03', floor: 3, capacity: 2, occupied: 1 },
  { id: '9', number: '3-04', floor: 3, capacity: 4, occupied: 4 },
  { id: '10', number: '3-05', floor: 3, capacity: 2, occupied: 0 },
]

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [searchItem, setSearchItem] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleClose = () => {
    setSelectedRoom(null)
  }

  const filteredRooms = rooms.filter((room) => {
    const roomStatus = getRoomStatus(room)

    const matchesSearch = room.number.includes(searchItem)

    const matchesStatus = statusFilter === '' || roomStatus.color === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleResetFilters = () => {
    setSearchItem('')
    setStatusFilter('')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 2,
        }}
      >
        {roomsInfo.map((roomInfo) => (
          <Card
            sx={{
              boxShadow: 'none',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 2,
            }}
            key={roomInfo.title}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Chip
                sx={{ alignSelf: 'flex-start' }}
                label={roomInfo.title}
                color={roomInfo.color}
              />
              <Typography sx={{ fontWeight: 700 }} variant={'h5'}>
                {roomInfo.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper
        sx={{
          p: 2,
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid size="grow">
            <TextField
              fullWidth
              label="Поиск комнаты"
              value={searchItem}
              onChange={(event) => {
                setSearchItem(event.target.value)
              }}
            />
          </Grid>

          <Grid size="grow">
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                label={'Статус'}
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value)
                }}
              >
                <MenuItem value={'success'}>Свободно</MenuItem>
                <MenuItem value={'warning'}>Частично заняты</MenuItem>
                <MenuItem value={'error'}>Полностью заняты</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size="grow">
            <Button
              fullWidth
              sx={{ height: '56px' }}
              variant={'outlined'}
              color={'error'}
              onClick={handleResetFilters}
            >
              Сбросить фильтры
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Комната</TableCell>
              <TableCell align={'center'}>Этаж</TableCell>
              <TableCell align={'center'}>Вместимость</TableCell>
              <TableCell align={'center'}>Занято</TableCell>
              <TableCell align={'center'}>Статус</TableCell>
              <TableCell align={'right'}>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow
                key={room.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    transitionDuration: '0.2s',
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>{room.number}</TableCell>
                <TableCell align={'center'}>{room.floor}</TableCell>
                <TableCell align={'center'}>{room.capacity} места</TableCell>
                <TableCell align={'center'}>{room.occupied}</TableCell>
                <TableCell align={'center'}>
                  <Chip
                    label={getRoomStatus(room).label}
                    color={getRoomStatus(room).color}
                  />
                </TableCell>
                <TableCell align={'right'}>
                  <Button
                    variant={'contained'}
                    onClick={() => {
                      setSelectedRoom(room)
                    }}
                  >
                    Подробнее
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RoomDetailsDialog
        isOpen={Boolean(selectedRoom)}
        handleClose={handleClose}
        room={selectedRoom}
      />
    </Box>
  )
}

export default Rooms
