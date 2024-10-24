import '../src/css/App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Foro from './pages/Foro'
import PrivateArea from './pages/PrivateArea'
import SignUp from '../src/pages/auth/SignUp'
import Login from '../src/pages/auth/Login'
import Error from './pages/Error'
import FormTuHuella from './pages/FormTuHuella'
import NotFound from './pages/NotFound'
import Private from './components/auth/Private'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/huella"
          element={
            <Private>
              <FormTuHuella />
            </Private>
          }
        />
        <Route path="/foro" element={<Foro />} />
        <Route
          path="/private"
          element={
            <Private>
              <PrivateArea />
            </Private>
          }
        />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
