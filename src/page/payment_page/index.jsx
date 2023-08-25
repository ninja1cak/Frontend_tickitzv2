import React from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import { AiOutlineCheck } from 'react-icons/ai'
import Payment from '../../assets/New - Payment/Bank BCA Logo (SVG-240p) - FileVector69 1.svg'
import { Link } from 'react-router-dom'

function payment_page() {
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
                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-lime-600 text-white'><AiOutlineCheck /></div>
                    <span className='text-sm'>Dates And Time</span>
                </a>
                <div>
                    <span className='text-xl'>- - - - -</span>
                </div>
                <a className='flex flex-col justify-center items-center'>
                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-blue-600 text-white'>3</div>
                    <span className='text-sm'>Payment</span>
                </a>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className='pt-32 pb-5'>
                <div className="max-w-4xl mx-auto bg-white py-5">
                <div className="m-10 flex flex-col gap-y-4">
                    <h1 className='text-2xl font-medium my-5'>Payment Info</h1>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>DATE & TIME</h2>
                        <h3 className='text-lg'>Tuesday, 07 July 2020 at 02:00pm</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>MOVIE TITLE</h2>
                        <h3 className='text-lg'>Spider-Man: Homecoming</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>CINEMA NAME</h2>
                        <h3 className='text-lg'>CineOne21 Cinema</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>NUMBER OF TICKETS</h2>
                        <h3 className='text-lg'>3 pieces</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>TOTAL PAYMENT</h2>
                        <h3 className='text-lg font-medium text-primary'>$30,00</h3>
                        <hr />
                    </div>
                    <h1 className='text-2xl font-medium my-5'>Personal Information</h1>
                    <div className='flex flex-col gap-y-4'>
                        <h1 className='text-gray-400 text-lg'>Full Name</h1>
                        <input className='w-full h-20 border border-gray-400 rounded-lg text-gray-400 text-lg' type="text" value='Jonas El Rodriguez'/>
                    </div>
                    <div className='flex flex-col gap-y-4 mt-4'>
                        <h1 className='text-gray-400 text-lg'>Email</h1>
                        <input className='w-full h-20 border border-gray-400 rounded-lg text-gray-400 text-lg' type="text" value='jonasrodri123@gmail.com'/>
                    </div>
                    <div className='flex flex-col gap-y-4 mt-4'>
                        <h1 className='text-gray-400 text-lg'>Phone Number</h1>
                        <input className='w-full h-20 border border-gray-400 rounded-lg text-gray-400 text-lg' type="tel" value='081445687121'/>
                    </div>
                    <h1 className='text-2xl font-medium my-5'>Payment Method</h1>
                    <div className='mx-auto flex flex-col gap-y-4'>
                        <div className='flex gap-4'>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                        </div>
                        <div className='flex gap-4'>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                            <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button>
                        </div>
                        <button className="btn text-lg font-bold border h-16 mt-6 w-full bg-primary mx-auto items-center flex justify-center text-white rounded-md hover:bg-white hover:text-primary" onClick={()=>window.my_modal_1.showModal()}>Pay Your Order</button>
                        <dialog id="my_modal_1" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-2xl text-center">Payment Info</h3>
                            <div className='flex justify-between'>
                                <h3 className='text-gray-400 my-auto'>No. Rekening Virtual</h3>
                                <div className='flex items-center gap-x-2'>
                                    <h2 className='text-lg font-bold'>12321328913829724</h2>
                                    <button className='border hover:border-4 hover:border-gray-100 border-primary h-12 w-16 hover:font-black bg-white text-primary mx-auto items-center flex justify-center rounded-lg hover:bg-primary hover:text-white'>Copy</button>
                                </div>
                            </div>
                            <div className='flex justify-between mt-10'>
                                <h3 className='text-gray-400 text-lg font-bold'>Total Payment</h3>
                                <h3 className='text-lg font-medium text-primary'>$30</h3>
                            </div>
                            <p className='text-gray-400 mt-6'>Pay this payment bill before it is due, on <span className='text-rose-600'>June 23, 2023.</span> If the bill has not been paid by the specified time, it will be forfeited  </p>
                            <Link className="mt-10 border h-14 w-full hover:border-4 border-gray-100 hover:font-black bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary" to='/check_payment'>CHECK PAYMENT</Link>
                            <div className="modal-action flex-flex-col">
                                <button className="btn border hover:border-4 hover:border-gray-100 border-primary h-14 w-full hover:font-black bg-white text-primary mx-auto items-center flex justify-center rounded-lg hover:bg-primary hover:text-white">Pay Later</button>
                            </div>
                        </form>
                        </dialog>
                        {/* <Link  to='/payment_info'>Pay Your Order</Link> */}
                    </div>
                </div>
            </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default payment_page