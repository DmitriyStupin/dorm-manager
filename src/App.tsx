import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Layout from './components/Layout/Layout.tsx'
import Requests from './pages/Requests/Requests.tsx'
import Rooms from './pages/Rooms/Rooms.tsx'
import Students from './pages/Students/Students.tsx'
import '@fontsource-variable/jetbrains-mono/wght.css'
import { createTheme, ThemeProvider } from '@mui/material'

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "'JetBrains Mono Variable', monospace",
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/requests'} element={<Requests />} />
          <Route path={'/rooms'} element={<Rooms />} />
          <Route path={'/students'} element={<Students />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
