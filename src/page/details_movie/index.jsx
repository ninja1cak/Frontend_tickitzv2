import React, {useState, useEffect} from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import Poster from '../../assets/spiderman logo.svg'
import { Link, useParams } from 'react-router-dom'
import useApi from '../../helper/useApi'
import moment from 'moment'
import { addData, addDataBooking } from '../../store/reducer/user'
import { useDispatch } from 'react-redux'
import { current } from '@reduxjs/toolkit'


function Details_movie() {
    const params = useParams()

    const api = useApi()
    const Dispatch = useDispatch()
    
    const [movie, setMovie] = useState({})
    const [times, setTime] = useState([])
    const [city, setCity] = useState([])
    const [schedule, setSchedule] = useState([])
    const [date, setdates] = useState([])
    const [datas, setDatas] = useState({})
    const [filtertime, setFiltertime] = useState('')
    const [filterdate, setFilterdate] = useState('')

    // const [loc, setLoc] = useState('')
    const [filterloc, setFilterloc] = useState('')

    const [meta, setMeta]= useState([])
    const [page, setPage]= useState(1)
    const [total, setTotal] = useState(0)

    const getMovie = async () => {
        try {
          const {data} = await api(`/movie?id_movie=${params.id}`)
          const date = moment(data.data[0].release_date_movie)
          const date_released = date.format('DD MMMM YYYY')
          console.log({ ...data.data[0],genre:data.data[0].genre.split(','), release_date_movie: date_released})
          setMovie({ ...data.data[0],genre:data.data[0].genre.split(','), release_date_movie: date_released})
          
        } catch (error) {
        }
      }

      const getTime = async () => {
        try {
          const {data} = await api(`/schedule/time`)
          setTime(data.data)
          
        } catch (error) {
          console.log(error)
        }
      }

      const getCity = async () => {
        try {
          const {data} = await api(`/schedule/city`)
          setCity(data.data)
          
        } catch (error) {
          console.log(error)
        }
      }

      const getSchedule = async () => {
        try {
          const {data} = await api(`/schedule?id_movie=${params.id}&location=${filterloc}&page=${page}&time=${filtertime}`)
          setSchedule(data.data)
          setdates(getDates(new Date(data.data[0].date_start),new Date(data.data[0].date_end)))

          setMeta(data.meta)
          console.log(data.data)
        } catch (error) {
          console.log(error)
          setSchedule(null)
        }
      }

      const totalSchedule = async () => {
        try {
          const {data} = await api(`/schedule?id_movie=${params.id}`)
          setTotal(data.meta)
          
        } catch (error) {
          console.log(error)
          setSchedule(null)
        }
      }

      function getDates (startDate, endDate) {
        const dates = []
        let currentDate = startDate
        const addDays = function (days) {
            const date = new Date(this.valueOf())
            date.setDate(date.getDate() + days)
            return date
        }
        while (currentDate <= endDate) {
            let date_format = moment(currentDate)
            let date_released = date_format.format('DD MMMM YYYY')
            dates.push(date_released)
            currentDate = addDays.call(currentDate, 1)
        }
        return dates
    }

    const filterLocation = (v) =>{
        if (v.target.value !== 'e.g. Jakarta'){
          setFilterloc(v.target.value) 
        }
        else{
          setFilterloc('')
        }
      }
    
      const filterTimefunc = (v) =>{
        if (v.target.value !== 'e.g. 12.00 PM'){
            setFiltertime(v.target.value) 
        }
        else{
            setFiltertime('')
        }
    }

    const filterDate = (v) =>{
        if (v.target.value !== 'e.g. 02 February 2022'){
            setFilterdate(v.target.value) 
        }
        else{
            setFilterdate('')
        }
    }

      const check = (v) =>{
        console.log({
            ...schedule[v.currentTarget.value],
            time_playing: filterdate,
            image_movie: movie.url_image_movie
        })
        setDatas({
            ...schedule[v.currentTarget.value],
            time_playing: filterdate,
            image_movie: movie.url_image_movie
        })
      }

    const submitt = () => {
        getSchedule()
        // setLoc(filterloc)

    }
    
    const handleBook = () => {
        Dispatch(addDataBooking(datas))
    }

    //   if (image.cinema_logo_url != null) {
    //     console.log(image.cinema_logo_url)
    //   }else{
    //     console.log("data not found")
    //   }

    useEffect(()=>{
        getMovie()
        getTime()
        getCity()
        getSchedule()
        totalSchedule()
        setFilterdate(date[0])
    }, [])

    useEffect(()=>{
        getSchedule()
        // console.log(isi)
    }, [page])


  return (
    <>
        <Header />
        <img src={movie ? movie.url_image_movie:Poster} alt="" className='absolute w-full h-[34rem] object-cover mx-auto object-top' />
        <div className='relative mx-auto max-w-7xl pl-5'>
            <section className='mt-96'>
                <div className='flex object-bottom gap-x-12'>
                <img src={movie? movie.url_image_movie:Poster} alt="spiderman-logo" className='z-10 h-auto w-56' />
                <div className='relative top-40'>
                    <h1 className='font-bold text-lg m-2'>{movie ? movie.title_movie:"data not found"}</h1>
                    <div className='flex gap-x-2'>
                        {
                            movie.genre ? movie.genre.map((v) => {
                                return <h2 className='w-32 text-base bg-gray-100 border text-center rounded-full'>{v}</h2>
                            })
                            :
                            <>
                            </>
                        }
                    </div>
                    <div className="flex gap-x-12 gap-y-5 pt-6">
                        <div>
                            <div className="">
                                <p className="text-sm text-gray-600 my-2">Release date</p>
                                {
                                movie != null ? 

                                <p>{movie.release_date_movie}</p>


                                :
                                <p>Data not found</p>
                            }    
                                        </div>
                            <div className="movie">
                                <p className="text-sm text-gray-600 my-2">Directed by</p>
                                <p className="caption">{movie?movie.director_movie:"data not found"}</p>
                            </div>
                        </div>
                        <div>
                            <div className="movie">
                                <p className="text-sm text-gray-600 my-2">Duration</p>
                                <p className="caption">{movie?movie.duration_movie:"data not found"}</p>
                            </div>
                            <div className="movie">
                                <p className="text-sm text-gray-600 my-2">Casts</p>
                                <p className="caption">
                                {movie?movie.casts_movie:"data not found"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className=''>
                    <h2 className='md:mt-20 mt-36 text-lg font-bold'>Synopsis</h2>
                    <p className='w-3/4 leading-loose'>
                    {movie?movie.synopsis_movie:"data not found"}
                    </p>
                </div>
            </section>
            <section className=''>
                <h2 className='mt-16 text-2xl font-bold'>{(!schedule ? "The Movie You Are Looking For Is Not Aired Yet...":"Book Tickets")}</h2>
                <div className={(!schedule ? "hidden":'flex md:flex-row flex-col gap-y-8 justify-between mx-auto items-center px-2 mt-10')}>
                    <div className="flex flex-col gap-y-2 md:w-1/4 w-full">
                        <h3 className='mx-auto'>Choose Date</h3>
                        <select onChange={filterDate} className="select select-bordered mx-auto w-full text-gray-400 h-12 max-w-xs bg-gray-100">
                            <option>e.g. 02 February 2022</option>
                            {
                                date != null ? date.map((v) => {
                                    return <option>{v}</option>
                                }) 
                                :
                                <p>Data not found</p>
                            }  
                        </select>
                    </div>
                    <div className="flex flex flex-col gap-y-2 md:w-1/4 w-full">
                        <h3 className='mx-auto'>Choose  Time</h3>
                        <select onChange={filterTimefunc} className="select select-bordered text-gray-400 mx-auto w-full h-12 max-w-xs bg-gray-100">
                            <option>e.g. 12.00 PM</option>
                        {
                                times != null ? times.map((data) => {
                                return <option>{data.time}</option>
                                }) 
                                :
                                <p>Data not found</p>
                            }  
                        </select>
                    </div>
                    <div className="flex flex flex-col gap-y-2 md:w-1/4 w-full ">
                        <h3 className='mx-auto'>Choose  Location</h3>
                        <select onChange={filterLocation} className="select select-bordered text-gray-400 mx-auto w-full h-12 max-w-xs bg-gray-100">
                            <option>e.g. Jakarta</option>
                            {
                                city != null ? city.map((data) => {
                                return <option>{data.city}</option>
                                }) 
                                :
                                <p>Data not found</p>
                            }  
                        </select>
                    </div>
                    <div> 
                        <div className="flex flex flex-col gap-y-4 w-1/4">
                            <hr />
                            <hr />
                            <button onClick={submitt} className="border h-12 object-bottom w-40 bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary ">Filter</button>
                        </div>
                    </div>
                </div>
            </section>
            {/* <span className={(error_message != '' ? 'text-red-400' : phone == '' ? 'text-[#A9A9A9]' : 'text-[#6379F4]') + " flex gap-x-2 absolute mt-5 ml-2 items-center"}><BsTelephone /></span> */}
            <section className={(total.total === meta.total ? 'hidden':'relative flex flex-col gap-y-10 mt-10')}>
                <div className='flex gap-x-10 items-center'>
                    <h2 className='text-md font-bold'>Choose Cinema </h2>
                    <h3 className='text-md text-gray-600'>{meta.total} Result</h3>
                </div>
                <div>
                    <div className='flex sm:flex-row flex-col gap-y-4 justify-between sm:mx-4 items-center'>
                            {
                                schedule != null ? schedule.map((data, index) => {
                                    return <button onClick={check} className='group mx-auto border w-72 h-40 mx-2 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg' value={index + 3*(page-1)}><img className='w-44 px-2 m-auto h-auto' src={data.cinema_logo_url} alt="" /></button>
                                }) 
                                :
                                <p>Data not found</p>
                            } 
                    </div>
                    <div className={(meta.total === 3 ? 'hidden':'flex justify-center gap-5')}>
                        <div className=' flex gap-x-4 justify-center mt-5'>
                        {
                            page == 1 ?  <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white shadow-lg">Previous</button>:<button onClick={() => setPage(meta.prev)} className="btn btn-sm text-primary hover:bg-primary hover:text-white  border border-white w-24 bg-white shadow-lg">Previous</button>
                        }
                        <button className="btn btn-sm btn-outline bg-primary border border-white w-24 text-white" >{page}</button>
                        
                        {
                            Math.ceil((meta.total/3)) == page || Math.ceil((meta.total/12)) == 0 ? <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white shadow-lg">Next</button> : <button onClick={() => setPage(meta.next)} className="btn btn-sm text-primary hover:bg-primary hover:text-white  border-white w-24 bg-white shadow-lg">Next</button>
                        }
                        </div>
                        {/* <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>1</div>
                        <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>2</div>
                        <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>3</div>
                        <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>4</div> */}
                    </div>
                </div>
                <Link to={(!filterdate || !filterloc || !filtertime || !datas.cinema_name ? '':'/order_page')} onClick={handleBook} className={(!filterdate || !filterloc || !filtertime || !datas.cinema_name ? "h-16 object-bottom w-44 bg-white mx-auto items-center flex justify-center text-gray-400 rounded-lg border":"h-16 object-bottom w-44 bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary border")}>BOOK NOW</Link>
            </section>

        </div>
        <Footer />
    </>

  )
}

export default Details_movie