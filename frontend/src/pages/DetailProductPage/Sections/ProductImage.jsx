import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';


const ProductImage = ({ product }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {

        if (product?.images?.length > 0) {
            let images = [];

            product.images.map(imageName => {
                return images.push({
                    original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                    thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                })
            })

            setImages(images);      // images 넣어줌으로서 images state 업데이트
        }
      
    }, [product])   // product 데이터가 바뀔 때마다 호출
    

    return (
        <ImageGallery items={images} />     // 업데이트된 images state이 items 속성 값으로 들어감.
    )
}

export default ProductImage