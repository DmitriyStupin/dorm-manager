import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import { roomsInfo } from '../../config/roomsInfo.ts'

const Rooms = () => {
  return (
    <Box>
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
              <Chip sx={{alignSelf: 'flex-start'}} label={roomInfo.title} color={roomInfo.color} />
              <Typography sx={{fontWeight: 700}} variant={'h5'}>{roomInfo.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Rooms
