import StatCard from '../StatCard/StatCard.tsx'
import { Box } from '@mui/material'
import { useDormInfo } from '../../hooks/useDormInfo.tsx'

const StatsCards = () => {
  const cardsInfo = useDormInfo()

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cardsInfo.map((cardInfo) => (
        <StatCard
          key={cardInfo.title}
          title={cardInfo.title}
          icon={cardInfo.icon}
          value={cardInfo.value}
        />
      ))}
    </Box>
  )
}

export default StatsCards
