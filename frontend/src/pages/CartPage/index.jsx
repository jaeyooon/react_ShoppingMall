import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, payProducts, removeCartItem } from '../../store/thunkFunctions';
import CartTable from './Sections/CartTable';

const CartPage = () => {

  const userData = useSelector(state => state.user?.userData);
  const cartDetail = useSelector(state => state.user?.cartDetail);

  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    
    let cartItemIds = []

    if(userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach(item => {
        cartItemIds.push(item.id);
      })

      const body = {
        cartItemIds,
        userCart: userData.cart
      }

      dispatch(getCartItems(body))
    }

  }, [dispatch, userData])
  
  useEffect(() => {
    
    calculateTotal(cartDetail)

  }, [cartDetail])

  
  const calculateTotal = (cartItems) => {
    let total = 0;

    cartItems.map(item => total += item.price * item.quantity)
    setTotal(total);  // total state 업데이트
  }
  
  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));   // removeCartItem()이라는 thunkFunction 
  }

  const handlePaymentClick = () => {
    dispatch(payProducts({cartDetail: cartDetail}))   // payProducts() 라는 thunkFunction
  }

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>나의 장바구니</h2>
      </div>

      {cartDetail?.length > 0 ?
        <>
          <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />
          <div className='mt-10 flex justify-end items-center'>
            <span className='font-bold pr-1'>합계:</span><span>{total} 원</span>
            <button
              className='ml-5 mb-5 text-white bg-stone-800 hover:bg-neutral-600 rounded-md px-4 py-2 mt-5'
              onClick={handlePaymentClick}
            >
              결제하기
            </button>
          </div>
        </>
        :
        <p>장바구니가 비었습니다.</p>
      }
    </section>
  )
}

export default CartPage