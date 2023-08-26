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



function Login() {

    const {isAuth} = useSelector((s) => s.users)
    const [form, setForm] = useState({})
    const api = useApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [btnState, setBtnState] = useState(true)
    const [status, setStatus] = useState(0)
    const [error, setError] = useState('')
    const [toggle, setToggle] = useState(false)

    const inputChange = (e) =>{
        const data = {...form}
        data[e.target.name] = e.target.value
        setForm(data)
    }

const goLogin = async () =>{
    try {
        console.log(form)
        const {data} = await api({
            method: 'POST',
            data: form,
            url:'/login/'
        })

        setStatus(data.status)
        if(data.status == 200){
            const token = data.data
            dispatch(login(token))
            navigate('/')
        }
    } catch (error) {
        console.log(error)
        setStatus(error.response.data.status)
        setError(error.response.data.description)
    }
}

const handleToggle = () => {
    setToggle(!toggle)
}

useEffect(() =>{
    if(isAuth)(
        navigate('/')
    )
},[])

useEffect(() =>{
    if(!form.password_user || !form.email_user ){
        setBtnState(true)
    }else{
        setBtnState(false)
    }
    console.log(form)
},[form,error])

  return (
    <>
        <div className='w-full h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bgHero})`}}>
            <div className='md:w-4/5 lg:w-2/3 xl:w-1/2 h-5/6 flex flex-col justify-center items-center px-6'>
                <div className='w-1/3 md:w-3/5 mb-8'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='w-full h-full bg-white rounded-md md:rounded-2xl'>
                    <div className='flex flex-col px-10 md:px-24'>
                        <div className='flex items-center mt-8 lg:mt-10'>
                            <h1 className='inline font-semibold text-2xl md:text-4xl mb-6'>Welcome Back</h1>
                            <img className='inline hidden md:block h-10 md:h-16 w-10 md:w-16' src={wavingIcon} alt="wave-icon" />
                        </div>
                        <div className='mb-6'>
                            <span className='text-xl text-slate-400 leading-4'>Sign in with your data that you entered during your registration</span>
                        </div>
                        <div className='relative flex flex-col mb-4'>
                            <span className='text-lg font-medium mb-3'>Email</span>
                            <input className='rounded-md border-2 border-slate-300 bg-gray-100 placeholder:text-slate-400 placeholder:px-4' type="text" placeholder='Enter your email' name='email_user' onChange={inputChange} />
                            {
                                error === "Your account is not verify" ?
                                <span className='absolute bottom-[-25px] right-0 text-red-500 font-bold'>{error}</span>
                                : 
                                error === "username not found" ?
                                <span className='absolute bottom-[-25px] right-0 text-red-500 font-bold'>Email not registered</span>
                                :
                                status === 401 ? 
                                <span className='absolute bottom-[-25px] right-0 text-red-500 font-bold'>Email not validate as email</span>
                                :
                                <></>
                            }
                        </div>
                        <div className='relative flex flex-col mb-5'>
                            <span className='text-lg font-medium mb-3'>Password</span>
                            <div className='relative w-full'>
                                <input className='w-full rounded-md border-2 border-slate-300 bg-gray-100 placeholder:text-slate-400 placeholder:px-4' type={toggle == false ? "password" : "text"} name='password_user' onChange={inputChange} placeholder='Enter your password' />
                                {
                                    (toggle === false) ? <img className='cursor-pointer absolute top-3 right-4 w-6 text-slate-500' src={eyeClosed} alt="eye-closed" onClick={handleToggle}/>
                                    : <img className='cursor-pointer absolute top-3 right-4 w-5 text-slate-500' src={eyeOpen} alt="eye-closed" onClick={handleToggle}/>
                                }
                            </div>
                            {
                                error === 'wrong password' ?
                                <span className='absolute bottom-[-22px] right-0 text-red-500 font-bold'>Wrong password</span>
                                : 
                                <></>
                            }
                        </div>
                        <div className='flex justify-end mb-10 md:mb-4'>
                            <span className='text-blue-600 font-medium'>Forgot your password</span>
                        </div>
                        <div className='w-full mb-4'>
                            <button className='btn bg-blue-600 text-white w-full hover:text-blue-600 capitalize' disabled={btnState} onClick={goLogin}>Login</button>
                        </div>
                        <div className='flex justify-center items-center mb-4'>
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

export default Login