import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';

const continents = [
  {key: 1, value: 'Africa'},
  {key: 2, value: 'Europe'},
  {key: 3, value: 'Asia'},
  {key: 4, value: 'North America'},
  {key: 5, value: 'South America'},
  {key: 6, value: 'Australia'},
  {key: 7, value: 'Antarctica'},
]

const UploadProductPage = () => {

  const [product, setProduct] = useState({    // State 생성
    title: '',
    description: '',
    price: 0,
    continents: 1,
    images: []
  })

  const userData = useSelector(state => state.user?.userData);  // 현재 로그인한 유저 정보 redux에서 가져옴.
  const navigate = useNavigate()  // react hooks

  const handleChange = (event) => {   // State 업데이트, onChange 이벤트 발생했을때 이 함수 호출
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value   // 원래 있던 거에 새로운 값을 넣어서 오버라이드해줌.
    }))
  }

  const handleImages = (newImages) => {   
    setProduct((prevState) => ({
      ...prevState,
      images: newImages   
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();     // 페이지 refresh 되는것을 막아줌.

    // 상품 정보를 가지고 백엔드에 요청을 보냄.

    const body = {
      writer: userData.id,
      ...product    // product state 정보를 가져옴.
    }

    try {
      await axiosInstance.post('/products', body);   // 요청을 해서 응답이 올때까지 기다림(await)
      navigate('/');
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <section>
      <div className='text-center m-7'>
        <h1>예상 상품 업로드</h1>
      </div>

      <form className='mt-6' onSubmit={handleSubmit}>   {/* margin top */}

        <FileUpload images={product.images} onImageChange={handleImages} />

        <div className='mt-4'>
          <label htmlFor='title'>이름</label>   {/* input의 id와 같은걸 넣어줌 */}
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="title" id="title" onChange={handleChange} value={product.title}   // product state
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='description'>설명</label>   {/* input의 id와 같은걸 넣어줌 */}
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="description" id="description" onChange={handleChange} value={product.description}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='price'>가격</label>   {/* input의 id와 같은걸 넣어줌 */}
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            type="number" name="price" id="price" onChange={handleChange} value={product.price}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='continents'>지역</label>   {/* input의 id와 같은걸 넣어줌 */}
          <select
            className='w-full px-4 mt-2 bg-white border rounded-md'
            name='continents'  id='continents' onChange={handleChange} value={product.continents}
          >
            {continents.map(item => (
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}
          </select>
        </div>

        <div className='mt-4'>
          <button 
          type='submit'
          className='w-full px-4 text-white bg-black rounded-md hover:bg-gray-700 py-2'>
            생성하기
          </button>
        </div>

      </form>
    </section>
  )
}

export default UploadProductPage