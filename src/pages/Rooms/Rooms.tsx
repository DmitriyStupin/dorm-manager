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
import { rooms } from '../../mocks/rooms.ts'
import { students } from '../../mocks/students.ts'
import { getRoomOccupied } from '../../utils/getRoomOccupied.ts'

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [searchItem, setSearchItem] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleClose = () => {
    setSelectedRoom(null)
  }

  const filteredRooms = rooms.filter((room) => {
    const occupied = getRoomOccupied(room.id, students)

    const roomStatus = getRoomStatus(room.capacity, occupied)

    const matchesSearch = room.number.toLowerCase().includes(searchItem)

    const matchesStatus =
      statusFilter === '' || roomStatus.color === statusFilter

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
            {filteredRooms.map((room) => {
              const occupied = getRoomOccupied(room.id, students)
              const roomStatus = getRoomStatus(room.capacity, occupied)

            return (
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
                <TableCell align={'center'}>{occupied}</TableCell>
                <TableCell align={'center'}>
                  <Chip
                    label={roomStatus.label}
                    color={roomStatus.color}
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
              </TableRow>)
            })}
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
