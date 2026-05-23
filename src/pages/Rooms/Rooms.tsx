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

const rooms = [
  { id: 1, number: '2-01', floor: 2, capacity: 2, occupied: 0 },
  { id: 2, number: '2-02', floor: 2, capacity: 3, occupied: 1 },
  { id: 3, number: '2-03', floor: 2, capacity: 2, occupied: 2 },
  { id: 4, number: '2-04', floor: 2, capacity: 4, occupied: 1 },
  { id: 5, number: '2-05', floor: 2, capacity: 1, occupied: 0 },

  { id: 6, number: '3-01', floor: 3, capacity: 2, occupied: 2 },
  { id: 7, number: '3-02', floor: 3, capacity: 3, occupied: 0 },
  { id: 8, number: '3-03', floor: 3, capacity: 2, occupied: 1 },
  { id: 9, number: '3-04', floor: 3, capacity: 4, occupied: 4 },
  { id: 10, number: '3-05', floor: 3, capacity: 2, occupied: 0 },
]

const Rooms = () => {
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
          <Card key={roomInfo.title}>
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

      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size="grow">
            <TextField fullWidth label="Поиск комнаты" />
          </Grid>

          <Grid size="grow">
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select label={'Статус'}>
                <MenuItem>Свободно</MenuItem>
                <MenuItem>Частично заняты</MenuItem>
                <MenuItem>Полностью заняты</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size="grow">
            <Button fullWidth sx={{ height: '56px' }} variant={'contained'}>
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
            {rooms.map((room) => (
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
                    label={
                      room.occupied === 0
                        ? 'свободна'
                        : room.occupied === room.capacity
                          ? 'занята'
                          : 'частично занята'
                    }
                    color={
                      room.occupied === 0
                        ? 'success'
                        : room.occupied === room.capacity
                          ? 'error'
                          : 'warning'
                    }
                  />
                </TableCell>
                <TableCell align={'right'}>
                  <Button variant={'contained'}>Подробнее</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Rooms
