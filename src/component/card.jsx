import React from 'react'
import banner from '../assets/movie-banner1.png'

function Card() {
  return (
    <>
        <div className='relative'>
            <img src={banner} alt="movie-banner" />
            <div className=''>
                <div className='flex flex-col absolute top-40 left-12'>
                    <button className='btn bg-inherit text-white border-2 w-44 capitalize mb-5'>Details</button>
                    <button className='btn bg-blue-700 text-white w-44 capitalize'>Buy Tickets</button>
                </div>
            </div>
            <div className='pt-8'>
                <span className='text-xl font-medium'>Black Widow</span>
                <div className='grid grid-cols-2 gap-2'>
                    <span className='btn rounded-full text-slate-400 cursor-default capitalize mt-5'>Action</span>
                    <span className='btn rounded-full text-slate-400 cursor-default capitalize mt-5'>Adventure</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card
