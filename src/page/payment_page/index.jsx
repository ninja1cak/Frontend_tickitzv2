import React, { useState } from 'react'
import moment from 'moment'
import Header from '../../component/header'
import Footer from '../../component/footer'
import { AiOutlineCheck } from 'react-icons/ai'

import bca from '../../assets/New - Payment/Bank BCA Logo (SVG-240p) - FileVector69 1.svg'
import bri from '../../assets/New - Payment/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg'
import dana from '../../assets/New - Payment/Logo DANA (PNG-240p) - FileVector69 1.svg'
import gopay from '../../assets/New - Payment/Logo GoPay (SVG-240p) - FileVector69 1.svg'
import googlepay from '../../assets/New - Payment/logos_google-pay.svg'
import paypal from '../../assets/New - Payment/logos_paypal.svg'
import vector from '../../assets/New - Payment/Vector.svg'
import visa from '../../assets/New - Payment/logos_visa.svg'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Show, Container } from '../../helper/toast'
import useApi from '../../helper/useApi'

function Payment_page() {
    const [payment, setPayment] = useState()
    const {dataBooking, dataCheckout, data} = useSelector((s)=>s.users)
    const api = useApi()

    const date = new Date(dataBooking.time_playing);
    
    const check = (v) =>{
        setPayment(v.currentTarget.value)
      }
    
    console.log(payment)

    const PostBooking = () => {
        const formData = new FormData();
        formData.append('seats_booking', dataCheckout.length)
        formData.append('total_price_booking', dataCheckout.length*10);
        formData.append('watch_date', dataBooking.time_playing);
        formData.append('payment_method', payment);
        formData.append('user_id', data.data[0].id_user);
        formData.append('watch_time', dataBooking.time);

        api({
            method: 'POST',
            url: '/booking',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            Show('Registration Success', 'success')
        }).catch(err=>{
            const axiosErr = err.response.data
            if (axiosErr.message !== undefined) {
                Show(axiosErr.message, 'warning')
            } else if (axiosErr.error !== undefined) {
                Show(axiosErr.error, 'error')
            }
        })

    }

  return (
    <>
        <Header />
        <div className='bg-gray-100'>
            <Container />
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
            <div className="max-w-4xl mx-auto">
                <div className='pt-32 pb-5'>
                <div className="bg-white rounded-lg py-5 mx-5">
                <div className="m-10 flex flex-col gap-y-4">
                    <h1 className='text-2xl font-medium my-5'>Payment Info</h1>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>DATE & TIME</h2>
                        <h3 className='text-lg'>{dataBooking.time_playing} at {dataBooking.time}</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>MOVIE TITLE</h2>
                        <h3 className='text-lg'>{dataBooking.title_movie}</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>CINEMA NAME</h2>
                        <h3 className='text-lg'>{dataBooking.cinema_name} Cinema</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>NUMBER OF TICKETS</h2>
                        <h3 className='text-lg'>{dataCheckout.length} pieces</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-gray-400 text-lg'>TOTAL PAYMENT</h2>
                        <h3 className='text-lg font-medium text-primary'>${dataCheckout.length*10},00</h3>
                        <hr />
                    </div>
                    <h1 className='text-2xl font-medium my-5'>Personal Information</h1>
                    <div className='flex flex-col gap-y-4'>
                        <h1 className='text-gray-400 text-lg'>Full Name</h1>
                        <input className='h-20 border border-gray-400 rounded-lg text-gray-400 text-lg' type="text" value={data.data[0].first_name+" "+data.data[0].last_name}/>
                    </div>
                    <div className='flex flex-col gap-y-4 mt-4'>
                        <h1 className='text-gray-400 text-lg'>Email</h1>
                        <input className='h-20 border border-gray-400 rounded-lg text-gray-400 text-lg' type="text" value={data.data[0].email_user}/>
                    </div>
                    <div className='flex flex-col gap-y-4 mt-4'>
                        <h1 className='text-gray-400 text-lg'>Phone Number</h1>
                        <input className='h-20 border border-gray-400 rounded-lg text-gray-400 text-lg' type="tel" value={data.data[0].phone_number}/>
                    </div>
                    <h1 className='text-2xl font-medium my-5'>Payment Method</h1>
                    <div className='mx-auto flex md:flex-col flex-row gap-y-4 gap-x-4'>
                        <div className='flex md:flex-row flex-col gap-4'>
                            <button onClick={check} value="BCA" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-32 m-auto h-auto' src={bca} alt="" />
                            </button>
                            <button onClick={check} value="BRI" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-16 m-auto h-auto' src={bri} alt="" />
                            </button>
                            <button onClick={check} value="DANA" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-32 m-auto h-auto' src={dana} alt="" />
                            </button>
                            <button onClick={check} value="GOOGLE PAY" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-32 m-auto h-auto' src={googlepay} alt="" />
                            </button>
                        </div>
                        <div className='flex md:flex-row flex-col gap-4'>
                            <button onClick={check} value="VISA" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-32 m-auto h-auto' src={visa} alt="" />
                            </button>
                            <button onClick={check} value="OVO" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-32 m-auto h-auto' src={vector} alt="" />
                            </button>
                            <button onClick={check} value="GOPAY" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-32 m-auto h-auto' src={gopay} alt="" />
                            </button>
                            <button onClick={check} value="PAYPAL" className='group border w-44 h-24 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg'>
                                <img className='w-16 m-auto h-auto' src={paypal} alt="" />
                            </button>

                            {/* <button className='w-44 h-24 border items-center rounded-lg' >
                                <img className='w-32 h-auto mx-auto' src={Payment} alt="" />
                            </button> */}
                        </div>
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
                                <h3 className='text-lg font-medium text-primary'>${dataCheckout.length*10}</h3>
                            </div>
                            <p className='text-gray-400 mt-6'>Pay this payment bill before it is due, on <span className='text-rose-600'>{moment(date).add(2, 'day').format('DD MMMM YYYY')}.</span> If the bill has not been paid by the specified time, it will be forfeited  </p>
                            <Link onClick={PostBooking} className="mt-10 border h-14 w-full hover:border-4 border-gray-100 hover:font-black bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary" to='/check_payment'>PAY</Link>
                            <div className="modal-action flex-flex-col">
                                <button className="btn border hover:border-4 hover:border-gray-100 border-primary h-14 w-full hover:font-black bg-white text-primary mx-auto items-center flex justify-center rounded-lg hover:bg-primary hover:text-white">Pay Later</button>
                            </div>
                        </form>
                        </dialog>
                        {/* <Link  to='/payment_info'>Pay Your Order</Link> */}
                    </div>
                    <button className="btn text-lg font-bold border w-full h-16 mt-6 bg-primary mx-auto items-center flex justify-center text-white rounded-md hover:bg-white hover:text-primary" onClick={()=>window.my_modal_1.showModal()}>Pay Your Order</button>
                </div>
            </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Payment_page