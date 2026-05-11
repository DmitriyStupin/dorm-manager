import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'
import { requests } from '../../config/requests.ts'

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
          {requests.map((request, index) => (
            <Fragment key={request.requestID}>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between', p: 0 }}
              >
                <Box>
                  <ListItemText
                    primary={request.title}
                    secondary={`Заявка #${request.requestID} · Комната ${request.room} ·
                    ${request.date}`}
                  />
                </Box>
                <Chip
                  label={request.status}
                  color={colorStatus[request.status]}
                />
              </ListItem>
              {index !== requests.length - 1 && <Divider />}
            </Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default RecentRequests
