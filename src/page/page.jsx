import React, { useState } from 'react'
import Header from '../component/header'
import Footer from '../component/footer'
import bgHero from '../assets/hero-bg-login.png'
import Card from '../component/card'


function Page() {
  const [slider, setSlider] = useState(1)
  // const [sliderActive, setSliderActive] = useState(1)
  
  let slideIndex = 1


  const handleSlider = (e) => {
    slideIndex = e
  }
  // const handlerSliderActive = (e) => {
  //   setSliderActive(e)
  // }

  return (
    <>
        <Header />
        <div className='h-screen flex flex-col'>
          <div className='h-5/6 relative'>
            <div className='w-full h-1/2'>
              <img className='w-full h-full object-cover object-top' src={bgHero} alt="" />
            </div>
            <div className='absolute top-20 left-20 text-white'>
              <div className='w-1/2 flex flex-col'>
                <span className='text-2xl font=semibold mb-4'>LIST MOVIE OF THE WEEK</span>
                <span className='text-5xl leading-tight'>Experience the Magic of Cinema: Book Your Ticket Today</span>
              </div>
              <div className='flex justify-center items-center gap-5 pt-12'>
                <div className={ slideIndex === 1 ? 'w-16 h-2 bg-blue-700 rounded-lg cursor-pointer' : 'w-2 h-2 bg-white rounded-lg cursor-pointer'} ></div>
                <div className={ slideIndex == 2 ? 'w-16 h-2 bg-blue-700 rounded-lg cursor-pointer' : 'w-2 h-2 bg-white rounded-lg cursor-pointer'} ></div>
                <div className={ slideIndex == 3 ? 'w-16 h-2 bg-blue-700 rounded-lg cursor-pointer' : 'w-2 h-2 bg-white rounded-lg cursor-pointer'} ></div>
              </div>
            </div>
          </div>
          <div className='absolute top-2/3'>
            <div className='grid grid-cols-4 gap-16 py-20 px-20'>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
          <div>3</div>
        </div>
        <div className='sticky-top-0'>
          <Footer />
        </div>
    </>

  )
}

export default Page