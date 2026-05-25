import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { cardsInfo } from '../../config/dormInfo.tsx'

const OccupancyChart = () => {
  const occupancyChartData = [
    { label: 'Занято мест', value: cardsInfo[1].value, color: 'red' },
    { label: 'Свободно мест', value: cardsInfo[2].value, color: 'green' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#ffffff',
        paddingBlock: 3,
        borderRadius: 2,
        border: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Typography variant={'h6'}>Заполненность комнат</Typography>
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
        {Math.round(
          (cardsInfo[1].value / (cardsInfo[1].value + cardsInfo[2].value)) *
            100,
        )}
        %
      </Typography>
    </Box>
  )
}

export default OccupancyChart
