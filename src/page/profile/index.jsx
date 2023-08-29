import React, {useRef, useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../component/header'
import Footer from '../../component/footer'
import eyeOpen from '../../assets/eye-open.png'
import eyeClosed from '../../assets/eye-closed.png'
import Points_Banner from '../../assets/points_banner.png'
import PP from '../../assets/dummy-user-removebg-preview.png'
import { logout } from '../../store/reducer/user'
import { useDispatch, useSelector } from "react-redux";
import { addData } from '../../store/reducer/user'
import useApi, {useApiMulti} from '../../helper/useApi'
import { Show } from '../../helper/toast'

function Profile() {
    const [user, setUser] = useState([])
    const [status,setStatus] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = useApi()
    const [form, setForm] = useState({})
    // const apiMulti = useApiMulti()
    const {isAuth} = useSelector((s) => s.users)
    const [toggle, setToggle] = useState(false)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [email_user, setEmailUser] = useState('')
    const [password_user, setPasswordUser] = useState({password: '', confirm: ''})
    const [btnState, setBtnState] = useState(true)
    const [btnStatePass, setBtnStatePass] = useState(true)
    const inputRef = useRef(null)
    const [image, setImage] = useState('')
    const [state, setState] = useState(true)

    const onImageClick = () => {
        inputRef.current.click()
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setImage(file)
        setState(false)
    }

    const handleSubmitImage = async () => {
        const formData = new FormData()
        window.my_modal_3.showModal()

        formData.append('file', image)
        const {data} = await api.patch(`/user/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          })
        setStatus(201)
    }

    const getUser = async () => {
        try {
          const {data} = await api('/user/profile')
          console.log(data)
        //   dispatch(addData(data))
        setUser(data.data[0])
        } catch (error) {
          console.log(error)
        }
      }

    const updateUserData = async (e) =>{  
        try {
            
            e.preventDefault()
            window.my_modal_2.showModal()
            const formData = new FormData()
            console.log('first_name', first_name)
            formData.append('first_name', first_name)
            formData.append('last_name', last_name)
            formData.append('phone_number', `+62${phone_number}`)

            formData.append('email_user', email_user)

            const {data} = await api.patch(`/user/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              })
              console.log(data)
              console.log(data.data[0].status)
              setStatus(data.status)
        } catch (error) {
            console.log(error)
            setStatus(404)
        }
    }

    const updateUserDataRes = async (e) =>{  
        try {
            
            e.preventDefault()
            const formData = new FormData()
            console.log('first_name', first_name)
            formData.append('first_name', first_name)
            formData.append('last_name', last_name)
            formData.append('phone_number', `+62${phone_number}`)
            formData.append('email_user', email_user)

            if(password_user.password !== password_user.confirm) {
                setStatus(400)
                console.log("INPUT BERBEDA")
            }
            if(password_user.password == null || password_user.confirm == null) {
                setStatus(400)
                console.log("Tidak boleh kosong")
            }

            formData.append('password_user', password_user.password)

            const {data} = await api.patch(`/user/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              })
              console.log(data)
              console.log(data.data[0].status)
              setStatus(data.status)
        } catch (error) {
            console.log(error)
            setStatus(404)
        }
    }

    const inputChange = (e) => {
        const data = { ...form }
        data[e.target.name] = e.target.value
        setForm(data)
    }

    const updatePassword = async (e) =>{
        try {
            e.preventDefault()
            window.my_modal_1.showModal()
            console.log(password_user.password, password_user.confirm)
            if(password_user.password === password_user.confirm){
                console.log(password_user.password)
                const formData = new FormData()
                formData.append('password_user', password_user.password)

                const {data} = await api.patch(`/user/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                  })
                console.log(data.status)
                setStatus(200)
            }else{
                setStatus(400)

                console.log("INPUT BERBEDA")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const goLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() =>{
        if(!isAuth){
            navigate('/')
        }
        getUser()
    }, [])

    useEffect(() =>{
        console.log(status)
        console.log(password_user)
        if(!first_name && !last_name && !email_user && !phone_number ){
            setBtnState(true)
        }else{
            setBtnState(false)
        }

        if(password_user.password.length < 6 || !password_user.confirm){
            setBtnStatePass(true)
        }else{
            setBtnStatePass(false)
        }
        if(status === 201) {
            navigate(0)
        }
    }, [status, password_user, first_name, last_name, email_user, phone_number])



    return (
    <>
    <Header />
    <main className='bg-gray-100 pt-5'>
        <div className="lg:flex lg:mx-auto lg:mt-10 lg:w-[100%] lg:max-w-7xl lg:px-6">
            <section>
            <div className="block mb-10  bg-white lg:hidden">
                <div className="flex justify-around pt-3 tracking-wider mx-auto max-w-lg">
                <Link
                    to="/profil"
                    className="border-b-4 border-primary pb-6 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                >
                    Details Account
                </Link>
                <Link
                    to="/order_history"
                    className="text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                >
                    Order History
                </Link>
                </div>
            </div>
            </section>
            <section className="hidden w-[100%] max-w-[320px] lg:block mr-10 ">
            <div className="block bg-white p-10 rounded-t-lg ">
                <p>INFO</p>
                <div className="flex flex-col items-center mt-6 tracking-wider">
                <div className="flex flex-col justify-center items-center relative group">
                    <btn onClick={onImageClick} className=" hover:bg-primary hover:text-white group-hover:flex hidden  rounded-lg btn absolute border-none">Change <br /> Image</btn>

                    <img onClick={onImageClick} src={ image ? URL.createObjectURL(image) : (user.url_photo_user == null ? PP : user.url_photo_user ) } className="object-cover mx-auto rounded-full h-36 w-36 cursor-pointer" alt="profile_picture" />
                    <span className="flex items-center gap-4 mt-3">
                        <input type="file" onChange={handleImageChange} ref={inputRef} style={{ display: "none" }} />
                    </span>
                </div>
                <button disabled={ state } onClick={handleSubmitImage} className="flex items-center gap-6 enabled:hover:opacity-50 cursor-default enabled:hover:cursor-pointer">
                    <h4 className="text-nd md:text-xl font-medium text-gray-500  ">Edit</h4>
                </button>

                <p className="font-medium text-lg mt-4 mb-2">{user.first_name + ' ' + user.last_name }</p>
                <p className="text-sm text-gray-600 ">Moviegoers</p>
                </div>
            </div>
            <div className="block border-t border-gray-300 bg-white py-6 rounded-b-lg">
                <div className='px-10 pt-4'>
                    <span className='font-medium text-slate-500'>Loyalty Points</span>
                    <div className='relative my-6'>
                        <img className='h-32 rounded-xl' src={Points_Banner} alt="point_banner" />
                        <div className='absolute top-0 flex flex-col px-6 pt-5'>
                            <span className='text-white font-bold text-xl'>Movigoers</span>
                            <div className='pt-8'>
                                <span className='text-white text-2xl font-medium'>320</span>
                                <span className='pl-2 text-white'>points</span>
                            </div>
                        </div>
                    </div>
                    <span className='text-lg text-slate-500'>180 points become a master</span>
                    <input type="range" min={0} max="100" value="50" className="range range-sm range-primary" disabled/> 
                </div>
            </div>
            </section>
            <div className="lg:w-[100%]">
            <section>
                <div className="hidden mb-10  bg-white lg:block pt-1 rounded-lg ">
                <div className="flex justify-start pt-3 tracking-wider max-w-lg">
                    <Link
                    to="/profil"
                    className="border-b-4 border-primary pb-6 lg:mx-6 lg:mr-10 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                    >
                    Account Settings
                    </Link>
                    <Link
                    to="/order_history"
                    className="text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                    >
                    Order History
                    </Link>
                </div>
                </div>
            </section>
            <section className="block mx-8 md-mx-auto max-w-2xl lg:hidden">
                <div className="block bg-white mx-3 p-6 rounded-t-lg ">
                <p>INFO</p>
                <div className="flex flex-col items-center mt-6 tracking-wider">
                    <img onClick={onImageClick}
                    className="object-cover mx-auto rounded-full h-36 w-36 cursor-pointer"
                    src={ image ? URL.createObjectURL(image) : (user.url_photo_user == null ? PP : user.url_photo_user ) }
                    />
                    <p className="font-medium text-lg mt-4 mb-2">{`${user.first_name} ${user.last_name}`}</p>
                    <p className="text-sm text-gray-600 ">Moviegoers</p>
                </div>

                </div>
                <div className="block border-t mx-3 border-gray-300 bg-white py-6 rounded-b-lg">
                    <div className='block md:hidden px-10 pt-4'>
                        <span className='font-medium text-slate-500'>Loyalty Points</span>
                        <div className='relative my-6'>
                            <img className='h-32 rounded-xl' src={Points_Banner} alt="point_banner" />
                            <div className='absolute top-0 flex flex-col px-6 pt-5'>
                                <span className='text-white font-bold text-xl'>Movigoers</span>
                                <div className='pt-8'>
                                    <span className='text-white text-2xl font-medium'>320</span>
                                    <span className='pl-2 text-white'>points</span>
                                </div>
                            </div>
                        </div>
                        <span className='text-lg text-slate-500'>180 points become a master</span>
                        <input type="range" min={0} max="100" value="50" className="range range-sm range-primary" disabled/> 
                    </div>
                    <div className='w-full flex justify-center py-6 px-6'>
                        <button className='btn btn-outline btn-ghost text-blue-700 w-full capitalize' onClick={()=>window.mobile_edit_profile.showModal()}>Edit Profile</button>
                        <dialog id="mobile_edit_profile" className="modal">
                        <form method="dialog" className="modal-box">
                            <div className='modal-action'>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>console.log('Tess')}>✕</button>
                            </div>
                            {
                                status === 201 ?

                                <p>
                                    Update Success!!
                                </p> 
                            : 
                                <div className="mx-3 mt-8 lg:mx-0">
                                    <p className="text-lg font-medium text-gray-800 pl-6 mb-8 lg:hidden">
                                        Account Settings
                                    </p>
                            <div className="bg-white p-6 rounded-lg">
                                <p className="border-b mb-10 border-gray-300 pb-2 text-lg">
                                Details Information
                                </p>
                                <form className="tracking-wider lg:flex lg:flex-wrap lg:gap-x-10 " method='POST' encType="multipart/form-data" >
                                <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                                    <label className="block mb-3 lg:block ">First Name</label>
                                    
                                    <input
                                    className="pl-6 block border border-gray-300 w-full h-10 rounded-lg  bg-gray-50"
                                    type="text"
                                    placeholder={user.first_name}
                                    onChange={(e) => setFirstName(e.target.value) }
                                    />
                                    {/* {e => setFirstName(e.target.value)} */}
                                </div>
                                <div className="block mb-6 lg:mb-0 lg:block lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                                    <label className="block mb-3 ">Last Name</label>
                                    <input
                                    className="pl-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50 "
                                    type="text"
                                    placeholder={user.last_name}
                                    name='last_name'
                                    onChange={(e) => setLastName(e.target.value) }
            // {e => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                                    <label className="block mb-3">E-mail</label>
                                    
                                    <input
                                    className="pl-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                                    type="text"
                                    placeholder={user.email_user}
                                    onChange={(e) => setEmailUser(e.target.value)}
                                    // {e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6  xl:w-[100%] xl:max-w-[350px]">
                                    <label className="block mb-3">Phone Number</label>
                                    <div className=" bg-gray-50 flex items-center border border-gray-300 rounded-lg lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                                    <button className="px-4 font-sans tracking-wider text-black">
                                        +62
                                    </button>
                                    <div className="border-r h-8" />
                                
                                    <input
                                        type="number"
                                        className="h-11 pl-5 w-full lg:w-[100%] lg:max-w-[300px] rounded-lg bg-gray-50"
                                        placeholder={user.phone_number ? user.phone_number.slice(3):'update your phone number' }
                                        value={form.phone_number}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        // {e => setPhoneNumber(e.target.value)}
                                    />
                                    </div>
                                </div>
                                <div className="relative mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">New Password</label>
                        <input
                        className="px-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type= {toggle == false ? 'password' : 'text'}
                        placeholder='Write your password'
                        onChange={e => setPasswordUser({...password_user,password : e.target.value})}
                        required 
                        />
                        {
                            (toggle === false) ? <img className='cursor-pointer absolute top-12 right-4 w-6 text-slate-500' src={eyeClosed} alt="eye-closed" onClick={handleToggle}/>
                            : <img className='cursor-pointer absolute top-12 right-4 w-5 text-slate-500' src={eyeOpen} alt="eye-closed" onClick={handleToggle}/>
                        }
                        {
                            !password_user.password ? '' : password_user.password.length <6  ? <p className=' absolute text-red-700 font-medium text-sm'>Minimum password 6</p> : ''
                        }
                    </div>
                    <div className="relative mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">Confirm</label>
                        
                        <input
                        className="px-6 relative border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type= {toggle == false ? 'password' : 'text'}
                        placeholder="Confirm your password"
                        onChange={e => setPasswordUser({...password_user, confirm : e.target.value})}
                        required
                        />
                        {
                            !password_user.confirm ? '' : password_user.confirm !== password_user.password ? <p className=' absolute text-red-700 font-medium text-sm'> Password not same, input again</p> : ''
                        }
                        {
                            (toggle === false) ? <img className='cursor-pointer absolute top-12 right-4 w-6 text-slate-500' src={eyeClosed} alt="eye-closed" onClick={handleToggle}/>
                            : <img className='cursor-pointer absolute top-12 right-4 w-5 text-slate-500' src={eyeOpen} alt="eye-closed" onClick={handleToggle}/>
                        }
                    </div>
                                </form>
                            </div>

                            </div>
                            }
                            <button  className="block btn mx-auto lg:mx-0 bg-primary text-white w-[80%] max-w-xl lg:max-w-xs p-2 my-10 rounded-lg wider hover:opacity-50 active:opacity-100 active:bg-gray-100 active:text-primary border active:border-primary" disabled={btnState} onClick={updateUserDataRes}>
                                Update changes
                            </button>
                        </form>
                        </dialog>
                    </div>
                </div>
                
            </section>
            <section className="hidden md:block mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="mx-3 mt-8 lg:mx-0">
                <p className="text-lg font-medium text-gray-800 mb-8 lg:hidden">
                    Account Settings
                </p>
                <div className="bg-white p-6 rounded-lg">
                    <p className="border-b mb-10 border-gray-300 pb-2 text-lg">
                    Details Information
                    </p>
                    <form className="tracking-wider lg:flex lg:flex-wrap lg:gap-x-10 " method='POST' encType="multipart/form-data" >
                    <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3 lg:block ">First Name</label>
                        
                        <input
                        className="pl-6 block border border-gray-300 w-full h-10 rounded-lg  bg-gray-50"
                        type="text"
                        placeholder={user.first_name}
                        onChange={(e) => setFirstName(e.target.value) }
                        />
                        {/* {e => setFirstName(e.target.value)} */}
                    </div>
                    <div className="block mb-6 lg:mb-0 lg:block lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3 ">Last Name</label>
                        <input
                        className="pl-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50 "
                        type="text"
                        placeholder={user.last_name}
                        name='last_name'
                        onChange={(e) => setLastName(e.target.value) }
// {e => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">E-mail</label>
                        
                        <input
                        className="pl-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type="text"
                        placeholder={user.email_user}
                        onChange={(e) => setEmailUser(e.target.value)}
                        // {e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6  xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">Phone Number</label>
                        <div className=" bg-gray-50 flex items-center border border-gray-300 rounded-lg lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <button className="px-4 font-sans tracking-wider text-black">
                            +62
                        </button>
                        <div className="border-r h-8" />
                    
                        <input
                            type="number"
                            className="h-11 pl-5 w-full lg:w-[100%] lg:max-w-[300px] rounded-lg bg-gray-50"
                            placeholder={user.phone_number ? user.phone_number.slice(3):'update your phone number' }
                            value={form.phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            // {e => setPhoneNumber(e.target.value)}
                        />
                        </div>
                    </div>

                    </form>
                </div>

                </div>
                <button  className="block btn mx-auto lg:mx-0 bg-primary text-white w-[80%] max-w-xl lg:max-w-xs p-2 my-10 rounded-lg wider hover:opacity-50 active:opacity-100 active:bg-gray-100 active:text-primary border active:border-primary" disabled={btnState} onClick={updateUserData}>
                    Update changes
                </button>
                <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Status</h3>

                    {
                       status === undefined ? <p>Please wait for updating data</p> : status == 201 ? <p>Update data user success</p> : <p> Update data user failed</p>

                    }
                    <div className="modal-action">
                    <button className="btn" type='button' onClick={() =>  {email_user ? goLogout() : navigate(0)}}>Close</button>
                    </div>
                </form>
                </dialog>
                
            </section>
            <section className="hidden md:block mx-auto max-w-2xl lg:mx-0 lg:max-w-none ">
                <div className="mx-3 mt-8 lg:mx-0">
                <div className="bg-white p-6 rounded-lg ">
                    <p className="border-b mb-10 border-gray-300 pb-2 text-lg">
                    Account and Privacy
                    </p>
                    <form className="tracking-wider lg:flex lg:gap-x-10 " method='POST' encType="multipart/form-data" >
                    <div className="relative mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">New Password</label>
                        <input
                        className="px-6 block border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type= {toggle == false ? 'password' : 'text'}
                        placeholder='Write your password'
                        onChange={e => setPasswordUser({...password_user,password : e.target.value})}
                        // 
                        />
                        {
                            (toggle === false) ? <img className='cursor-pointer absolute top-12 right-4 w-6 text-slate-500' src={eyeClosed} alt="eye-closed" onClick={handleToggle}/>
                            : <img className='cursor-pointer absolute top-12 right-4 w-5 text-slate-500' src={eyeOpen} alt="eye-closed" onClick={handleToggle}/>
                        }
                        {
                            !password_user.password ? '' : password_user.password.length <6  ? <p className=' absolute text-red-700 font-medium text-sm'>Minimum password 6</p> : ''
                        }
                    </div>
                    <div className="relative mb-6 lg:w-[100%] lg:max-w-[250px] xl:w-[100%] xl:max-w-[350px]">
                        <label className="block mb-3">Confirm</label>
                        
                        <input
                        className="px-6 relative border border-gray-300 w-full h-10 rounded-lg bg-gray-50"
                        type= {toggle == false ? 'password' : 'text'}
                        placeholder="Confirm your password"
                        onChange={e => setPasswordUser({...password_user, confirm : e.target.value})}
                        // {e => setConfirmPassword(e.target.value)}
                        />
                        {
                            !password_user.confirm ? '' : password_user.confirm !== password_user.password ? <p className=' absolute text-red-700 font-medium text-sm'> Password not same, input again</p> : ''
                        }
                        {
                            (toggle === false) ? <img className='cursor-pointer absolute top-12 right-4 w-6 text-slate-500' src={eyeClosed} alt="eye-closed" onClick={handleToggle}/>
                            : <img className='cursor-pointer absolute top-12 right-4 w-5 text-slate-500' src={eyeOpen} alt="eye-closed" onClick={handleToggle}/>
                        }
                    </div>
                    </form>
                </div>
                <button onClick={updatePassword}  disabled={btnStatePass} className="block btn mx-auto lg:mx-0 bg-primary text-white w-[80%] max-w-xl lg:max-w-xs p-2 my-10 rounded-lg wider hover:opacity-50 active:opacity-100 active:bg-gray-100 active:text-primary border active:border-primary">
                    Update changes
                </button>
                <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Status</h3>
                     {
                       status === undefined ? <p>Please wait for updating data</p> : status == 400 ? <p>PASSWORD NOT SAME, INPUT AGAIN</p> : status == 200 && password_user.password ? <p>Update password success</p> : <p> update password failed</p>

                    }
                    <div className="modal-action">
                    <button className="btn" type='button' onClick={() => navigate(0)}>Close</button>
                    </div>
                </form>
                </dialog>
                </div>
                
            </section>
            </div>
            
        </div>
        
    </main>
    <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Status</h3>

        {
            status === undefined ? <p>Please wait for updating data</p> : status == 201 ? <p>Change image success</p> : <p> Change image success</p>

        }
        <div className="modal-action">
        <button className="btn" type='button' onClick={() =>  {email_user ? goLogout() : navigate(0)}}>Close</button>
        </div>
    </form>
    </dialog>
    <div className='hidden md:block'>
        <Footer />
    </div>
    
    </>
  )
}

export default Profile