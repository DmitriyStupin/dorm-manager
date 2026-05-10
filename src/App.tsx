import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Layout from "./components/Layout/Layout.tsx";
import Requests from "./pages/Requests/Requests.tsx";
import Rooms from "./pages/Rooms/Rooms.tsx";
import Students from "./pages/Students/Students.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'/'} element={<Home />} />
        <Route path={'/requests'} element={<Requests />} />
        <Route path={'/rooms'} element={<Rooms />} />
        <Route path={'/students'} element={<Students />} />
      </Route>
    </Routes>
  )
}

export default App
