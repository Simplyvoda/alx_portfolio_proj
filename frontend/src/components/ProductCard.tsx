import { IProduct } from '@/models/product-model'
import React from 'react'

const ProductCard = ({product}:{product: IProduct}) => {
  return (
    <>
    <div className='w-full bg-[#EBEBEB] h-[auto] min-h-[24rem] rounded-lg p-4'>
        <div className='bg-red h-10 w-full rounded-lg'>

        </div>

        <p>{product.title}</p>
        <p>{product.price}</p>
        <button onClick={() => window.location.href(`${product?.link}`, blank)}>Buy Now </button>
        <p>from price pally</p>
    </div>
    </>
  )
}

export default ProductCard