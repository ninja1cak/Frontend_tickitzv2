import React, { useState, useEffect } from 'react'
import bgHero from '../../assets/hero-bg-login.png'
import logo from '../../assets/tickitz 1.svg'
import wavingIcon from '../../assets/waving-icon.png'
import google from '../../assets/google.png'
import facebook from '../../assets/fb.png'
import eyeOpen from '../../assets/eye-open.png'
import eyeClosed from '../../assets/eye-closed.png'

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../helper/useApi";
import { login } from "../../store/reducer/user";



function SignUp() {

    // const {isAuth} = useSelector((s) => s.users)
// const [form, setForm] = useState({})
// const api = useApi()
// const dispatch = useDispatch()
// const navigate = useNavigate()
// const [btnState, setBtnState] = useState(true)
// const [status, setStatus] = useState(0)
const [toggle, setToggle] = useState(false)

// const inputChange = (e) =>{
//     const data = {...form}
//     data[e.target.name] = e.target.value
//     setForm(data)
// }

// const goLogin = async () =>{
//     try {
//         console.log(form)
//         const {data} = await api({
//             method: 'POST',
//             data: form,
//             url:'/auth/'
//         })
//         setStatus(data.status)
//         if(data.status == 201){
//             const token = data.token
//             dispatch(login(token))
//             navigate('/home')
//         }
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }

const handleToggle = () => {
    setToggle(!toggle)
}
// useEffect(() =>{
//     if(isAuth)(
//         navigate('/home')
//     )
// },[])

// useEffect(() =>{
//     if(!form.password || !form.email ){
//         setBtnState(true)
//     }else{
//         setBtnState(false)
//     }
// },[form])

  return (
    <>
        <div className='w-full h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bgHero})`}}>
            <div className='md:w-4/5 lg:w-2/3 xl:w-1/2 h-5/6 md:h-screen flex flex-col justify-center items-center px-6'>
                <div className='w-1/3 md:w-3/5 mb-8'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='w-full h-2/3 bg-white rounded-md md:rounded-2xl'>
                    <div className='flex flex-col px-10 md:px-24'>
                        <div className='hidden md:flex justify-center gap-5 mt-8'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='h-10 w-10 flex justify-center items-center rounded-full bg-blue-600 text-white'>1</div>
                                <span className='text-sm'>Fill Form</span>
                            </div>
                            <div>
                                <span className='text-xl'>- - - - -</span>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='h-10 w-10 flex justify-center items-center rounded-full bg-slate-400 text-white'>2</div>
                                <span className='text-sm'>Activate</span>
                            </div>
                            <div>
                                <span className='text-xl'>- - - - -</span>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='h-10 w-10 flex justify-center items-center rounded-full bg-slate-400 text-white'>3</div>
                                <span className='text-sm'>Done</span>
                            </div>
                        </div>
                        <div className='flex flex-col mb-4 mt-8'>
                            <span className='text-lg font-medium mb-3'>Email</span>
                            <input className='rounded-md border-2 border-slate-300 bg-gray-100 placeholder:text-slate-400 placeholder:px-4' type="text" placeholder='Enter your email' required />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <span className='text-lg font-medium mb-3'>Password</span>
                            <div className='relative w-full'>
                                <input className='w-full rounded-md border-2 border-slate-300 bg-gray-100 placeholder:text-slate-400 placeholder:px-4' type={toggle == false ? "password" : "text"} placeholder='Enter your password' required/>
                                {
                                    (toggle == false) ? <img className='cursor-pointer absolute top-3 right-4 w-6 text-slate-500' src={eyeClosed} alt="eye-closed" onClick={handleToggle}/>
                                    : <img className='cursor-pointer absolute top-3 right-4 w-5 text-slate-500' src={eyeOpen} alt="eye-closed" onClick={handleToggle}/>
                                }
                            </div>
                        </div>
                        <div className='block md:hidden text-center mb-10 md:mb-4'>
                            <span className='text-slate-600 font-medium'>Already have an account?</span>
                            <Link className='ms-2 text-blue-500 font-medium underline underline-offset-4' to="/Login">Log in</Link>
                        </div>
                        <div className='hidden md:flex items-center gap-3 mb-10 md:mb-6'>
                            <input type="checkbox" required/>
                            <span>I agree to terms & conditions</span>
                        </div>
                        <div className='w-full mb-4'>
                            <button className='btn bg-blue-600 text-white w-full hover:text-blue-600 capitalize'>Login</button>
                        </div>
                        <div className='hidden md:block text-center mb-10 md:mb-2'>
                            <span className='text-slate-600 font-medium'>Already have an account?</span>
                            <Link className='ms-2 text-blue-500 font-medium underline underline-offset-4' to="/Login">Log in</Link>
                        </div>
                        <div className='flex justify-center items-center mb-2'>
                            <span className='font-medium text-slate-400'>Or</span>
                        </div>
                        <div className='flex justify-between md:mb-12 lg:mb-16'>
                            <button className='btn drop-shadow-lg w-2/5'>
                                <img className='h-5' src={google} alt="google-logo" />
                                <span className='hidden md:block text-slate-500 capitalize'>Google</span>
                            </button>
                            <button className='btn drop-shadow-lg w-2/5'>
                                <img className='h-6' src={facebook} alt="fb-logo" />
                                <span className='hidden md:block text-slate-500 capitalize'>Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default SignUp