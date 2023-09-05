import React from 'react'
import { useNavigate } from 'react-router'

function Card({title, banner, genre, id_movie}) {
    const navigate = useNavigate()

   return (
    <>
        <div className='relative '>
            <div className='group bg-black rounded-md'>
                <img className='shadow-xl h-64 w-full sm:h-96 group-hover:opacity-25 hover:opacity-25 object-center' src={banner} alt="movie-banner" />

                    <div className='invisible group-hover:visible flex flex-col absolute top-14 md:top-32 left-0 right-0 mx-auto justify-center items-center'>
                        <button onClick={() => navigate(`/buy_ticket/${id_movie}`)} className=' btn bg-inherit text-white hover:text-slate-500 border-2 w-20 md:w-44 capitalize mb-5'>Details</button>
                        <button onClick={() => navigate(`/buy_ticket/${id_movie}`)} className='bg-blue-700 hover:bg-white hover:text-blue-700 text-white font-bold py-3 px-4 rounded-lg text-xs md:text-base w-20 md:w-44 capitalize'>Buy Tickets</button>
                    </div>
                
            </div>
            <div className='pt-8'>
                <span className=' md:text-lg lg:text-xl font-medium '>{title}</span>
                <div className='grid grid-cols-2 gap-2'>
                    <span className='btn rounded-full text-slate-400 cursor-default capitalize mt-5 text-sm md:text-base'>{genre[0]}</span>
                    {
                        genre[1] !== undefined ?                      
                        <span className='btn rounded-full text-slate-400 cursor-default capitalize mt-5 text-sm md:text-base'>{genre[1]}</span>
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
