import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunctions';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const routes = [
  {to: '/login', name: '로그인', auth: false},
  {to: '/register', name: '회원가입', auth: false},
  {to: '/product/upload', name: '업로드', auth: true},    // 로그인한 사람만 들어갈 수 있도록 auth: true로 
  {to: '/user/cart', name: '카트', auth: true, icon: <AiOutlineShoppingCart style={{ fontSize: '1.4rem' }} />},
  {to: '', name: '로그아웃', auth: true},
  {to: '/history', name: '주문목록', auth: true},
];

const NavItem = ({ mobile }) => {   // Navbar 에서 mobile을 props로 가져옴
  const isAuth = useSelector(state => state.user?.isAuth)    //  user가 있을 때만
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/login');    // 로그아웃하면 로그인페이지로 이동
      })    
  }

  return (
    <ul className={`text-md justify-center w-full flex gap-4 ${mobile && "flex-col bg-gray-900 h-full"} items-center`}>
      {routes.map(({ to, name, auth, icon }) => {   // 중괄호를 해서 로직 작성
        if(isAuth !== auth) return null;

        if(name === '로그아웃') {  
          // 📌react에서는 map 메서드로 하나씩 순회를 할 때 유니크한 key를 줘야 함!
          return <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
            <Link
              onClick={handleLogout}
            >
              {name}
            </Link>
          </li>
        } else if(icon) {   // 아이콘이 있을 때(쇼핑카트 아이콘)
            return <li className='relative py-2 text-center border-b-4 cursor-pointer' key={name}>
              <Link to={to}>
                {icon}
                <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white
                 bg-red-500 border-2 border-white rounded-full -right-3'>
                    {1}     {/* 쇼핑카트 숫자 뱃지 */}
                </span>
              </Link>
            </li>
        } else {
          return <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
            <Link
              to={to}
            >
              {name}
            </Link>
          </li>
        }

      })}
    </ul>
  )
}

export default NavItem