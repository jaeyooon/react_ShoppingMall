import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/thunkFunctions';

const ProductInfo = ({ product }) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addToCart({productId: product._id}))  // addToCart 라는 thunkFunction, productId로 해당 상품을 장바구니에 추가하도록
    }

    return (
      <div>
        <p className='text-xl text-bold'>상품 정보</p>

        <ul>
          <li><span className='font-semibold text-gray-900'>가격:</span> {product.price} 원</li>
          <li><span className='font-semibold text-gray-900'>팔린 개수:</span> {product.sold} 원</li>
          <li><span className='font-semibold text-gray-900'>설명:</span> {product.description} 원</li>
        </ul>

        <div className='mt-3'>
          <button 
            onClick={handleClick}
            className='w-full px-4 py-2 text-white bg-black hover:bg-gray-700 rounded-md'>
              장바구니
          </button>
        </div>
      </div>
    )
}

export default ProductInfo