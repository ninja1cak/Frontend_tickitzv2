import React from 'react'
import logo from '../assets/Vector.svg'
import mglass from '../assets/bx_bx-search.jpg'
import avatar from '../assets/Ellipse 11.svg'
import burger from '../assets/gg_menu-right-alt.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { logout } from '../store/reducer/user'

function Header() {
  const {isAuth} = useSelector((s)=>s.users)
  const {data} = useSelector((s)=>s.users)
  const dispatch = useDispatch()

  return (
  <header className="bg-white">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 ">
    <div className="md:flex md:gap-x-12 items-center justify-between">
      <Link href="#">
        <img
          className="h-9 md:h-9 md:w-auto"
          to="/home"
          src={logo}
          alt="logo"
        />
      </Link>
    </div>
    <div className='flex gap-x-12'> 
    { data[0] && data[0].roles === 'admin' ? (
            <>
                <Link className="hidden text-base font-sans " to="/home">Dashboard</Link>
                <Link className="hidden text-base font-sans " to="/movie">List Movie</Link>
                <Link className="hidden text-base font-sans " to="/manage">Manage Movie</Link>
            </>
        ) : (
            <>
                <Link className="hidden lg:flex text-base hover:font-bold font-sans " to="/home">Home</Link>
                <Link className="hidden lg:flex text-base hover:font-bold pl-7 font-sans " to="/movie">Movies</Link>
                <Link className="hidden lg:flex text-base hover:font-bold pl-7 font-sans " to="/payment">Buy ticket</Link>
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
              {data[0] ? (
                <img
                className="object-cover rounded-full w-5 h-auto"
                src={data[0].user_image}
                alt=""
              />
              ):(
                <img
                className="object-cover w-5 h-auto"
                src={avatar}
                alt=""
                />
              )}           
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to='/profile'>Profile</Link></li>
              <li><Link to="/home" onClick={()=>{dispatch(logout())}}>Logout</Link></li>
            </ul>
          </div>
          </div>

        </div>
        ) : (
        <div>
        <div className="hidden md:flex md:gap-x-6 items-center justify-between">
          <Link className="border hover:border-4 hover:border-gray-100 border-primary h-14 w-32 hover:font-black bg-white text-primary mx-auto items-center flex justify-center rounded-lg hover:bg-primary hover:text-white" to="/">Sign In</Link>
          <Link className="border h-14 w-32 hover:border-4 border-gray-100 hover:font-black bg-primary mx-auto items-center flex justify-center text-white rounded-lg hover:bg-white hover:text-primary" to="/">Sign Up</Link>
        </div>
        </div>

      )}

      {isAuth ? (
                <div className="md:hidden dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} fill="none" className="btn m-2"><img src={burger} alt="" /></label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu items-center shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to="/movie">List Movie</Link></li>
                    <li><Link to="/home">Dashboard</Link></li>
                    <li><Link to="/home" onClick={()=>{dispatch(logout())}}>Logout</Link></li>
                </ul>
            </div>
      ):(
        <div className="md:hidden dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} fill="none" className="btn m-2"><img src={burger} alt="" /></label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu items-center shadow bg-base-100 rounded-box w-52">
            <li><a>List Movie</a></li>
            <li><a>Home</a></li>
        </ul>
      </div>
      )}


  </nav>
</header>

  )
}

export default Header