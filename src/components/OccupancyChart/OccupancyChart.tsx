import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { cardsInfo } from '../../config/dormInfo.tsx'

const OccupancyChart = () => {
  const occupancyChartData = [
    { label: 'Занято комнат', value: cardsInfo[1].value, color: 'red' },
    { label: 'Свободно комнат', value: cardsInfo[2].value, color: 'green' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        background: '#ffffff',
        paddingBlock: 3,
        borderRadius: 2,
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
            data: occupancyChartData,
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
        Занятость{' '}
        {(cardsInfo[1].value / (cardsInfo[1].value + cardsInfo[2].value)) * 100}
        %
      </Typography>
    </Box>
  )
}

export default OccupancyChart