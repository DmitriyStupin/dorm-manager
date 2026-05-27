import {
  Alert,
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
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import RoomDetailsDialog from '../../components/RoomDetailsDialog/RoomDetailsDialog.tsx'
import type { Room } from '../../types/room.ts'
import { getRoomStatus } from '../../utils/getRoomStatus.ts'
import { rooms } from '../../mocks/rooms.ts'
import { students } from '../../mocks/students.ts'
import { getRoomOccupied } from '../../utils/getRoomOccupied.ts'
import { getRoomsStats } from '../../utils/getRoomsStats.ts'
import * as React from 'react'

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [searchItem, setSearchItem] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const start = page * rowsPerPage
  const end = start + rowsPerPage

  const stats = getRoomsStats(rooms, students)

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

  const paginatedRooms = filteredRooms.slice(start, end)

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangePage = (_event: unknown, newPage: number)=> {
    setPage(newPage)
  }

  const handleResetFilters = () => {
    setSearchItem('')
    setStatusFilter('')
    setPage(0)
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
        {stats.map((stat) => (
          <Card
            sx={{
              boxShadow: 'none',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 2,
            }}
            key={stat.title}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Chip
                sx={{ alignSelf: 'flex-start' }}
                label={stat.title}
                color={stat.color}
              />
              <Typography sx={{ fontWeight: 700 }} variant={'h5'}>
                {stat.value}
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
                setPage(0)
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
                  setPage(0)
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
            {paginatedRooms.length > 0 ? (
              paginatedRooms.map((room) => {
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
                      <Chip label={roomStatus.label} color={roomStatus.color} />
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
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Alert severity={'error'}>Комната не найдена</Alert>
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component={'div'}
          count={filteredRooms.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
