import logo from '../../assets/icons/logo.svg'
import { Box, Typography } from '@mui/material'

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src={logo} alt="" width="44" height="44" />
      <Typography sx={{ fontWeight: 700, fontSize: '20px' }}>
        DormManager
      </Typography>
    </Box>
  )
}

export default Logo
