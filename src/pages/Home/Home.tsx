import { Box, Card, CardContent, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import DoorIcon from '@mui/icons-material/SensorDoor'
import RequestIcon from '@mui/icons-material/Description'
import { PieChart } from '@mui/x-charts/PieChart'

const Home = () => {
  const cardsInfo = [
    {
      icon: <PersonIcon />,
      value: 248,
      title: 'Всего студентов',
    },
    {
      icon: <DoorIcon />,
      value: 156,
      title: 'Занято комнат',
    },
    {
      icon: <DoorIcon />,
      value: 44,
      title: 'Свободно комнат',
    },
    {
      icon: <RequestIcon />,
      value: 12,
      title: 'Активных заявок',
    },
  ]

  const data = [
    { label: 'Занято комнат', value: cardsInfo[1].value, color: 'red' },
    { label: 'Свободно комнат', value: cardsInfo[2].value, color: 'green' },
  ]

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 2,
        }}
      >
        {cardsInfo.map((cardInfo) => (
          <Card
            variant={'outlined'}
            key={cardInfo.title}
            sx={{ borderRadius: 2 }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(25, 118, 210, 0.32)',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 2,
                }}
              >
                {cardInfo.icon}
              </Box>
              <Typography variant={'h5'}>{cardInfo.value}</Typography>
              <Typography variant={'subtitle2'}>{cardInfo.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography variant={'h5'}>Заполненность комнат</Typography>
        <PieChart
          width={400}
          height={300}
          colors={['red', 'green']}
          series={[
            {
              paddingAngle: 5,
              innerRadius: '60%',
              outerRadius: '90%',
              data,
            },
          ]}
          slotProps={{
            legend: {
              direction: 'horizontal',
              position: {
                vertical: 'bottom',
                horizontal: 'center',
              },
            },
          }}
        />
        <Typography variant={'subtitle1'}>
          Занятость {(cardsInfo[1].value / (cardsInfo[1].value + cardsInfo[2].value)) * 100}%
        </Typography>
      </Box>
    </>
  )
}

export default Home
