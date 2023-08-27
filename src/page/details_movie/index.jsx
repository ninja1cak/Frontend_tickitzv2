import React, {useState, useEffect} from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import Poster from '../../assets/spiderman logo.svg'
import { Link, useParams } from 'react-router-dom'
import useApi from '../../helper/useApi'
import moment from 'moment'
import { addData } from '../../store/reducer/user'
import { useDispatch } from 'react-redux'


function Details_movie() {
    const params = useParams()

    const api = useApi()
    const Dispatch = useDispatch()
    
    const [movie, setMovie] = useState([])
    const [times, setTime] = useState([])
    const [city, setCity] = useState([])
    const [schedule, setSchedule] = useState([])
    const [date, setdates] = useState([])

    const [filtertime, setFiltertime] = useState('')
    const [ft, setft] = useState('')

    const [loc, setLoc] = useState('')
    const [filterloc, setFilterloc] = useState('')
    
    const [isi, cekIsi] = useState([])
    const [meta, setMeta]= useState([])
    const [page, setPage]= useState(1)

    const getMovie = async () => {
        try {
          const {data} = await api(`/movie?id_movie=${params.id}`)
          setMovie(data.data)
          setdates(getDates(new Date(data.data[0].date_start),new Date(data.data[0].date_end)))
          
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
          const {data} = await api(`/schedule?id_movie=${params.id}&location=${loc}&page=${page}&time=${filtertime}`)
          setSchedule(data.data)
          setMeta(data.meta)
          
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
            dates.push(currentDate)
            currentDate = addDays.call(currentDate, 1)
        }
        // const date_format = moment(dates)
        // const date_released = date_format.format('DD MMMM YYYY')
        // return date_released
        // console.log('tanggal : ', dates)
        return dates
    }

    const filterLocation = (v) =>{
        if (v.target.value !== 'All'){
          setFilterloc(v.target.value) 
        }
        else{
          setFilterloc('')
        }
      }

      const check = (v) =>{
        cekIsi(v.target.value)
      }
    
    const filterTimefunc = (v) =>{
        if (v.target.value !== 'All'){
            setFiltertime(v.target.value) 
        }
        else{
            setFiltertime('')
        }
    }


    const submitt = () => {
        setLoc(filterloc)
    }

    console.log(isi)
    
    const handleBook = () => {
        let data = [filterloc, movie, filtertime, isi] 
        Dispatch(addData(data))
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
    }, [])

    useEffect(()=>{
        getSchedule()
    }, [filterloc, filtertime, loc, isi, page])


  return (
    <>
        <Header />
        <img src={movie[0] ? movie[0].url_image_movie:Poster} alt="" className='absolute w-full h-[34rem] object-cover mx-auto object-top' />
        <div className='relative mx-auto max-w-7xl pl-5'>
            <section className='mt-96'>
                <div className='flex object-bottom gap-x-12'>
                <img src={movie[0] ? movie[0].url_image_movie:Poster} alt="spiderman-logo" className='z-10 h-auto w-56' />
                <div className='relative top-40'>
                    <h1 className='font-bold text-lg m-2'>{movie[0] ? movie[0].title_movie:"data not found"}</h1>
                    <div className='flex gap-x-2'>
                        <h2 className='w-32 text-base bg-gray-100 border text-center rounded-full'>Action</h2>
                        <h2 className='w-32 text-base bg-gray-100 border text-center rounded-full'>Adventure</h2>
                    </div>
                    <div className="flex gap-x-12 gap-y-5 pt-6">
                        <div>
                            <div className="">
                                <p className="text-sm text-gray-600 my-2">Release date</p>
                                {
                                movie != null ? movie.map((data) => {
                                const date = moment(data.release_date_movie)
                                const date_released = date.format('DD MMMM YYYY')
                                return <p>{date_released}</p>

                                }) 
                                :
                                <p>Data not found</p>
                            }    
                                        </div>
                            <div className="movie">
                                <p className="text-sm text-gray-600 my-2">Directed by</p>
                                <p className="caption">{movie[0]?movie[0].director_movie:"data not found"}</p>
                            </div>
                        </div>
                        <div>
                            <div className="movie">
                                <p className="text-sm text-gray-600 my-2">Duration</p>
                                <p className="caption">{movie[0]?movie[0].duration_movie:"data not found"}</p>
                            </div>
                            <div className="movie">
                                <p className="text-sm text-gray-600 my-2">Casts</p>
                                <p className="caption">
                                {movie[0]?movie[0].casts_movie:"data not found"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className=''>
                    <h2 className='mt-20 text-lg font-bold'>Synopsis</h2>
                    <p className='w-3/4 leading-loose'>
                    {movie[0]?movie[0].synopsis_movie:"data not found"}
                    </p>
                </div>
            </section>
            <section className=''>
                <h2 className='mt-16 text-2xl font-bold'>Book Tickets</h2>
                <div className='flex justify-between mx-auto items-center mt-10'>
                    <div className="flex flex-col gap-y-4 w-1/4">
                        <h3>Choose Date</h3>
                        <select className="select select-bordered w-full h-12 max-w-xs bg-gray-100">
                            {
                                schedule != null ? schedule.map((data) => {
                                    const dates = getDates(data.date_start, data.date_end)
                                    return <option>{dates}</option>
                                }) 
                                :
                                <p>Data not found</p>
                            }  
                        </select>
                    </div>
                    <div className="flex flex flex-col gap-y-4 w-1/4">
                        <h3>Choose  Time</h3>
                        <select onChange={filterTimefunc} className="select select-bordered w-full h-12 max-w-xs bg-gray-100">
                            <option>All</option>
                        {
                                times != null ? times.map((data) => {
                                return <option>{data.time}</option>
                                }) 
                                :
                                <p>Data not found</p>
                            }  
                        </select>
                    </div>
                    <div className="flex flex flex-col gap-y-4 w-1/4">
                        <h3>Choose  Location</h3>
                        <select onChange={filterLocation} className="select select-bordered w-full h-12 max-w-xs bg-gray-100">
                            <option>All</option>
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
                        <div className="flex flex flex-col gap-y-4 w-1/4 mt-10">
                            <button onClick={submitt} className="border h-12 object-bottom w-40 bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary ">Filter</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='relative flex flex-col gap-y-10 mt-10'>
                <div className='flex gap-x-10'>
                    <h2 className='text-lg font-bold'>Choose Cinema </h2>
                    <h3 className='text-md text-gray-600'>39 Result</h3>
                </div>
                <div>
                    <div className='flex justify-between'>
                            {
                                schedule != null ? schedule.map((data) => {
                                    return <button onClick={check} className='group border w-72 h-40 bg-white focus:outline-none focus:ring focus:ring-primary rounded-lg' value={[data.cinema_name, data.cinema_logo_url]}><img className='w-44 m-auto h-auto' src={data.cinema_logo_url} alt="" /></button>
                                }) 
                                :
                                <p>Data not found</p>
                            } 
                    </div>
                    <div className='flex justify-center gap-5'>
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
                <Link to='/order_page' onClick={handleBook} className="h-16 object-bottom w-44 bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary border">BOOK NOW</Link>
            </section>

        </div>
        <Footer />
    </>

  )
}

export default Details_movie