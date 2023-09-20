import HeroBanner from '@/components/HeroBanner'
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import SEO from '@/components/seo'
import Image from 'next/image'
import fetchDataFromAPI from '@/utils/api'
import { useEffect,useState } from 'react'

export default function Home({ products }) {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  
  // const fetchProducts = async () => {
  //   const { data } = await fetchDataFromAPI('/api/products');
  //   setData(data);
  // }
  return (
    <>
    <main
      className={`flex min-h-screen flex-col items-center justify-between`}
    >
      <HeroBanner />
      <h1>{products?.data?.[0]?.attributes?.name}</h1>
      <Wrapper>
        <div className='text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]'>
          <h2 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Cushioning for Your Miles
          </h2>
          <p className="text-lg md:text-xl">
              A lightweight Nike ZoomX midsole is combined with
              increased stack heights to help provide cushioning
              during extended stretches of running.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {
            products?.data?.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))
          }
        </div>
      </Wrapper>
    </main>
    </>
  )
}

export async function getStaticProps() {
  const products = await fetchDataFromAPI('/api/products?populate=*');
  return {
    props: {
      products
    }
  };
}
