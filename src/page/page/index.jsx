import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import bgHero from '../../assets/hero-bg-login.png'
import lense from '../../assets/zoom-lens.png'
import Card from '../../component/card'
import useApi from '../../helper/useApi'

function Page() {
  const [slideIndex, setSlider] = useState(1)
  // const [sliderActive, setSliderActive] = useState(1)
  const [movie, setMovie] = useState([])
  const [genre, setGenre] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [page, setPage]= useState(1)
  const [meta, setMeta]= useState([])
  const api = useApi()

    // const handlerSliderActive = (e) => {
  //   setSliderActive(e)
  // }

  const getMovie = async () => {
    try {
      const {data} = await api(`/movie?limit=12&search=${search}&sort=${filter}&page=${page}`)
      if(data.meta === undefined){
        data.meta = {
          next : 0,
          prev : 0,
          meta : 0,
        }
      }
      setMovie(data.data)
      setMeta(data.meta)
      
    } catch (error) {
      console.log(error)
    }
  }

  const getGenre = async () => {
      try {
        const {data} = await api('/movie/genre/')
        setGenre(data.data)
      } catch (error) {
        console.log(error)

      }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleFilter = (e) =>{
    if(e.target.value !== '' && e.target.value !== 'All'){
      console.log('if awal',e.target.value)

      setFilter(e.target.value)
    }else if(e.target.innerText === 'All' || e.target.value === 'All'){
      console.log(e.target.value)
      setFilter('')
    }else{
      setFilter(e.target.innerText)

    }
  }

  useEffect(() =>{
    getMovie()
    getGenre()
  }, [])

  useEffect(() =>{
    getMovie()
  }, [search,filter,page])

  return (
    <>
        <Header />
        <div className='h-screen flex flex-col'>
        <div className='relative border border-red-900'>
        <div className="carousel w-full">
            <div id="item1" className="carousel-item w-full h-[400px]">
              <img src={bgHero} className="w-full object-cover " />
            </div> 
            <div id="item2" className="carousel-item w-full h-[400px]">
              <img src={bgHero} className="w-full object-cover" />
            </div> 
            <div id="item3" className="carousel-item w-full h-[400px]">
              <img src={bgHero} className="w-full object-cover " />
            </div> 
          </div> 
        <div className='absolute top-20 text-white  w-[100%] max-w-7xl left-0 right-0 mx-auto'>
              <div className='w-[250px] md:w-[500px] flex flex-col ml-5'>
                <span className='text-xl md:text-2xl font=semibold mb-4'>LIST MOVIE OF THE WEEK</span>
                <span className='text-3xl md:text-5xl leading-10 md:leading-tight'>Experience the Magic of Cinema: Book Your Ticket Today</span>
              </div>
              <div className='flex justify-center items-center gap-5 pt-12  '>
                <a href ='#item1' onClick={() => setSlider(1)} className={ slideIndex === 1 ? 'w-16 h-2 bg-blue-700 rounded-lg cursor-pointer' : 'w-2 h-2 bg-white rounded-lg cursor-pointer'} ></a>
                <a href ='#item2' onClick={() => setSlider(2)} className={ slideIndex === 2 ? 'w-16 h-2 bg-blue-700 rounded-lg cursor-pointer' : 'w-2 h-2 bg-white rounded-lg cursor-pointer'} ></a>
                <a href ='#item3' onClick={() => setSlider(3)} className={ slideIndex === 3 ? 'w-16 h-2 bg-blue-700 rounded-lg cursor-pointer' : 'w-2 h-2 bg-white rounded-lg cursor-pointer'} ></a>
              </div>
          </div>
        </div>

          <div className='left-0 right-0 top-1/2 w-[100%] my-16 mx-auto max-w-7xl border border-primary '>
            <div className='flex flex-col md:flex-row items-start mx-5 md:items-center justify-start md:justify-center lg:justify-normal gap-x-20 lg:px-10 '>
              <div className='relative flex flex-col w-full md:w-1/3'>
                <span className='font-medium pb-5'>Cari Event</span>
                <input class="h-14 placeholder:tracking-widest placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-16 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" onChange={handleSearch} placeholder="Spiderman: Homecoming" type="text" name="search"/>
                <img className='absolute w-9 fill-slate-400 top-14 left-4' src={lense} alt="lense" />
              </div>
              <div className='hidden lg:block w-[100%] max-w-[600px] '>
                <span className='font-medium'>Filter</span>
                <div className='flex gap-5 pt-5  overflow-x-auto'>
                <button onClick={handleFilter} className='btn btn-sm max-w-32 rounded-md hover:bg-blue-700 hover:text-white active:bg-blue-700 capitalize'>All</button>
                  {
                    genre !== null ? 
                    genre.map((value) => {
                      return <button onClick={handleFilter} className='btn btn-sm max-w-32 rounded-md hover:bg-blue-700 hover:text-white active:bg-blue-700 capitalize'>{value.genre}</button>
                    })
                    :
                    <>
                    </>
                  }
               </div>
              </div>
              <div className='flex flex-col lg:hidden w-[100%] md:max-w-[250px] '>
                <span className='font-medium pb-5'>Filter</span>
                <select onChange={handleFilter} class="select border border-gray-300 w-full h-14 ">
                <option>All</option>
                {
                    genre !== null ? 
                    genre.map((value) => {
                      return <option >{value.genre}</option>
                    })
                    :
                    <>
                    </>
                  }
                </select>
              </div>

            </div>
            <div className=' grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-16 py-20 px-5 '>
              
              {
                movie != null ? movie.map((data) => {
                  let genreArr = []
                  genreArr = data.genre.split(',')
                  return <Card title={data.title_movie} banner={data.url_image_movie} genre={genreArr}  />

                }) 
                :
                <p>Data not found</p>
              }             

            </div>
            <div>
              <div className='flex justify-center gap-5'>
                
                <div className=' flex gap-x-4 justify-center mt-5'>
                  {
                    page == 1 ?  <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white shadow-lg">Previous</button>:<button onClick={() => setPage(meta.prev)} className="btn btn-sm text-primary hover:bg-primary hover:text-white  border border-white w-24 bg-white shadow-lg">Previous</button>
                  }
                  <button className="btn btn-sm btn-outline bg-primary border border-white w-24 text-white" >{page}</button>
                  
                  {
                    Math.ceil((meta.total/12)) == page || Math.ceil((meta.total/12)) == 0? <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white shadow-lg">Next</button> : <button onClick={() => setPage(meta.next)} className="btn btn-sm text-primary hover:bg-primary hover:text-white  border-white w-24 bg-white shadow-lg">Next</button>
                  }
                </div>
                {/* <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>1</div>
                <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>2</div>
                <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>3</div>
                <div className='btn w-12 h-10 rounded-full font-bold text-slate-400'>4</div> */}
              </div>
              <div className='flex justify-center pt-12'>
                <div className='w-full mx-5 md:px-0 md:w-2/3 h-80 lg:h-64 flex flex-col justify-center items-center bg-blue-600 rounded-2xl'>
                  <span className=' text-2xl md:text-4xl text-white tracking-wide pb-6 text-center'>Subscribe to our newsletter</span>
                  <div className='flex flex-col items-center lg:flex-row gap-4'>
                    <input className='input input-ghost input-bordered text-white placeholder:text-white placeholder:font-light rounded-md' type="text" placeholder='First name'/>
                    <input className='input input-ghost input-bordered text-white placeholder:text-white placeholder:font-light rounded-md' type="text" placeholder='Email address'/>
                    <button className='btn w-44 text-blue-600 font-medium capitalize'>Subscribe now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='object-bottom'>
              <Footer />
            </div>
          </div>
        </div>
        
    </>

  )
}

export default Page