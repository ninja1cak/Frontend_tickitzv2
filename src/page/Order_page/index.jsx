import React, { useState } from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import Poster from '../../assets/spiderman logo.svg'
import Dummy from '../../assets/Screenshot from 2023-08-25 02-38-15.png'
import Cinema from '../../assets/Vector.png'
import { AiOutlineCheck } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addDataCheckout, addDataBooking } from '../../store/reducer/user'
import Select from 'react-dropdown-select'


function Order_page() {
    const Dispatch = useDispatch()
    const {dataBooking} = useSelector((s)=>s.users)
    const [value, setValues] = useState([])

    const changebutton =`/buy_ticket/${dataBooking.id_movie}`
    let arr = []

    const options = [
        {value: "c1", label: "c1"},
        {value: "c2", label: "c2"},
        {value: "c3", label: "c3"},
        {value: "c4", label: "c4"},
        {value: "c5", label: "c5"},
        {value: "c6", label: "c6"},
        {value: "c7", label: "c7"},
        {value: "c8", label: "c8"},
        {value: "c9", label: "c9"},
        {value: "c10", label: "c10"},
      ];

    const selected_seat = (values) => setValues(values)
    value.map((v)=>{
        arr.push(v.value)
    })

    console.log(value)

    const changemovie = () => {
        Dispatch(addDataBooking({}))
        Dispatch(addDataCheckout({}))
    }

    const handleCheckout = () => {
        Dispatch(addDataCheckout(arr))
    }

    let array_genre = (dataBooking.genre).split(", ")
    
  return (
    <>
        <Header />
        <div className='bg-gray-100 relative'>
                <div className='flex justify-center gap-x-5 absolute inset-x-0 top-0 mt-10'>
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
            <div className="max-w-7xl mx-auto px-5">
                <div className='pt-32 pb-5 mx-5'>
                    <div className="xl:grid flex flex-col grid-cols-3 gap-4 grid-flow-row grid-">
                        <div className="p-5 bg-white row-start-1 row-end-4 col-start-1 col-end-3 rounded-lg h-fit">
                            <div className='relative border w-11/12 h-52 mx-auto flex gap-x-4 rounded-lg mt-5'>
                                <img src={dataBooking.image_movie} className="relative w-2/6 h-5/6 object-cover my-auto object-top rounded mt-3 ml-3" alt="" />
                                <div>
                                    <div className=''>
                                        <h1 className='font-bold text-lg m-2'>{dataBooking.title_movie}</h1>
                                        <div className='sm:flex hidden md:flex-row flex-col gap-y-2 gap-x-2 mt-5'>
                                            {array_genre.map((v)=>{
                                                return <h2 className='w-32 text-base bg-gray-100 border text-center rounded-full'>{v}</h2>
                                            })}
                                        </div>
                                        <h2 className='sm:flex hidden mt-5'>Regular - {dataBooking.time}</h2>
                                    </div>
                                </div>
                                <div className='absolute bottom-0 right-0 '>
                                    <Link onClick={changemovie} to={changebutton} className="my-2 mr-2 border h-12 w-24 bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary ">Change</Link>
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
                        <div className="p-5 bg-white w-full mx-auto col-start-3 col-end-4 rounded-lg">
                            <div className='text-center mt-8'>
                                <img className='mx-auto w-36 h-auto' src={dataBooking.cinema_logo_url} alt="" />
                                <h1 className='mt-4 text-2xl font-semibold'>{dataBooking.cinema_name} Cinema</h1>
                            </div>
                            <div className='flex xl:justify-between justify-center gap-x-10 mt-5'>
                                <div className='flex flex-col gap-y-4 text-gray-600'>
                                    <h2>Movie selected</h2>
                                    <h2>Date and Time</h2>
                                    <h2>One ticket price</h2>
                                    
                                </div>
                                <div className='flex flex-col gap-y-4 font-medium'>
                                    <h2>{dataBooking.title_movie}</h2>
                                    <h2>{dataBooking.time_playing} at {dataBooking.time}</h2>
                                    <h2>${dataBooking.price_seat}</h2>                                
                                </div>
                            </div>
                            <div className='items-center flex xl:justify-start justify-center xl:gap-x-12 gap-x-28 mt-4'>
                                        <h2 className='text-gray-600 font-bold'>Choose Seat</h2>
                                        <Select
                                            multi
                                            className="rounded-lg border mr-16 self-start border-gray-200 px-5"
                                            options={options}
                                            onChange={selected_seat}
                                        />
                                    </div>
                            <hr className='mt-10' />
                            <div className='flex justify-between mt-10 mb-10'>
                                <h2 className='text-xl font-medium'>Total Payment</h2>
                                <h2 className='text-xl font-bold text-primary'>${arr.length*10}</h2>
                            </div>
                        </div>
                        <Link onClick={handleCheckout} className={(arr.length===0 ? "border h-16 w-full mt-6 bg-white mx-auto items-center flex justify-center text-gray-400 rounded-md":"border h-16 w-11/12 mt-6 bg-primary mx-auto items-center flex justify-center text-white rounded-md hover:bg-white hover:text-primary")} to={(arr.length===0 ? '' : '/payment_info')}>Checkout Now</Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Order_page