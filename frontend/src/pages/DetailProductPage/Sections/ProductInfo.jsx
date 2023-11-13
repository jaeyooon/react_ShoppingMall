import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/thunkFunctions';

const ProductInfo = ({ product }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user?.userData)

    const handleClick = () => {
        dispatch(addToCart({productId: product._id}))  // addToCart 라는 thunkFunction, productId로 해당 상품을 장바구니에 추가하도록
    }

    return (
      <div>
        <div className="flex flex-wrap">
        <h1 className="flex-auto lg:w-64 sm:w-32 text-2xl font-semibold text-slate-900">
          {product.title}
        </h1>
        <div className="flex-auto lg:w-32 sm:w-24 text-lg font-semibold text-slate-500">
          {product.price} 원
        </div>
        <div className="w-full flex-none text-md font-medium text-slate-700 mt-2">
        </div>
        </div>
        <p className='lg:mt-14 sm:mt-8'><span className='font-semibold text-gray-900'>설명:</span> {product.description}</p>
        {/* <ul>
          <li><span className='font-semibold text-gray-900'>가격:</span> {product.price} 원</li>
          <li><span className='font-semibold text-gray-900'>팔린 개수:</span> {product.sold} 개</li>
          <li><span className='font-semibold text-gray-900'>설명:</span> {product.description}</li>
        </ul> */}

        <div className='mt-5'>
          {user.role === 0 &&
            <button 
            onClick={handleClick}
            className='lg:w-64 sm:w-48 px-4 py-2 text-white bg-stone-800 hover:bg-neutral-700 rounded-md'>
              장바구니
            </button>
          }          
        </div>
      </div>
    )
}

export default ProductInfo