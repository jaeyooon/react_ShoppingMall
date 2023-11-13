import React from 'react'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs';

const CartTable = ({ products, onRemoveItem }) => {

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `${import.meta.env.VITE_SERVER_URL}/${image}`
        }
    }

    const renderItems = (
        products.length > 0 && products.map(product => (
            <tr key={product._id}>
                <td className='w-[110px]'>
                    <Link to={`/product/${product._id}`}>
                        <img 
                            className='w-[100px] h-[70px]'
                            alt='product'
                            src={renderCartImage(product.images)}
                        />
                    </Link>                   
                </td>
                <td className='w-[110px]'>
                    {product.title}
                </td>
                <td className='w-[110px]'>
                    {product.quantity} 개
                </td>
                <td className='w-[110px]'>
                    {product.price} 원
                </td>
                <td className='w-[110px]'>
                    <button
                        onClick={() => onRemoveItem(product._id)}
                    >
                        <BsTrash style={{ fontSize: '1.2rem' }} />
                    </button>
                </td>
            </tr>
        ))
    )

    return (
        <table className='w-full text-left text-gray-500'>
            <thead className='border-[1px]'>
                <tr>
                    <th>상품</th>
                    <th></th>
                    <th>개수</th>
                    <th>가격</th>
                    <th>삭제</th>
                </tr>
            </thead>

            <tbody>
                {renderItems}
            </tbody>
        </table>
    )
}

export default CartTable