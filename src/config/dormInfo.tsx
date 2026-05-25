import PersonIcon from '@mui/icons-material/Person'
import DoorIcon from '@mui/icons-material/SensorDoor'
import RequestIcon from '@mui/icons-material/Description'
import { getDormStats } from '../utils/getDormStats.ts'
import { rooms } from '../mocks/rooms.ts'
import { students } from '../mocks/students.ts'
import { requests } from '../mocks/requests.ts'

const dormInfo = getDormStats(rooms, students)

export const cardsInfo = [
  {
    icon: <PersonIcon />,
    value: dormInfo.totalSeats,
    title: 'Всего мест',
  },
  {
    icon: <DoorIcon />,
    value: dormInfo.occupied,
    title: 'Занято мест',
  },
  {
    icon: <DoorIcon />,
    value: dormInfo.freeSeats,
    title: 'Свободно мест',
  },
  {
    icon: <RequestIcon />,
    value: requests.filter((request) => request.status === 'в процессе').length,
    title: 'Активных заявок',
  },
]
