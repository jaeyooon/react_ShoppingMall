import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageSlider = ({images}) => {     // 부모 컴포넌트인 CardItem으로부터 상품의 이미지를 prop으로 가져옴.
  return (
        <Carousel autoPlay showThumbs={false} infiniteLoop>
            {images.map(image => (  // map 메소드로 하나씩 순회하며 이미지 렌더링
                <div key={image}>
                    <img 
                        src={`${import.meta.env.VITE_SERVER_URL}/${image}`}     //이미지는 백엔드에 저장되어있음.
                        alt={image}
                        className='w-full lg:max-h-[120px] md:max-h-[100px] sm:max-h-[76px]' 
                    />                      
                </div>
            ))}         
        </Carousel>
  )
}

export default ImageSlider