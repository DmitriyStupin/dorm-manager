import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import DoorIcon from '@mui/icons-material/SensorDoor'
import RequestIcon from '@mui/icons-material/Description'
import MenuIcon from '@mui/icons-material/Menu'
import {useState} from "react";

const App = () => {
  const [open, setOpen] = useState(false)

  const handleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <Box sx={{ display: 'flex', gap: '100px' }}>
      <Drawer open={open} variant={'permanent'} anchor={'left'} sx={{ bgcolor: 'blue' }}>
        <List>
          {['Главная страница', 'Студенты', 'Комнаты', 'Заявки'].map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {index === 0 ? <DashboardIcon /> : index === 1 ? <PersonIcon /> : index === 2 ? <DoorIcon /> : <RequestIcon/>}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={handleDrawer} color='inherit' >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}

export default App
