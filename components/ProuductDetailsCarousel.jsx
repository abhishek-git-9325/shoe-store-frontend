import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ProuductDetailsCarousel = ({images}) => {
  return (
    <div className='sticky top-[50px] text-white text-[20px] w-full max-w-[1360px] max-auto'>
        <Carousel infiniteLoop={true} showIndicators={false} showStatus={false} thumbWidth={60} className='productCarousel' 
        >
            {
              images.map((img,i)=>{
                return(
                  <img key={i} src={img.attributes.url}></img>
                )
              })
            }
        </Carousel>
    </div>
  )
}

export default ProuductDetailsCarousel