import { removeFromCart, updateCart } from '@/store/cartSlice';
import Image from 'next/image';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

const CartItem = ({data}) => {
    const product = data.attributes;
    const dispatch = useDispatch();
    const updateCartItem = (e, key) =>{
        let payload = {
            key,
            val: key === 'selectedSize' ? e.target.value : parseInt(e.target.value),
            id: data.id
        }
        dispatch(updateCart(payload))
    }
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
        <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
            <Image
                src={product.thumbnail.data.attributes.url}
                alt={product.name}
                width={120}
                height={120}
            />
        </div>

        <div className="w-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                    {product?.name}
                </p>

                <p className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                    {product?.subtitle}
                </p>

                <p className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                    MRP : ₹ {product?.price}
                </p>
            </div>

            <p className="text-md font-medium text-black/[0.5] hidden md:block">
                {product?.subtitle}
            </p>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 md:gap-3 text-black/[0.5] text-sm md:text-md">
                    <div className="flex items-center gap-1">
                        <div className="font-semibold">Size:</div>
                        <select className='hover:text-black p-1 md:py-1 md:px-2'
                         onChange={(e) => updateCartItem(e, 'selectedSize')}
                        >
                            {product.size.data.map((item, index) => (
                                <option key={index} value={item.size} disabled={!item.enabled ? true : false} selected={data.selectedSize === item.size}>{item.size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="font-semibold">Quantity:</div>
                        <select className='hover:text-black p-1 md:py-1 md:px-2' onChange={(e) => updateCartItem(e, 'quantity')}>
                            {
                                Array.from({length: 10}, (_, i) => i+1).map((item, index) => (
                                    <option key={index} value={item} selected={data.quantity === item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" onClick={() => {
                    dispatch(removeFromCart({id: data.id}))
                }}/>
            </div>
        </div>
    </div>
  )
}

export default CartItem