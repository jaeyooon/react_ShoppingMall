import React, { useState, useEffect } from 'react';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchInput from './Sections/SearchInput';
import CardItem from './Sections/CardItem';
import axiosInstance from '../../utils/axios';
import { continents, prices } from '../../utils/filterData';

const LandingPage = () => {

  const limit = 4;    // 처음 데이터를 가져올 때와 더보기 버튼을 눌러서 가져올 때 몇 개의 데이터를 한번에 가져오는지
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);  // 몇번째부터 상품 데이터를 가져와야하는지(몇 개의 상품을 skip하는지), ex) 4개를 가져온 후엔 +4 해줌
  const [hasMore, setHasMore] = useState(false);  // 더 가져올 product가 있는지 확인,  true 일때만 더보기를 보여주면 됨!
  const [filters, setFilters] = useState({    // 필터 기능을 하는데 필요한 state
    continents: [],
    price: []
  })
  
  useEffect(() => {
    fetchProducts({ skip, limit });
  }, [])  // 컴포넌트가 마운트된 다음에 한번만 렌더링 될 수 있도록 두번째 파라미터 빈 배열로

  const fetchProducts = async ({ skip, limit, loadMore = false, filters = {}, searchTerm = "" }) => { // 비동기 요청
    const params = {  // 객체 생성
      skip,
      limit,
      filters,
      searchTerm
    }
    try {
      const response = await axiosInstance.get('/products', { params })

      if(loadMore) {
        setProducts([...products, ...response.data.products]);   // 원래 있던 상품 state에 새로 가져온 상품 데이터를 더해줌
      } else {
        setProducts(response.data.products);    // get 요청을 통해 백엔드로부터 받아온 데이터를 `products` state 에 넣어줌.
      }   
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      searchTerm
    }
    fetchProducts(body);
    setSkip(skip + limit);
  }

  const handleFilters = (newFilteredData, category) => {
    const newFilters = {...filters};  // state의 불변성을 지켜주기 위해 Spread Operator 를 이용해서 얕은 복사를 해줌.
    newFilters[category] = newFilteredData;

    if(category === 'price') {
      const priceValues = handlePrice(newFilteredData);   // newFilteredData에 들어올 때는 _id 값이므로 이를 prices의 array 값이 들어가도록 하기 위해 함수 호풀
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);   // filters state 업데이트
  }

  const handlePrice = (value) => {
    let array = [];

    for(let key in prices) {
      if(prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array;
      }
    }
    return array;
  }

  const showFilteredResults = (filters) => {  // 필터링 된 것에 해당되는 데이터를 백엔드에 요청에서 가져오도록 함.
    //console.log(filters);
    const body = {
      skip: 0,  // 필터링 된 것들로 데이터를 새롭게 가져오는 것이므로 첫 번째부터 상품 정렬
      limit,
      filters,
      searchTerm
    }

    fetchProducts(body);
    setSkip(0);
  }

  const handleSearchTerm = (event) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: event.target.value
    }
    setSkip(0);
    setSearchTerm(event.target.value);
    fetchProducts(body);
  }

  return (
    <section>
      <div className='text-center m-7 text-gray-800'>
        <span className='text-xl font-semibold italic underline decoration-double decoration-blue-400/40 underline-offset-4'>그곳이 어디든</span><span className='text-xl font-medium'>, Smile Tour :D</span>
      </div>

      {/* Filter */}
      <div className='flex gap-3'>
        <div className='w-1/2'>
          <CheckBox continents={continents} checkedContinents={filters.continents}  // checkedContinents 에는 체크박스에서 클릭한 것들이 continents 배열에 들어감.
            onFilters={filters => handleFilters(filters, "continents")}
          />
        </div>
        <div className='w-1/2'>
          <RadioBox prices={prices} checkedPrice={filters.price} 
            onFilters={filters => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/* Search */}
      <div className='flex justify-end mb-3'>      
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      {/* Card */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>   {/* sm보다 커지면 하나의 row에 4개의 아이템들이 나오고, 작아지면 2개의 아이템이 나오도록 */}
        {products.map(product => 
          <CardItem product={product} key={product._id} />    // products 배열이므로 map을 통해 하나의 product 순회하면서 CardItem 나열, CardItem에 product를 prop으로 내려줌. 
        )}
      </div>

      {/* LoadMore 더보기 */}
      {hasMore &&     // hasMore 상태값이 true일 때만 더보기 부분 렌터링
        <div className='flex justify-center mt-5'>
        <button 
          onClick={handleLoadMore}
          className='px-4 py-2 mt-5 text-white bg-stone-800 rounded-md hover:bg-neutral-700'>
          더보기
        </button>
      </div>
      }
    </section>
  )
}

export default LandingPage