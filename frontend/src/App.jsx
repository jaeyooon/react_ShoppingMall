import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions'
import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotAuthRoutes from './components/NotAuthRoutes'

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
  const dispatch = useDispatch();   // redux hooks
  // useSelector를 이용해서 redux store의 isAuth 프로퍼티의 값을 가져옴.
  const isAuth = useSelector(state => state.user?.isAuth);  // isAuth 값을 true 아님 false
  const { pathname } = useLocation();

  useEffect(() => {
    if(isAuth) {  // ✨isAuth가 true일때만 해당 유저가 올바른 token을 가지고있는지 백엔드에 요청을 보내서 체크해줌!
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch])


  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<LandingPage />} />

    {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>   {/* 중첩 라우팅을 이용 */}
          <Route path="/protected" element={<ProtectedPage />} />
        </Route>


    {/* 로그인한 사람은 갈 수 없는 경로 */}     
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Route> 

      </Route>
    </Routes>
  )
}

export default App
