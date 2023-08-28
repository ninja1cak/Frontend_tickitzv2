import React,{useState, useEffect} from "react";
import Header from "../../../../component/header";
import { Formik } from "formik";
import useApi from "../../../../helper/useApi";
import {  AiOutlinePicture } from 'react-icons/ai'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

function Admin_Movie_create(){
    const api = useApi()
    const [selectedPicture, setSelectedPicture] = React.useState(false)
    const [pictureURI, setPictureURI] = React.useState('')
    const [pictureErr, setPictureErr] = React.useState(true)
    const [optionGenre, setOptionGenre] = useState()
    const [optionCity, setOptionCity] = useState()
    const [optionCinema, setOptionCinema] = useState()

    const [genre, setGenre] = useState([])
    const [city, setCity] = useState([])
    const [cinema, setCinema] = useState([])
    const [status, setStatus] = useState()
    const {data} = useSelector((s) => s.users)
    const navigate = useNavigate()

    const createOption = (label) =>(
        {
            label,
            value: label.toLowerCase().replace(/\W/g,'')
        }
    )

    const getGenre = async () => {
        try {
            const {data} = await api('/movie/genre/')
            // console.log(data)
            const defaultOptions = [
                ...data.data.map((v) => {
                    return createOption(v.genre)
                })
            ]            
            setOptionGenre(defaultOptions)
        } catch (error) {
            console.log(error)
        }
    }

    
    const getCity = async () => {
        try {
            const {data} = await api('/schedule/city/')
            // console.log(data)
            const defaultOptions = [
                ...data.data.map((v) => {
                    return createOption(v.city)
                })
            ]            
            setOptionCity(defaultOptions)
            console.log(defaultOptions)
        } catch (error) {
            console.log(error)
        }
    }

    const getCinema = async () => {
        try {
            const {data} = await api('/schedule/cinema/')
            // console.log(data)
            const defaultOptions = [
                ...data.data.map((v) => {
                    return createOption(v.cinema_name)
                })
            ]            
            setOptionCinema(defaultOptions)
            console.log(defaultOptions)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeGenre = (newValue) => {
        setGenre(newValue.map((v) => {return v.label}))
    }

    const handleChangeCity = (newValue) => {
        setCity(newValue.map((v) => {return v.label}))
    }

    const handleChangeCinema = (newValue) => {
        console.log(newValue.map((v) => {return v.label}), "cinema")
        setCinema(newValue.map((v) => {return v.label}))
    }

    const createMovie = async(values, {resetForm}) => {
        try {
            window.my_modal_1.showModal()

            let next = true
            if (!selectedPicture) {
                setPictureErr(false)
                return
            } else {
                setPictureErr(true)
            }
      
            const form = new FormData()
            Object.keys(values).forEach((key) => {
              console.log(key, ": ", values[key])
              if (values[key] !='') {
                  if (key === 'release_date_movie' || key ==='date_start' || key ==='date_end') {
                      const dateValue = new Date(values[key]);
                      
                      // Format the date as 'YYYY-MM-DD'
                      const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}T00:00:00Z`;
                    //   console.log(formattedDate)
                      console.log('if 1 : ', key, ':', formattedDate)
                      form.append(key, formattedDate);
                  }else if (key ==='time'){
                      const valueArr = values[key].split(', ')

                      for(let i = 0 ; i<valueArr.length; i++){
                        console.log(`${key}`, valueArr[i])
                        form.append(`${key}`, valueArr[i])
                      }
                  } else {
                      console.log('if 3 :', key, ':', values[key])
      
                      form.append(key, values[key]);
                  }
      
      
              }else{
                next = false
                
              }
          })
          
         if(!next){
            setStatus(420)
            return
          }
          for(let i = 0 ; i<genre.length; i++){
             form.append('genre', genre[i])
          }
          
          for(let i = 0 ; i<city.length; i++){
            form.append('city', city[i])
         }
         
         for(let i = 0 ; i<cinema.length; i++){
            form.append('cinema_name', cinema[i])
         }
    
        if (selectedPicture) {
            form.append('file', selectedPicture)
        }
      
      
            const {data} = await api.post('/movie/', form, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
            })
            console.log(data)
            setStatus(200)
            setSelectedPicture(false)
            
          //   resetForm()
      
        } catch (error) {
            console.log(error)
            console.log(error.response.status)
            setStatus(error.response.status)
        }
        
    }
    const fileToDataUrl = (file) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPictureURI(reader.result)
        })
        reader.readAsDataURL(file)
    }
      
      const changePicture = (e) => {
        const file = e.target.files[0]
        setSelectedPicture(file)
        fileToDataUrl(file)
    }

      useEffect(() => {
          document.title = 'Admin Page - Create Movie';
          if(data.data[0].role !== "admin"){
              navigate('/')
          }
          getGenre()
          getCity()
          getCinema()
          console.log([optionGenre])
  
      },[]);

    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full flex flex-col items-center">
            <div className=" w-[95%] md:w-7/12 lg:w-[100%] max-w-3xl bg-white p-10 my-5 rounded-lg">
                <h1 className="font-bold text-lg">Add New Movie</h1>
                <div>
                    <Formik
                    initialValues={{
                        title_movie: '',
                        director_movie: '',
                        duration_movie: '',
                        casts_movie: '',
                        synopsis_movie: '',
                        release_date_movie: '',
                        date_start: '',
                        date_end: '',
                        price_seat: 0,
                        time: ''
                    }} onSubmit={createMovie}>
                {({
                  handleChange, handleBlur, handleSubmit,errors, touched, values
                })=> (
                        <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 my-5 w-[200px]">
                            <div className="border-2 rounded-lg mb-4">
                                {!selectedPicture && (
                                <div className="h-52 flex items-center justify-center">
                                <i className=''>
                                    <AiOutlinePicture size={50} />
                                </i>
                                </div>
                                )}
                                
                                {selectedPicture && <img src={pictureURI} alt="Banner" />}
                            </div>
                            <label className='btn bg-[#fff] w-full h-10 rounded-xl border-2 border-[#3366FF] text-[#3366FF] text-sm font-semibold tracking-[1px] mb-4'>
                                <span>Choose photo</span>
                                <input name='picture' onChange={changePicture} className='hidden' type='file' />
                            </label>
                            {!pictureErr && (
                                <label className='label'>
                                    <span className='label-text-alt text-error'>Please insert event picture!</span>
                                </label>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Movie Name</label>
                            <input type="text" name="title_movie" 
                            className="border-2 rounded border-gray-200"                               
                            value={values.title_movie}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>

                        <div className="flex flex-col gap-2 mt-3">
                            <label>Category</label>
                            <CreatableSelect  onChange={handleChangeGenre} isMulti options={optionGenre}></CreatableSelect>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row justify-between gap-5">
                            <div className="flex flex-col gap-2 mt-3 w-full">
                                <label>Release date</label>
                                <input type="date" name="release_date_movie" 
                                className="border-2 rounded  border-gray-200"                               
                                value={values.release_date_movie}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            </div>
                            <div className="flex flex-col gap-2 mt-3">
                                <label>Duration (hour / minute)</label>
                                    <input type="text" name="duration_movie" 
                                    className="border-2 rounded  border-gray-200"                               
                                    value={values.duration_movie}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Director Name</label>
                            <input type="text" name="director_movie" 
                            className="border-2 rounded  border-gray-200"                               
                            value={values.director_movie}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Casts</label>
                            <input type="text" name="casts_movie" 
                            className="border-2 rounded border-gray-200"                               
                            value={values.casts_movie}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Synopsis</label>
                            <div className='w-full'>
                                <textarea
                                    name='synopsis_movie'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.synopsis_movie}
                                    className='border-2 border-gray-200 w-full rounded text-sm tracking-[1px] px-3.5 py-3.5'
                                    cols='30'
                                    rows='5'
                                ></textarea>
                            </div>
                        </div>
 
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Add Location</label>
                            <CreatableSelect onChange={handleChangeCity} isMulti options={optionCity}></CreatableSelect>
                        </div>

                        <div className="flex flex-col gap-2 mt-3">
                            <label>Add Cinema</label>
                            <Select onChange={handleChangeCinema} isMulti options={optionCinema}></Select>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Set Date & Time</label>
                            <div className="flex gap-3 items-center">
                                <input type="date" name="date_start" 
                                className="border-2 rounded  border-gray-200"                               
                                value={values.date_start}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                                <h2>to</h2>

                                <input type="date" name="date_end" 
                                className="border-2 rounded  border-gray-200"                               
                                value={values.date_end}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Time</label>
                            <input type="text" name="time" 
                            className="border-2 rounded  border-gray-200"                               
                            value={values.time}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Ticket Price</label>
                            <input type="number" name="price_seat" 
                            className="border-2 rounded border-gray-200"                               
                            value={values.price_seat}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <hr className="my-5"/>
                        <button type="submit" className="w-full bg-primary font-bold text-white py-3 rounded">Save Movie</button>

                        </form>
                    )}

                    </Formik>

                </div>
            </div>
        </div>
        <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Status</h3>
                     {
                       status === undefined ? <p>Please wait for creating data</p> : status == 420 ? <p>Enter All Input</p> : status == 200 ? <p>Create Movie Success</p> : <p> Create Movie Failed</p>

                    }
                    <div className="modal-action">
                    <button className="btn" type='button' onClick={() => navigate(0)}>Close</button>
                    </div>
                </form>
        </dialog>
        </>
    )
}

export default Admin_Movie_create