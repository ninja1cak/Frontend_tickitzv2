import React, {useEffect, useState} from "react";
import Header from "../../component/header";
import Footer from '../../component/footer'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/reducer/user'
import { useSelector, useDispatch } from 'react-redux'
import useApi from "../../helper/useApi";


function Order_history() {
    const api = useApi();
    const [user, setUser] = useState([])
    const {isAuth} = useSelector((s) => s.users)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getUserData = async () =>{
        
        try {
            // const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/user/`)    
            const {data} = await api({
                url: '/user'
            })
            setUser(data.data[0])
            
        } catch (error) {
            console.log(error)
        }
    }

    const goLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    

    useEffect(() =>{
        if(!isAuth){
            navigate('/')
        }
        getUserData()
    }, [])


    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full flex items-center justify-center py-5">
            <div className="flex w-9/12">
                <section>
                    <div className="block mb-10  bg-white lg:hidden">
                        <div className="flex justify-around pt-3 tracking-wider mx-auto max-w-lg">
                        <a
                            href="./profilpage.html"
                            className="border-b-4 border-primary pb-6 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                        >
                            Details Account
                        </a>
                        <a
                            href="./orderhistory.html"
                            className="text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                        >
                            Order History
                        </a>
                        </div>
                    </div>
                </section>
                <section className="hidden w-[100%] max-w-[320px] lg:block mr-10 ">
                    <div className="block bg-white p-10 rounded-t-lg ">
                        <p>INFO</p>
                        <div className="flex flex-col items-center mt-6 tracking-wider">
                        <img
                            className="mx-auto rounded-full h-36"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        />
                        <p className="font-medium text-lg mt-4 mb-2">{user.first_name + ' ' + user.last_name }</p>
                        <p className="text-sm text-gray-600 ">Moviegoers</p>
                        </div>
                    </div>
                    <div className="block border-t border-gray-300 bg-white py-6 rounded-b-lg">
                        <button onClick={goLogout} className="block bg-primary h-11 w-40 text-white tracking-wider text-sm mx-auto rounded-lg hover:opacity-50 active:opacity-100 active:bg-white active:text-primary border active:border-primary">
                        Logout
                        </button>
                    </div>
                </section>
                <div className="lg:w-[100%]">
                    <section>
                        <div className="hidden mb-10  bg-white lg:block pt-1 rounded-lg ">
                        <div className="flex justify-start pt-3 tracking-wider max-w-lg">
                            <a
                            href="./profilpage.html"
                            className=" pb-6 lg:mx-6 lg:mr-10 text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                            >
                            Account Settings
                            </a>
                            <a
                            href="./orderhistory.html"
                            className=" border-b-4 border-primary hover:opacity-60 hover:bg-gray-50 active:opacity-20"
                            >
                            Order History
                            </a>
                        </div>
                        </div>
                    </section>
                    <section className="block mx-auto max-w-2xl lg:hidden">
                        <div className="block bg-white mx-3 p-6 rounded-t-lg ">
                        <p>INFO</p>
                        <div className="flex flex-col items-center mt-6 tracking-wider">
                            <img
                            className="mx-auto rounded-full h-36"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            />
                            <p className="font-medium text-lg mt-4 mb-2">{`${user.first_name} ${user.last_name}`}</p>
                            <p className="text-sm text-gray-600 ">Moviegoers</p>
                        </div>
                        </div>
                        <div className="block border-t mx-3 border-gray-300 bg-white py-6 rounded-b-lg">
                        <button className="block bg-primary h-11 w-40 text-white tracking-wider text-sm mx-auto rounded-lg">
                            Logout
                        </button>
                        </div>
                    </section>
                </div>

            </div>
        </div>
        <Footer />

        </>
    )
}

export default Order_history