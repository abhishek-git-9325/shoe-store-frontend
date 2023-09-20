import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import fetchDataFromAPI from '@/utils/api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const maxResults = 3;

const Category = ({category, products, slug}) => {
    const [pageIndex, setPageIndex] = useState(1);
    const {query} = useRouter();
    useEffect(() => {
        setPageIndex(1);
    },[query]);
    const { data: productData, error, isLoading } = useSWR(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResults}`,fetchDataFromAPI, {
        fallbackData: products
    });
    return (
        <div className='w-full md:py-20 relative'>
            <Wrapper>
                <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        {category?.data?.[0]?.attributes?.name}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {
                        productData?.data?.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))
                    }
                </div>
                {/* PAGINATION BUTTONS START */}
                {productData?.meta?.pagination?.total > maxResults && (
                        <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                            <button
                                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                                disabled={pageIndex === 1}
                                onClick={() => setPageIndex(pageIndex - 1)}
                            >
                                Previous
                            </button>

                            <span className="font-bold">
                                {`${pageIndex} of ${
                                    productData && productData.meta.pagination.pageCount
                                }`}
                            </span>

                            <button
                                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                                disabled={
                                    pageIndex ===
                                    (productData && productData.meta.pagination.pageCount)
                                }
                                onClick={() => setPageIndex(pageIndex + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {/* PAGINATION BUTTONS END */}
                    {isLoading && (
                        <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                            <img src="/logo.svg" width={150} />
                            <span className="text-2xl font-medium">Loading...</span>
                        </div>
                    )}
            </Wrapper>
        </div>
    )
}

export default Category;

export async function getStaticPaths() {
    const category = await fetchDataFromAPI('/api/categories?populate=*');

    const paths = category?.data?.map((item) => ({
        params: { slug: item.attributes.slug },
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: {slug} }) {
    const category = await fetchDataFromAPI(`/api/categories?filters[slug][$eq]=${slug}`);
    const products = await fetchDataFromAPI(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResults}`);

    return {
        props: {
            category,
            products,
            slug
        }
    }
}