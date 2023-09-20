import ProuductDetailsCarousel from '@/components/ProuductDetailsCarousel';
import RelatedProducts from '@/components/RelatedProducts';
import Wrapper from '@/components/Wrapper';
import fetchDataFromAPI from '@/utils/api';
import { getDiscount } from '@/utils/helper';
import React, { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { addToCart } from '@/store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = ({ product, products }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [showError, setshowError] = useState(false);
    const productItem = product?.data?.[0].attributes;
    const discount = getDiscount(productItem?.original_price, productItem?.price);
    // const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    const notify = () => {
        toast.success('Success. Check your cart!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

  return (
    <div className='w-full md:py-10'>
        <ToastContainer />
        <Wrapper>
            <div className="flex flex-col lg:flex-row md:px-10 gap-[50px]">
                <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full">
                    <ProuductDetailsCarousel images={productItem?.image.data} />
                </div>
                <div className="flex-[1] py-3">
                    <h2 className="text-[34px] font-semibold mb-2 leading-tight">{productItem?.name}</h2>
                    <p className="text-lg font-semibold mb-5">{productItem?.subtitle}</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold">MRP : &#8377;{productItem?.price}</p>
                            {
                                productItem?.original_price && (
                                    <>
                                        <p className="text-base font-medium line-through leading-none">&#8377;{productItem?.original_price}</p>
                                        <p className="text-lg font-medium text-green-500 ml-auto">{discount}% off</p>
                                    </>
                                )
                            }
                    </div>
                    <p className="text-md font-medium text-black/[0.5]">incl. of taxes</p>
                    <p className="text-md font-medium text-black/[0.5] mb-10">{`(Also Includes all applicable duties)`}</p>

                    <div className="mb-8">
                        <div className="flex justify-between mb-4">
                            <div className="text-md font-semibold">
                                Select Size
                            </div>
                            <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                Select Guide
                            </div>
                        </div>

                        <div id="sizeGrid" className="grid grid-cols-3 gap-2">
                            {
                                productItem?.size?.data?.map((item, index) => (
                                    <div key={index} 
                                    className={`border-2 rounded-md text-center py-3 font-medium ${item.enabled? "hover:border-black cursor-pointer" : "bg-black/[0.1] cursor-not-allowed opacity-50"} ${selectedSize === item.size && "border-black"}`}
                                    onClick={() => {
                                        setSelectedSize(item.size)
                                        setshowError(false)
                                    }
                                    }
                                    >{item.size}</div>
                                ))
                            }
                        </div>
                        {
                            showError && (
                                <p className="text-red-600 mt-3">Size selection is required</p>
                            )
                        }
                    </div>

                    <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                    onClick={() => {
                        if(!selectedSize) {
                            setshowError(true)
                            document.getElementById('sizeGrid').scrollIntoView({block:'center', behavior: 'smooth'})
                            return;
                        }
                        dispatch(addToCart({...product?.data?.[0], selectedSize: selectedSize, singleQuantityPrice : productItem.price}))
                        notify();
                    }}
                    >Add to Cart</button>
                    <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">WishList <IoMdHeartEmpty size={20} /></button>

                    <div>
                        <p className="text-lg font-bold mb-5">Product Details</p>
                        <div className="markdown text-md mb-5">
                            <ReactMarkdown>
                                {productItem.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedProducts products={products} />
        </Wrapper>
    </div>
  )
}

export default ProductDetails;

export async function getStaticPaths() {
    const products = await fetchDataFromAPI('/api/products?populate=*');

    const paths = products?.data?.map((item) => ({
        params: { slug: item.attributes.slug },
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: {slug} }) {
    const product = await fetchDataFromAPI(`/api/products?populate=*&filters[slug][$eq]=${slug}`);
    const products = await fetchDataFromAPI(`/api/products?populate=*&[filters][slug][$ne]=${slug}`);

    return {
        props: {
            product,
            products
        }
    }
}