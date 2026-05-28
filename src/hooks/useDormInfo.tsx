import PersonIcon from '@mui/icons-material/Person'
import DoorIcon from '@mui/icons-material/SensorDoor'
import RequestIcon from '@mui/icons-material/Description'

import { getDormStats } from '../utils/getDormStats.ts'

import { useRoomsStore } from '../store/useRoomsStore.ts'
import { useStudentsStore } from '../store/useStudentsStore.ts'
import { useRequestsStore } from '../store/useRequestsStore.ts'

export const useDormInfo = () => {
  const rooms = useRoomsStore((state) => state.rooms)
  const students = useStudentsStore((state) => state.students)
  const requests = useRequestsStore((state) => state.requests)

  const dormInfo = getDormStats(rooms, students)

  return [
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
      value: requests.filter((request) => request.status !== 'выполнено')
        .length,
      title: 'Невыполненные заявки',
    },
  ]
}
