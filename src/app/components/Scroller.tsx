"use client"
import AltImage from "../../../public/images/alt.png";
import Forbes from "../../../public/images/Forbes.png";
import Guardian from "../../../public/images/Guardian.webp";
import NYT from "../../../public/images/NYT.png";
import CNN from "../../../public/images/cnn.png";
import ESPN from "../../../public/images/espn.png";
import Wired from "../../../public/images/wired.png";
import { useEffect } from "react";



const Scroller = () => {
    const images = [
        {src: Forbes},
        {src: Guardian},
        {src: NYT},
        {src: ESPN},
        {src: Wired},
        {src: CNN}
      ]
      useEffect(() => {
        const scroller = document.querySelector("#scroller__inner")
        const scrollerContent = Array.from(scroller.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          // console.log(duplicatedItem);
          scroller?.appendChild(duplicatedItem);
        })
      }, [])
      
      

  return (
    <div className="flex gap-32 items-center max-w-full mask-gradient overflow-hidden" id="scroller">
          <div className='flex gap-32 py-4 animate-loop-scroll max-w-max' id="scroller__inner">
            {
              images.map((image, idx) => (
                <div key={idx} className='w-[128px] h-[128px]'>
                  <img src={image.src.src} alt={AltImage.src} className='w-full h-full object-contain rounded-xl '/>
                </div>
              ))
            }
          </div>
          {/* <div className='flex space-x-32'>
            {
              images.map((image, idx) => (
                <div key={idx} className='w-[128px] h-[128px]'>
                  <img loading='lazy' src={image.src.src} alt="no image" className='w-full h-full object-contain rounded-xl'/>
                </div>
              ))
            }
          </div>
          <div className='flex space-x-32'>
            {
              images.map((image, idx) => (
                <div key={idx} className='w-[128px] h-[128px]'>
                  <img loading='lazy' src={image.src.src} alt="no image" className='w-full h-full object-contain rounded-xl'/>
                </div>
              ))
            }
          </div> */}
    </div>
  )
}

export default Scroller