import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Layout from './components/Layout/Layout.tsx'
import Requests from './pages/Requests/Requests.tsx'
import Rooms from './pages/Rooms/Rooms.tsx'
import Students from './pages/Students/Students.tsx'
import '@fontsource-variable/jetbrains-mono/wght.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo, useState } from 'react'

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'light' ? '#efefef' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: "'JetBrains Mono Variable', monospace",
        },
      }),
    [mode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout mode={mode} setMode={setMode} />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/requests'} element={<Requests />} />
          <Route path={'/roomsInfo'} element={<Rooms />} />
          <Route path={'/students'} element={<Students />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
