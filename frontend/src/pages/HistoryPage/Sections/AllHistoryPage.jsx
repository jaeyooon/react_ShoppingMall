import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axios'
import dayjs from 'dayjs'

const AllHistoryPage = () => {

    const [allPayments, setAllPayments] = useState([])

    useEffect(() => {
      fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/users/allPayments');
            console.log(response.data.allPayments);
            setAllPayments(response.data.allPayments);
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <section>
            <div className='text-center m-7'>
                <h2 className='text-2xl'>전체 주문 내역</h2>
            </div>

            <table className='w-full text-left text-gray-500'>
                <thead className='border-[1px]'>
                <tr>
                    <th className='w-52'>
                    회원
                    </th>
                    <th className='w-52'>
                    상품 & 수량
                    </th>
                    <th className='w-52'>
                    총금액
                    </th>
                    <th className='w-52'>
                    주문 날짜
                    </th>
                </tr>
                </thead>

                <tbody>
                {allPayments?.map(payment => (
                    <tr className='border-b' key={payment._id}>
                        <td>
                            {payment.user.name}님
                        </td>
                        <td>
                            {payment.product.map(item => (
                                <div key={item._id}>
                                    <span>{item.name} </span>
                                    <span className='text-sky-700'>🔖x {item.quantity}매</span>
                                </div>                   
                            ))}
                        </td>
                        <td>
                            {payment.product.map(item => (
                                <div key={item._id}>
                                    <span>₩{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </td>
                        <td>
                            {payment.product.map(item => (
                                <div key={item._id}>
                                    <span>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD')}</span>
                                </div>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}

export default AllHistoryPage