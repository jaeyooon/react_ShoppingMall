import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>

      <ToastContainer 
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar /> 
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet />  {/* / 경로에 오면 LandingPage 컴포넌트가 이 부분에 들어가게 됨, /login 경로에서는 LoginPage 컴포넌트가 들어감 */}
      </main>
      <Footer />
    </div>
  )
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<LandingPage />} />

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />


      </Route>
    </Routes>
  )
}

export default App
