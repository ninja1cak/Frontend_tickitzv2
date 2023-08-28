import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import Header from "../../../component/header";
import useApi from "../../../helper/useApi";

function Admin_Movie() {
    const api = useApi();
    const [movies, setMovies] = useState([]);
    const [page, setPage]= useState(1)
    const [meta, setMeta]= useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const navigate = useNavigate()
    
    const fetchMovies = async () => {
        try {
            let url = `/movie?limit=5&page=${page}&id_movie`;
    
            if (selectedDate) {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                url = `/movie?limit=5&page=${page}&release_date=${formattedDate}`;
            }
    
            const { data } = await api(url);
            if (data.meta === undefined) {
                data.meta = {
                    next: 0,
                    prev: 0,
                    meta: 0,
                };
            }
    
            const moviesWithFormattedDates = data.data.map(movie => ({
                ...movie,
                release_date_movie: moment(movie.release_date_movie).format('DD MMMM YYYY'),
            }));
    
            setMovies(moviesWithFormattedDates);
            setMeta(data.meta)
            
          } catch (error) {
            console.log(error)
          }
        }
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPage(1); // Reset page to 1 when changing date
    };
        
    const handleDelete = async (id_movie) => {
        try {
            setMovieToDelete(id_movie);
            setShowDeleteModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleConfirmDelete = async () => {
    try {
        await api.delete(`/movie/${movieToDelete}`);
        setMovies(prevMovies => prevMovies.filter(movies => movies.id_movie !== movieToDelete));
        setShowDeleteModal(false);
        setMovieToDelete(null);
    } catch (error) {
        console.log(error);
    }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setMovieToDelete(null);
    };

    useEffect(() =>{
        fetchMovies()
      }, [page])


    useEffect(() => {
        document.title = 'Admin Page - Movie Manage';
    });

    return (
        <>
        <Header />
        {/* Dashboard Admin Movie Start */}
        <div className="bg-gray-200 w-full h-full flex flex-col items-center">
            {/* Container Movie Start */}
            <div className="w-10/12 bg-white p-10 my-5 rounded-lg">
                {/* Header Container Start (Mobile) */}
                <div className="flex flex-col my-5 md:hidden lg:hidden">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-bold">List Movie</h1>
                        </div>
                        <Link to="/admin/movie/create/">
                            <button className="flex justify-center items-center text-center bg-[#1D4ED8] text-white text-xs px-6 py-2 rounded w-full">
                                Add Movies
                            </button>
                        </Link>
                    </div>
                    <div>
                        <div className="w-full flex justify-center my-5" data-te-datepicker-init data-te-inline="true" data-te-input-wrapper-init>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                placeholderText="Select date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
                {/* Header Container End (Mobile) */}
                {/* Header Container Start (Desktop)*/}
                <div className="flex justify-between my-5 hidden md:flex lg:flex">
                    <div>
                        <h1 className="font-bold">List Movie</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="relative max-w-sm">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    placeholderText="Select date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <Link to="/admin/movie/create/">
                            <button className="flex justify-center items-center text-center bg-[#1D4ED8] text-white text-xs px-6 py-2 rounded w-full">
                                Add Movies
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Header Container End (Desktop)*/}
                {/* Content Container Start */}
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Thumbnail</th>
                                <th>Movie Name</th>
                                <th>Category</th>
                                <th>Released Date</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            { movies ? (
                                movies.map((v) => {
                                    return (
                                        <tr>
                                        <th>
                                            <label>
                                                {v.id_movie}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle rounded-lg w-12 h-12">
                                                        <img src={v.url_image_movie} alt="Avatar" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{v.title_movie}</td>
                                        <td>{v.genre}</td>
                                        <td>{v.release_date_movie}</td>
                                        <td>{v.duration_movie}</td>
                                        <th>
                                            <div className="flex gap-1">
                                                <button className="btn bg-[#1D4ED8] btn-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <g clip-path="url(#clip0_114_10497)">
                                                        <path d="M9 3.375C5.25 3.375 2.0475 5.7075 0.75 9C2.0475 12.2925 5.25 14.625 9 14.625C12.7537 14.625 15.9525 12.2925 17.25 9C15.9525 5.7075 12.7537 3.375 9 3.375ZM9 12.75C6.93 12.75 5.25 11.07 5.25 9C5.25 6.93 6.93 5.25 9 5.25C11.07 5.25 12.75 6.93 12.75 9C12.75 11.07 11.07 12.75 9 12.75ZM9 6.75C7.75875 6.75 6.75 7.75875 6.75 9C6.75 10.2413 7.75875 11.25 9 11.25C10.2413 11.25 11.25 10.2413 11.25 9C11.25 7.75875 10.2413 6.75 9 6.75Z" fill="white"/>
                                                        </g>
                                                        <defs>
                                                        <clipPath id="clip0_114_10497">
                                                        <rect width="18" height="18" fill="white"/>
                                                        </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                                <button onClick={() => navigate(`/admin/movie/update/${v.id_movie}`)} className="btn bg-[#5D5FEF] btn-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <g clip-path="url(#clip0_114_10522)">
                                                            <path d="M2.25 12.9376V15.7501H5.0625L13.3612 7.45133L10.5487 4.63883L2.25 12.9376ZM15.5287 5.28383C15.8212 4.99133 15.8212 4.51508 15.5287 4.22258L13.7775 2.47133C13.485 2.17883 13.0087 2.17883 12.7162 2.47133L11.3438 3.84383L14.1562 6.65633L15.5287 5.28383Z" fill="white"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_114_10522">
                                                            <rect width="18" height="18" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                                <button className="btn bg-[#E82C2C] btn-sm" onClick={() => handleDelete(v.id_movie)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <g clip-path="url(#clip0_114_10472)">
                                                            <path d="M4.5 14.25C4.5 15.0787 5.17125 15.75 6 15.75H12C12.8287 15.75 13.5 15.0787 13.5 14.25V5.25H4.5V14.25ZM14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3Z" fill="white"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_114_10472">
                                                            <rect width="15" height="15" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>
                                        </th>
                                    </tr>

                                    );
                                })
                            ) : (
                                <h1 className="text-center">Data not found</h1>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                {showDeleteModal && (
                    <div className={`fixed inset-0 z-999 flex items-center justify-center`}>
                        {/* <div className="fixed inset-0 bg-gray-900 opacity-60"></div> */}
                            <div className="bg-white w-1/3 p-4 rounded shadow-md z-999">
                                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                                <p className="mb-4">Are you sure you want to delete this movies?</p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleCancelDelete}
                                        className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmDelete}
                                        className="px-4 py-2 bg-red-500 text-white ml-2 rounded hover:bg-red-700"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                    </div>
                )}
                </div>
                {/* Content Container End */}
            </div>
            {/* Pagination Start */}
            <div>
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
            {/* Pagination End */}
            {/* Container Movie End */}
        </div>
        {/* Dashoboard Admin Movie End */}
        </>
    )

}

export default Admin_Movie