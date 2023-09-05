import React, { useEffect, useState } from 'react'
import logo from '../assets/Vector.svg'
import mglass from '../assets/bx_bx-search.jpg'
import burger from '../assets/gg_menu-right-alt.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { addData, logout } from '../store/reducer/user'
import useApi from '../helper/useApi'
import PP from '../assets/dummy-user-removebg-preview.png'



function Header() {
  const {data, isAuth} = useSelector((s)=>s.users)
  const dispatch = useDispatch()
  const api = useApi()
  const [user, setUser] = useState({})
  const getUser = async () => {
    try {
      const {data} = await api('/user/profile')
      setUser(data.data[0])
      dispatch(addData(data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    if(isAuth){
      getUser()
    }

  }, [])
  return (
  <header className="bg-white">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 ">
    <div className="md:flex md:gap-x-12 items-center justify-between">
      <Link href="#">
        <img
          className="h-9 md:h-9 md:w-auto"
          to="/"
          src={logo}
          alt="logo"
        />
      </Link>
    </div>
    <div className='flex gap-x-12'> 
    { isAuth && user && user.role === 'admin' ? (
            <>
                <Link className="hidden lg:flex text-base hover:font-bold font-sans " to="/">Home</Link>
                <Link className="hidden lg:flex text-base hover:font-bold pl-7 font-sans " to="/admin">Dashboard</Link>
                <Link className="hidden lg:flex text-base hover:font-bold pl-7 font-sans " to="/admin/movie">Manage Movie</Link>
            </>
        ) : (
            <>
                <Link className="hidden lg:flex text-base hover:font-bold font-sans " to="/">Home</Link>
                <Link className="hidden lg:flex text-base hover:font-bold pl-7 font-sans " to="/">Movies</Link>
                <Link className="hidden lg:flex text-base hover:font-bold pl-7 font-sans " to="/">Buy ticket</Link>
            </>
        )}
    </div>
    {isAuth ? (
          <div className="hidden md:flex md:gap-x-12 items-center justify-between">
          <img
            className="md:h-6 h-6 md:w-auto"
            src={mglass}
            alt=""
          />
          <div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 btn-ghost btn-circle avatar">
              {user.url_photo_user ? (
                <img
                className="object-cover rounded-full w-5 h-auto"
                src={user.url_photo_user}
                alt=""
              />
              ):(
                <img
                className="object-cover w-5 h-auto"
                src={PP}
                alt=""
                />
              )}           
            </label>
            {
              user && user.role === 'admin' ? 
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/admin">Dashboard</Link></li>
                    <li><Link to="/admin/movie">Manage Movie</Link></li>
                    <li><Link to="/" onClick={()=>{dispatch(logout())}}>Logout</Link></li>
              </ul>
            : 
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              
              <li><Link to='/profile'>Profile</Link></li>
              <li><Link to='/'>Home</Link></li>

              <li><Link to="/" onClick={()=>{dispatch(logout())}}>Logout</Link></li>
            </ul>

            }
          </div>
          </div>

        </div>
        ) : (
        <div>
        <div className="hidden md:flex md:gap-x-6 items-center justify-between">
          <Link className="border hover:border-4 hover:border-gray-100 border-primary h-14 w-32 hover:font-black bg-white text-primary mx-auto items-center flex justify-center rounded-lg hover:bg-primary hover:text-white" to="/login">Sign In</Link>
          <Link className="border h-14 w-32 hover:border-4 border-gray-100 hover:font-black bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary" to="/register">Sign Up</Link>
        </div>
        </div>

      )}

      {isAuth && user && user.role === 'admin' ? (
                <div className="md:hidden dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} fill="none" className="btn m-2"><img src={burger} alt="" /></label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu items-center shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/admin">Dashboard</Link></li>
                    <li><Link to="/admin/movie">Manage Movie</Link></li>
                    <li><Link to="/" onClick={()=>{dispatch(logout())}}>Logout</Link></li>
                </ul>
            </div>
      ): isAuth && user && user.role === 'user' ? 
      <div className="md:hidden dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} fill="none" className="btn m-2"><img src={burger} alt="" /></label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu items-center shadow bg-base-100 rounded-box w-52">
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/'>Home</Link></li>
          <li><Link to="/" onClick={()=>{dispatch(logout())}}>Logout</Link></li>
      </ul>
    </div>
      :
      (
        <div className="md:hidden dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} fill="none" className="btn m-2"><img src={burger} alt="" /></label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu items-center shadow bg-base-100 rounded-box w-52">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
      </div>
      )}


  </nav>
</header>

  )
}

export default Header