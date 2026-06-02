import { Box, Button } from '@mui/material'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

type LayoutProps = {
  mode: 'light' | 'dark'
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

const Layout = (props: LayoutProps) => {
  const {mode, setMode} = props

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={toggleTheme}>
            {mode === 'light' ? 'Темная тема' : 'Светлая тема'}
          </Button>
        </Box>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
