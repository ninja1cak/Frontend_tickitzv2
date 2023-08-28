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
import { useSelector, useDispatch } from 'react-redux'
import { addDataCheckout, addDataBooking } from '../../store/reducer/user'

function Check_payment() {

    const Dispatch = useDispatch()
    const changemovie = () => {
        Dispatch(addDataBooking({}))
        Dispatch(addDataCheckout({}))
    }
    const {dataBooking, dataCheckout, data} = useSelector((s)=>s.users)
  return (
    <>
        <Header />
        <div class="bg-gray-100">
            <div class="xl:grid flex flex-col grid-cols-3 grid-flow-row grid-">
                <div class="text-center bg-white col-start-1 col-end-3">
                <section className="relative md:flex hidden flex-col">
                    <img
                        className="h-full w-full object-cover"
                        src={backg}
                        alt=""
                    />
                    <div className="absolute flex gap-y-6 flex-col w-full h-full justify-center text-left px-12 ">
                        <img className="w-1/2" src={logo} alt="" />
                        <h2 className='text-white text-7xl font-bold'>Thankyou For Purchasing</h2>
                        <h3 className='text-gray-400 text-3xl'>Lorem ipsum dolor sit amet consectetur. <br />Quam pretium pretium tempor integer sed magna et.</h3>
                        <h3 className='flex gap-x-4 text-white text-2xl'>Please Download Your Ticket<BsArrowRight /></h3>
                    </div>
                </section>
                </div>
                <div class="text-center self-center bg-gray-100 col-start-3 col-end-4">
                    <div className='relative mx-auto mt-10 bg-white min-h-full w-96 rounded-lg'>
                            <img className='mx-auto' src={qr} alt="" />
                            <hr className='mt-10' />
                            <div className=' flex justify-around'>
                                <div className='flex flex-col gap-y-6 mt-10'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h3 className='text-gray-400 text-base'>Movie</h3>
                                        <h2 className='text-lg font-medium'>{(dataBooking.title_movie).slice(0,8)} ..</h2>
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <h3 className='text-gray-400 text-base'>Date</h3>
                                        <h2 className='text-lg font-medium'>{(dataBooking.time_playing).slice(0,8)} ..</h2>
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <h3 className='text-gray-400 text-base'>Count</h3>
                                        <h2 className='text-lg font-medium'>{dataCheckout.length} pcs</h2>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-6 mt-10'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h3 className='text-gray-400 text-base'>Category</h3>
                                        <h2 className='text-lg font-medium'>PG-13</h2>
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <h3 className='text-gray-400 text-base'>Time</h3>
                                        <h2 className='text-lg font-medium'>{dataBooking.time}</h2>
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <h3 className='text-gray-400 text-base'>Seats</h3>
                                        <h2 className='text-lg font-medium'>{dataCheckout.join(", ")}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-around w-11/12 h-12 border border-gray-400 relative bottom-5 mt-24 mx-auto items-center rounded'>
                                <h2>Total</h2>
                                <h2>${dataCheckout.length*10}.00</h2>
                            </div>
                        </div>
                        <div className='relative flex flex-col gap-y-4 mt-8 w-96 mx-auto mb-10'>
                            <Link className="h-16 w-full bg-white mx-auto items-center flex justify-center text-primary rounded-lg hover:bg-primary hover:text-white border">Download</Link>
                            <Link to='/' onClick={changemovie}className ="h-16 object-bottom w-full bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary border">Done</Link>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
    </>
  )
}

export default Check_payment