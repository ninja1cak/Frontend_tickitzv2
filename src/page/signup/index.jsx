import React, { useState, useEffect } from 'react'
import bgHero from '../../assets/hero-bg-login.png'
import logo from '../../assets/tickitz 1.svg'
import wavingIcon from '../../assets/waving-icon.png'
import google from '../../assets/google.png'
import facebook from '../../assets/fb.png'
import eyeOpen from '../../assets/eye-open.png'
import eyeClosed from '../../assets/eye-closed.png'

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../helper/useApi";
import { login } from "../../store/reducer/user";



function SignUp() {

const {isAuth} = useSelector((s) => s.users)
const [form, setForm] = useState({
    email_user : '',
    password_user: ''
})
const api = useApi()
const dispatch = useDispatch()
const navigate = useNavigate()
const [btnState, setBtnState] = useState(true)
const [status, setStatus] = useState(0)
const [error, setError] = useState('')
const [toggle, setToggle] = useState(false)
const [checkbox, setCheckBox] = useState()
const params = useParams()
const inputChange = (e) =>{
    const data = {...form}
    data[e.target.name] = e.target.value
    setForm(data)
}

const handleCheckbox = (e) =>{
    setCheckBox(e.target.checked)
}

const verifyAccount = async () =>{
    try {
        const {data} = await api(`/auth/${params.token}`)
        console.log(data)
        setStatus(data.status+1)
    } catch (error) {
        
    }
}

const goRegister = async () =>{
    try {
        console.log(form)
        const {data} = await api({
            method: 'POST',
            data: form,
            url:'/user/'
        })
        setStatus(data.status)
        console.log(data)
    } catch (error) {
        console.log(error.response.data)
        setStatus(error.response.data.status)
        setError(error.response.data.description)
    }
}

const handleToggle = () => {
    setToggle(!toggle)
}
useEffect(() =>{
    document.title = 'Tickitz - Sign Up'
    if(isAuth)(
        navigate('/home')
    )
    if(params.token){
        verifyAccount()
    }
},[])

useEffect(() =>{
    console.log(form, checkbox)

    if(!form.password_user || !form.email_user || form.password_user.length<=6 || !checkbox){
        setBtnState(true)
    }else{
        setBtnState(false)
    }
},[form, checkbox, status, error])

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
                                {
                                    status === 200 || status === 201?
                                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-green-400 text-white'>1</div>
                                    :
                                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-blue-600 text-white'>1</div>
                                }
                                <span className='text-sm'>Fill Form</span>  
                            </div>
                            <div>
                                <span className='text-xl'>- - - - -</span>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                {
                                    status === 200 ?
                                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-blue-600 text-white'>2</div>
                                    : status === 201 ? 
                                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-green-400 text-white'>2</div>
                                    :
                                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-slate-400 text-white'>2</div>
                                }
                                <span className='text-sm'>Activate</span>
                            </div>
                            <div>
                                <span className='text-xl'>- - - - -</span>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                {
                                    status === 201 ? 
                                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-green-400 text-white'>3</div>
                                    :
                                    <div className='h-10 w-10 flex justify-center items-center rounded-full bg-slate-400 text-white'>3</div>


                                }
                                <span className='text-sm'>Done</span>
                            </div>
                        </div>
                        {
                            status === 200 ?
                            <div className='mt-8'>
                                <span className=' text-lg font-medium'>Activate Your Account</span>
                                <p>Check your email for activate your account</p>
                            </div>
                            : status === 201 ? 
                            <div className='mt-8'>
                                <span className=' text-lg font-medium mt-8'>Activate Account Success</span>
                        
                                <p><Link to='/login' className=' text-primary font-bold hover:opacity-70 active:opacity-50' > Click here </Link> for go to login page</p>
                            </div>
                            :
                        <>
                        <div className='relative flex flex-col mb-4 mt-8'>
                            <span className='text-lg font-medium mb-3'>Email</span>
                            <input className='rounded-md border-2 border-slate-300 bg-gray-100 placeholder:text-slate-400 placeholder:px-4' type="text" placeholder='Enter your email' required name="email_user" onChange={inputChange}/>
                            {
                                error === 'pq: duplicate key value violates unique constraint "email"' ?
                                <span className='absolute bottom-[-25px] right-0 text-red-500 font-bold'>Email already registered</span>
                                : status === 401 ? 
                                <span className='absolute bottom-[-25px] right-0 text-red-500 font-bold'>Email not validate as email</span>
                                :
                                <></>
                            }
                        </div>
                        <div className='relative flex flex-col mb-5'>
                            <span className='text-lg font-medium mb-3'>Password</span>
                            <div className='relative w-full'>
                                <input className='w-full rounded-md border-2 border-slate-300 bg-gray-100 placeholder:text-slate-400 placeholder:px-4' type={toggle == false ? "password" : "text"} placeholder='Enter your password' required name='password_user' onChange={inputChange}/>
                                {
                                    (toggle == false) ? <img className='cursor-pointer absolute top-3 right-4 w-6 text-slate-500' src={eyeClosed} alt="eye-closed" onClick={handleToggle}/>
                                    : <img className='cursor-pointer absolute top-3 right-4 w-5 text-slate-500' src={eyeOpen} alt="eye-closed" onClick={handleToggle}/>
                                }
                            </div>
                            {
                                form.password_user.length < 6 && form.password_user !== '' ?
                                <span className='absolute bottom-[-22px] right-0 text-red-500 font-bold'>Minimum password 6</span>
                                : 
                                <></>
                            }
                        </div>
                        <div className='block md:hidden text-center mb-10 md:mb-4'>
                            <span className='text-slate-600 font-medium'>Already have an account?</span>
                            <Link className='ms-2 text-blue-500 font-medium underline underline-offset-4' to="/Login">Log in</Link>
                        </div>
                        <div className='hidden md:flex items-center gap-3 mb-10 md:mb-6'>
                            <input type="checkbox" required onClick={handleCheckbox} name='checkbox'/>
                            <span>I agree to terms & conditions</span>
                        </div>
                        <div className='w-full mb-4'>
                            <button disabled={btnState} className='btn bg-blue-600 text-white w-full hover:text-blue-600 hover:font-black capitalize' onClick={goRegister}>Register</button>
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
                        </>
                        }


                    </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default SignUp