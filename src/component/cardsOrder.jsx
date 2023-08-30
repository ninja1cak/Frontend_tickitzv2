import React, {useState} from 'react'
import { format } from 'date-fns';
import barcode from '../assets/qr-code.png'

function Cards_order ({ title_movie, time, seats, date, total, image }) {
        const formattedDate = format(new Date(date), 'dd MMMM yyyy');
        const [isOpen, setIsOpen] = useState(false);
      
        const handleToggle = () => {
          setIsOpen(!isOpen);
        };

        const seatsString = seats.toString();
        const seatsArray = seatsString.split(', '); // Memisahkan string menjadi array

        const seatNumbers = seatsArray.length;



    return(
        <>
        <div className='bg-white w-full rounded-lg p-5 my-5'>
            <div className='flex justify-between'>
                <div>
                    <h3 className='text-gray-400 text-[9px] md:text-sm'>Tuesday, 07 July 2020 - 04:30pm</h3>
                    <h1 className='text-md md:text-lg font-bold'>{title_movie}</h1>
                </div>
                <div className='w-[10%] flex items-center'>
                    <img src={image} alt="image-cinema" />
                </div>
            </div>
            <hr className='my-5'/>
            <div className='flex justify-between'>
                <div className='flex gap-3 w-full'>
                    <div className='bg-gray-200 w-full py-3 rounded  flex items-center justify-center text-[9px] md:text-[12px]'>Ticket Used</div>
                    <div className='bg-[#1D4ED833] text-primary w-full font-bold py-3 rounded flex items-center justify-center text-[9px] md:text-[12px]'>Paid</div>
                </div>
                <button className='md:flex text-gray-500 justify-end items-center gap-5 hidden md:text-[12px] w-full' onClick={handleToggle}>
                    {isOpen ? 'Hide Detail' : 'Show Detail'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                    <path d={isOpen ? "M3.54297 5.68652L8.47521 3.36694L13.4075 5.68652" : "M13.457 3.5127L8.52479 5.83228L3.59254 3.5127"} stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className='flex text-gray-500 justify-end items-center gap-5 w-full md:hidden' onClick={handleToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                    <path d={isOpen ? "M3.54297 5.68652L8.47521 3.36694L13.4075 5.68652" : "M13.457 3.5127L8.52479 5.83228L3.59254 3.5127"} stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className='my-5'>
                <h1 className='text-sm md:text-md'>Ticket Information</h1>
                <div className='flex flex-col md:flex-row gap-5 md:gap-2 items-center justify-center'>
                    <div className='w-full flex items-center justify-center'>
                        <img src={barcode} alt="barcode" />
                    </div>
                    <div className='flex gap-3 w-full justify-center'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <label className='text-gray-400 text-[9px] md:text-[9px]'>Category</label>
                                <h3 className='text-[9px] md:text-[9px]'>PG-13</h3>
                            </div>
                            <div>
                                <label className='text-gray-400 text-[9px] md:text-[9px]'>Movie</label>
                                <h3 className='text-[9px] md:text-[9px]'>{title_movie}</h3>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <label className='text-gray-400 text-[9px] md:text-[9px]'>Time</label>
                                <h3 className='text-[9px] md:text-[9px]'>{time}</h3>
                            </div>
                            <div>
                                <label className='text-gray-400 text-[9px] md:text-[9px]'>Date</label>
                                <h3 className='text-[9px] md:text-[9px]'>{formattedDate}</h3>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <label className='text-gray-400 text-[9px] md:text-[9px]'>Seats</label>
                                <h3 className='text-[9px] md:text-[9px]'>{seats}</h3>
                            </div>
                            <div>
                                <label className='text-gray-400 text-[9px] md:text-[9px]'>Count</label>
                                <h3 className='text-[9px] md:text-[9px]'>{seatNumbers}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-col items-center'>
                            <label className='text-xs'>Total</label>
                            <h3 className='text-sm lg:text-lg font-bold'>${total}</h3>
                        </div>
                    </div>
                </div>
            </div>

            )}
        </div>
        </>
    )
}

export default Cards_order