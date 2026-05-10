import logo from '../../assets/icons/logo.svg'
import { Box, Typography } from '@mui/material'

const Logo = () => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      <img
        src={logo}
        alt=""
        width="44"
        height="44"
      />
      <Typography>Управление общежитием</Typography>
    </Box>
  )
}

export default Logo