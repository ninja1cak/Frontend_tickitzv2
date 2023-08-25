import React from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import Poster from '../../assets/spiderman logo.svg'
import Dummy from '../../assets/Screenshot from 2023-08-25 02-38-15.png'
import Cinema from '../../assets/Vector.png'
import { AiOutlineCheck } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function order_page() {
  return (
    <>
        <Header />
        <div className='bg-gray-100'>
        <div className='flex justify-center gap-x-5 absolute right-0 left-0 top-32'>
                    <a className='flex flex-col justify-center items-center'>
                        <div className='h-10 w-10 flex justify-center items-center rounded-full bg-lime-600 text-white'><AiOutlineCheck /></div>
                        <span className='text-sm'>Dates And Time</span>
                    </a>
                    <div>
                        <span className='text-xl'>- - - - -</span>
                    </div>
                    <a className='flex flex-col justify-center items-center'>
                        <div className='h-10 w-10 flex justify-center items-center rounded-full bg-blue-600 text-white'>2</div>
                        <span className='text-sm'>Seat</span>
                    </a>
                    <div>
                        <span className='text-xl'>- - - - -</span>
                    </div>
                    <a className='flex flex-col justify-center items-center'>
                        <div className='h-10 w-10 flex justify-center items-center rounded-full bg-slate-400 text-white'>3</div>
                        <span className='text-sm'>Payment</span>
                    </a>
                </div>
            <div className="max-w-7xl mx-auto">
                <div className='pt-32 pb-5'>
                    <div className="grid grid-cols-3 gap-4 grid-flow-row grid-">
                        <div className="p-5 bg-white row-start-1 row-end-4 col-start-1 col-end-3 rounded-lg h-fit">
                            <div className='border w-11/12 h-52 mx-auto flex gap-x-4 rounded-lg mt-5'>
                                <img src={Poster} className="relative w-2/6 h-5/6 object-cover my-auto object-top rounded mt-3 ml-3" alt="" />
                                <div>
                                    <div className=''>
                                        <h1 className='font-bold text-lg m-2'>SPIDERMAN: HOMECOMING</h1>
                                        <div className='flex gap-x-2 mt-5'>
                                            <h2 className='w-32 text-base bg-gray-100 border text-center rounded-full'>Action</h2>
                                            <h2 className='w-32 text-base bg-gray-100 border text-center rounded-full'>Adventure</h2>
                                        </div>
                                        <h2 className='mt-5'>Regular - 13:00 PM</h2>
                                    </div>
                                </div>
                                <div className='relative'>
                                    <button className="absolute bottom-0 left-16 my-2 mr-2 border h-12 object-bottom w-24 bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary ">Change</button>
                                </div>
                            </div>
                            <div className='mb-5'>
                                <div className='w-11/12 mx-auto'>
                                    <h1 className='font-bold text-2xl mt-10'>Choose Your Seat</h1>
                                </div>
                                <div className='mt-10 relative'>
                                    <img src={Dummy} alt="" className='' />
                                </div>
                            </div>
                        </div>
                        <div className="p-5 bg-white col-start-3 col-end-4 rounded-lg">
                            <div className='text-center mt-8'>
                                <img className='mx-auto w-36 h-auto' src={Cinema} alt="" />
                                <h1 className='mt-4 text-2xl font-semibold'>CineOne21 Cinema</h1>
                            </div>
                            <div className='flex justify-between mt-5'>
                                <div className='flex flex-col gap-y-4 text-gray-600'>
                                    <h2>Movie selected</h2>
                                    <h2>Tuesday, 07 July 2020</h2>
                                    <h2>One ticket price</h2>
                                    <h2>Seat choosed</h2>
                                </div>
                                <div className='flex flex-col gap-y-4 font-medium'>
                                    <h2>Spider-Man: Homecoming</h2>
                                    <h2>13:00pm</h2>
                                    <h2>$10</h2>
                                    <h2>C4, C5, C6</h2>
                                </div>
                            </div>
                            <hr className='mt-10' />
                            <div className='flex justify-between mt-10 mb-10'>
                                <h2 className='text-xl font-medium'>Total Payment</h2>
                                <h2 className='text-xl font-bold text-primary'>$30</h2>
                            </div>
                        </div>
                        <Link className=" border h-16 mt-6 w-full bg-primary mx-auto items-center flex justify-center text-white rounded-md hover:bg-white hover:text-primary" to='/payment_info'>Checkout Now</Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default order_page