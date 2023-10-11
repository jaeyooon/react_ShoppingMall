import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';

const CardItem = ({ product }) => {     // 부모 컴포넌트인 LandingPage로부터 product를 prop으로 가져옴.
  return (
    <div className='border-[1px] border-gray-300'>
        <ImageSlider images={product.images} />     {/* 상품의 이미지를 prop으로 내려줌. */}
        <Link to={`/product/${product._id}`}>   {/* 누르면 상세페이지로 이동 */}
            <p className='p-1'>{product.title}</p>
            <p className='p-1'>{product.continents}</p>
            <p className='p-1 text-xs text-gray-500'>{product.price}원</p>
        </Link>
    </div>
  )
}

export default CardItem