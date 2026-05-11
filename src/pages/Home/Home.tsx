import StatsCards from '../../components/StatsCards/StatsCards.tsx'
import OccupancyChart from '../../components/OccupancyChart/OccupancyChart.tsx'
import RecentRequests from '../../components/RecentRequests/RecentRequests.tsx'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <>
      <StatsCards />
      <Box
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}
      >
        <OccupancyChart />
        <RecentRequests />
      </Box>
    </>
  )
}

export default Home
