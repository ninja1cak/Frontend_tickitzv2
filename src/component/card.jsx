import React from 'react'
import banner from '../assets/movie-banner1.png'

function Card({title, banner, genre}) {
  return (
    <>
        <div className='relative '>
            <div className='group bg-black rounded-md'>
                <img className='shadow-xl h-96 group-hover:opacity-25 hover:opacity-25' src={banner} alt="movie-banner" />
                <div className=''>
                    <div className='invisible group-hover:visible flex flex-col absolute top-32 left-10'>
                        <button className=' btn bg-inherit text-white hover:text-slate-500 border-2 w-44 capitalize mb-5'>Details</button>
                        <button className='bg-blue-700 hover:bg-white hover:text-blue-700 text-white font-bold py-3 px-4 rounded-lg w-44 capitalize'>Buy Tickets</button>
                    </div>
                </div>
            </div>
            <div className='pt-8'>
                <span className='text-xl font-medium'>{title}</span>
                <div className='grid grid-cols-2 gap-2'>
                    <span className='btn rounded-full text-slate-400 cursor-default capitalize mt-5'>{genre[0]}</span>
                    {
                        genre[1] !== undefined ?                      
                        <span className='btn rounded-full text-slate-400 cursor-default capitalize mt-5'>{genre[1]}</span>
                        :
                        <>
                        </>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Card
