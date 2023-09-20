import { getDiscount } from '@/utils/helper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({data: {attributes:product, id}}) => {
  const discount = getDiscount(product?.original_price, product?.price);
  return (
    <Link href={`/product/${product?.slug}`} className='hover:scale-105 duration-200 overflow-hidden'>
        <Image src={product?.thumbnail.data.attributes.url} width={500} height={500} alt={product?.name} />
        <div className="p-4 text-black/[0.9]">
            <h2 className="text-lg font-medium">{product?.name}</h2>
            <div className="flex items-center text-black/[0.5]">
                <p className="mr-2 text-lg font-semibold">&#8377; {product?.price}</p>
                {
                  product?.original_price && (
                    <>
                      <p className="text-base font-medium line-through">&#8377; {product?.original_price}</p>
                      <p className="text-lg font-medium text-green-500 ml-auto">{discount}% off</p>
                    </>
                  )
                }
            </div>
        </div>
    </Link>
  )
}

export default ProductCard