import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import DoorIcon from '@mui/icons-material/SensorDoor'
import RequestIcon from '@mui/icons-material/Description'
import Logo from '../Logo'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const menuItems = [
    {
      title: 'Главная страница',
      icon: <DashboardIcon />,
      path: '/',
    },
    {
      title: 'Студенты',
      icon: <PersonIcon />,
      path: '/students',
    },
    {
      title: 'Комнаты',
      icon: <DoorIcon />,
      path: '/rooms',
    },
    {
      title: 'Заявки на ремонт',
      icon: <RequestIcon />,
      path: '/requests',
    },
  ]

  return (
    <Drawer
      variant={'permanent'}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Box
          component={NavLink}
          to={'/'}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Logo />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((menuItem) => (
          <ListItemButton
            key={menuItem.title}
            component={NavLink}
            to={menuItem.path}
            sx={{
              '&.active': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
              },
            }}
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
