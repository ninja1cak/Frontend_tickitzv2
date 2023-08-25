import React from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import Poster from '../../assets/spiderman logo.svg'
import Dummy from '../../assets/Screenshot from 2023-08-25 02-38-15.png'
import Cinema from '../../assets/Vector.png'
import { AiOutlineCheck } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import backg from '../../assets/logo cinema/Group 7.svg'
import qr from '../../assets/logo cinema/QR Code 1.svg'
import logo from '../../assets/tickitz 1.png'
import { BsArrowRight } from 'react-icons/bs'

function check_payment() {
  return (
    <>
        <Header />
        <div className='bg-gray-100'>
            <div className="mx-auto">
            <div className='absolute z-10 inset-y-0 left-44 top-1/2 flex flex-col gap-y-10'>
                <img className='w-96 h-auto' src={logo} alt="" />
                <h2 className='text-white text-7xl font-bold'>Thankyou For Purchasing</h2>
                <h3 className='text-gray-400 text-3xl'>Lorem ipsum dolor sit amet consectetur. <br />Quam pretium pretium tempor integer sed magna et.</h3>
                <h3 className='flex items-center gap-x-4 text-white text-2xl'>Please Download Your Ticket<BsArrowRight /></h3>
            </div>
                <div className='flex justify-between relative'>
                    <img className='w-2/3' src={backg} alt="" />
                    <div className='absolute inset-y-0 right-32 bottom-0 my-auto bg-white w-1/6 h-1/2 rounded-lg ml-92'>
                        <img className='mx-auto relative top-24' src={qr} alt="" />
                        <hr className='relative top-40' />
                        <div className='relative flex justify-around top-56'>
                            <div>
                                <div className='flex flex-col gap-y-4'>
                                    <h3 className='text-gray-400 text-base'>Movie</h3>
                                    <h2 className='text-lg font-medium'>Spider-Man: ..</h2>
                                </div>
                                <div className='flex flex-col gap-y-4'>
                                    <h3 className='text-gray-400 text-base'>Date</h3>
                                    <h2 className='text-lg font-medium'>07 Jul</h2>
                                </div>
                                <div className='flex flex-col gap-y-4'>
                                    <h3 className='text-gray-400 text-base'>Count</h3>
                                    <h2 className='text-lg font-medium'>3 pcs</h2>
                                </div>
                            </div>
                            <div>
                                <div className='flex flex-col gap-y-4'>
                                    <h3 className='text-gray-400 text-base'>Category</h3>
                                    <h2 className='text-lg font-medium'>PG-13</h2>
                                </div>
                                <div className='flex flex-col gap-y-4'>
                                    <h3 className='text-gray-400 text-base'>Time</h3>
                                    <h2 className='text-lg font-medium'>2:00pm</h2>
                                </div>
                                <div className='flex flex-col gap-y-4'>
                                    <h3 className='text-gray-400 text-base'>Seats</h3>
                                    <h2 className='text-lg font-medium'>C4, C5, C6</h2>
                                </div>
                            </div>
                        </div>
                        <div className='flex relative top-72 justify-around w-11/12 h-12 border border-gray-400 mx-auto items-center rounded'>
                            <h2>Total</h2>
                            <h2>$30.00</h2>
                        </div>
                        <div className='relative top-96 flex flex-col gap-y-4'>
                        <Link className="h-16 object-bottom w-full bg-white mx-auto items-center flex justify-center text-primary rounded-lg hover:bg-primary hover:text-white border">Download</Link>
                            <Link lassName="h-16 object-bottom w-full bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary border">Done</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default check_payment