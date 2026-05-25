import {
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { requests } from '../../mocks/requests.ts'
import { rooms } from '../../mocks/rooms.ts'
import { formatDate } from '../../utils/formateDate.ts'
import { Link } from 'react-router-dom'

const RecentRequests = () => {
  const colorStatus = {
    новое: 'info',
    'в процессе': 'warning',
    выполнено: 'success',
  } as const

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        alignSelf: 'flex-start',
      }}
    >
      <CardContent>
        <Typography variant={'h6'}>Последние заявки</Typography>
        <List>
          {requests
            .slice(-5)
            .reverse()
            .map((request, index) => {
              const room = rooms.find((room) => room.id === request.roomId)

              return (
                <ListItem
                  key={request.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 0,
                    borderBottom:
                      index !== requests.slice(-5).length - 1
                        ? '1px solid'
                        : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <ListItemText
                    primary={request.description}
                    secondary={`Заявка #${request.id} · Комната ${room?.number} · ${formatDate(request.createdAt)}`}
                  />

                  <Chip
                    label={request.status}
                    color={colorStatus[request.status]}
                  />
                </ListItem>
              )
            })}
        </List>
        <Typography sx={{ textAlign: 'center' }}>
          <Link
            to="/requests"
            style={{
              textDecoration: 'none',
              fontSize: '14px',
              color: '#1976d2',
              fontWeight: 500,
            }}
          >
            Все заявки
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default RecentRequests
