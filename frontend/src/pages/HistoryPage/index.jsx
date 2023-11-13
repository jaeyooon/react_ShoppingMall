import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const HistoryPage = () => {

  const userData = useSelector(state => state.user?.userData)

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>주문 내역</h2>
      </div>

      <table className='w-full text-left text-gray-500'>
        <thead className='border-[1px]'>
          <tr>
            <th>
              상품
            </th>
            <th>
              가격
            </th>
            <th>
              수량
            </th>
            <th>
              총금액
            </th>
            <th>
              주문 날짜
            </th>
          </tr>
        </thead>

        <tbody>
          {userData?.history.map(item => (
            <tr className='border-b' key={item.id}>
              <td>
                <button>
                  <Link to={`/product/${item.id}`}>
                    {item.name} 
                  </Link>
                </button>
                
              </td>
              <td>{item.price}</td>
              <td>{item.quantity} 개</td>
              <td>₩ {item.price * item.quantity}</td>
              <td>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default HistoryPage