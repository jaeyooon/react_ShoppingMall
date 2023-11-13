import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

const DetailProductPage = () => {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {

    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`);
        console.log(response);
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [productId])   // productId가 바뀔 때마다 fetchProduct() 함수 호출
  
  if (!product) return null;

  return (
    <section>

      <div className='mt-20 flex gap-4'>
        <div className='w-1/2'>
          {/* ProductImage */}
          <ProductImage product={product} />    {/* 해당 컴포넌트에 product state를 props로 내려줌. */}
        </div>
        <div className='w-1/2'>
          {/* ProductInfo */}
          <ProductInfo product={product} />
        </div>        
      </div>
    </section>
  )
}

export default DetailProductPage