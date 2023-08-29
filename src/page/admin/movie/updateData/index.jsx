import React,{useState, useEffect} from "react";
import Header from "../../../../component/header";
import { Formik } from "formik";
import useApi from "../../../../helper/useApi";
import {  AiOutlinePicture } from 'react-icons/ai'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';


function Admin_Movie_update(){
    const api = useApi()
    const [selectedPicture, setSelectedPicture] = React.useState(false)
    const [pictureURI, setPictureURI] = React.useState('')
    const [pictureErr, setPictureErr] = React.useState(true)
    const [movie, setMovie] = useState({})
    const [status, setStatus] = useState()
    const {data} = useSelector((s) => s.users)
    const navigate = useNavigate()
    const params = useParams()


    const getMovie = async () => {
        try {
          const {data} = await api(`/movie?id_movie=${params.id}`)
          const date = moment(data.data[0].release_date_movie)
          const date_released = date.format('DD MMMM YYYY')
          console.log({ ...data.data[0],genre:data.data[0].genre.split(','), release_date_movie: date_released})
          setMovie({ ...data.data[0],genre:data.data[0].genre.split(','), release_date_movie: date_released})
          
        } catch (error) {
            console.log(error)
        }
      }


      const updateMovie = async(values, {resetForm}) => {
        try {
            let count = 0 
            if (!selectedPicture) {
                setPictureErr(false)
            } else {
                setPictureErr(true)
                count++
            }
            window.my_modal_1.showModal()

            const form = new FormData()
            console.log('tes')
            Object.keys(values).forEach((key) => {
              console.log(key, ": ", values[key])
              if (values[key]) {
                    count++
                    if (key === 'release_date_movie') {
                      const dateValue = new Date(values[key]);
                      
                      const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}T00:00:00Z`;
                      console.log('if 1 : ', key, ':', formattedDate)
                      form.append(key, formattedDate);
                  }else if (key ==='genre'){
                      const valueArr = values[key].split(', ')

                      for(let i = 0 ; i<valueArr.length; i++){
                        console.log(`${key}`, valueArr[i])
                        form.append(`${key}`, valueArr[i])
                      }
                  } else {
                      console.log('if 3 :', key, ':', values[key])
      
                      form.append(key, values[key]);
                  }
      
      
              }
          })
            console.log('count', count)

            if(count === 0 ){
                setStatus(420)
                return
            }
     
            if (selectedPicture) {
              form.append('file', selectedPicture)
            }
      
      
            const {data} = await api.patch(`/movie/${params.id}`, form, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
            })
            console.log(data)
            setStatus(200)
            setSelectedPicture(false)
            // window.location.reload();
      
        } catch (error) {
            console.log(error)
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

    // const formattedDuration = () => {
    //     const hour = parseInt(values.duration_hour) || 0;
    //     const minute = parseInt(values.duration_minute) || 0;
    
    //     if (hour === 0) {
    //       return `${minute} Minute`;
    //     } else if (minute === 0) {
    //       return `${hour} Hour`;
    //     } else {
    //       return `${hour} Hour ${minute} Minute`;
    //     }
    //   };

    useEffect(() => {
        document.title = 'Admin Page - Create Movie';
        if(data.data[0].role !== "admin"){
            navigate('/')
        }
        getMovie()
    }, []);

    
    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full flex flex-col items-center">
            <div className="w-[95%] md:w-7/12 bg-white p-10 my-5 rounded-lg">
                <h1 className="font-bold text-lg">Add Update Movie</h1>
                <div>
                <Formik
                    initialValues={{
                        title_movie: '',
                        director_movie: '',
                        duration_movie: '',
                        casts_movie: '',
                        genre: '',
                        synopsis_movie: '',
                        release_date_movie: '',
                        url_image_movie: '',
                    }} onSubmit={updateMovie}>
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
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Movie Name</label>
                            <input type="text" name="title_movie" 
                            className="border-2 rounded p-5 border-gray-200"      
                            placeholder={movie.title_movie}                         
                            value={values.title_movie}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Category</label>
                            <input type="text" name="genre" 
                            className="border-2 rounded p-5 border-gray-200"
                            placeholder={movie.genre ? movie.genre.join(', '): ''}                                 
                            value={values.genre}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between gap-5">
                            <div className="flex flex-col gap-2 mt-3 w-full">
                                <label>Release date</label>
                                <input type="date" name="release_date_movie" 
                                className="border-2 rounded p-5 border-gray-200"                               
                                value={values.release_date_movie}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            </div>
                            <div className="flex flex-col gap-2 mt-3">
                                <label>Duration (hour / minute)</label>
                                    <input type="text" name="duration_movie" 
                                    className="border-2 rounded p-5 border-gray-200"                               
                                    placeholder={movie.duration_movie}                     
                                    value={values.duration_movie}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Director Name</label>
                            <input type="text" name="director_movie" 
                            className="border-2 rounded p-5 border-gray-200"                               
                            value={values.director_movie}
                            placeholder={movie.director_movie}                             
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Casts</label>
                            <input type="text" name="casts_movie" 
                            className="border-2 rounded p-5 border-gray-200"                               
                            placeholder={movie.casts_movie}                             
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
                                    placeholder={movie.synopsis_movie}                             
                                    value={values.synopsis_movie}
                                    className='border-2 border-gray-200 w-full rounded text-sm tracking-[1px] px-3.5 py-3.5'
                                    cols='30'
                                    rows='5'
                                ></textarea>
                            </div>
                        </div>
                        <hr className="my-5"/>
                        <button type="submit" className="w-full bg-primary font-bold text-white py-3 rounded">Update Movie</button>

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
                       status === undefined ? <p>Please wait for updating data</p> : status == 420 ? <p>Enter One Of Input</p> : status == 200 ? <p>Update Movie Success</p> : <p> Update Movie Failed</p>

                    }
                    <div className="modal-action">
                    <button className="btn" type='button' onClick={() => navigate(0)}>Close</button>
                    </div>
                </form>
        </dialog>
        </>
    )
}

export default Admin_Movie_update