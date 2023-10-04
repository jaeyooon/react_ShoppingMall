import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './Sections/NavItem';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  // menu toggle
  const handleMenu = () => {
    setMenu(!menu);   // false면 true로, true면 false로
  }

  return (
    <section className='relative z-10 text-white bg-gray-900'>
      <div className='w-full'>  {/* width 전체 사용 */}
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
            {/* logo */}
            <div className='flex items-center text-2xl h-14'>
              <Link to="/">Logo</Link>
            </div>

            {/* menu button */}
            <div className='text-2xl sm:hidden'>
              <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
            </div>

            {/* big screen nav-items */}
            <div className='hidden sm:block'>     {/* 원래는 display:none으로 숨겨져있다가 사이즈가 sm보다 클때 block으로 해서 보여질 수 있게 함 */}
              <NavItem />
            </div>
        </div>

        {/* mobile nav-items */}
        <div className='block sm:hidden'>     {/* 원래는 block인데 sm보다 커지면 hidden으로 안 보이도록 */}
          {menu && <NavItem mobile />}   {/* meun가 true일 때만 보이도록, mobile을 NavItem에 props로 전달 */}
        </div>
      </div>
    </section>
  )
}

export default Navbar