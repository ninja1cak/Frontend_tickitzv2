import React, {useEffect, useState} from "react";
import Header from "../../component/header";
import Footer from '../../component/footer'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../../store/reducer/user'
import { useSelector, useDispatch } from 'react-redux'
import useApi from "../../helper/useApi";
import Cards_order from "../../component/cardsOrder";
import loyalty from "../../assets/loyalty.png"


function Order_history() {
    const api = useApi();
    const [order, setOrder] = useState([]);
    const {isAuth, data} = useSelector((s) => s.users)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const fetchData = async () => {
        try {
            const response = await api.get(`/booking?page=1&limit=2`);
            const { data } = response.data;
            setOrder(data);
          } catch (error) {
            console.log(error);
          }
        };

    useEffect(() => {
        if (!isAuth) {
          navigate('/');
        }

        fetchData();
      }, []);
      

    const goLogout = () => {
        dispatch(logout())
        navigate('/login')
    }


    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full flex items-center justify-center py-5">
            <div className="flex flex-col lg:flex-row w-9/12">
                <section>
                    <div className="block mt-5 w-full bg-white rounded-lg lg:hidden">
                        <div className="flex justify-around pt-3 tracking-wider mx-auto max-w-lg">
                        <Link
                            to="/profile"
                            className="pb-6 text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20 text-xs md:text-sm"
                        >
                            Details Account
                        </Link>
                        <Link
                            to="/order_history"
                            className="border-b-4 border-primary hover:opacity-60 hover:bg-gray-50 active:opacity-20 text-xs md:text-sm"
                        >
                            Order History
                        </Link>
                        </div>
                    </div>

                </section>
                <section className="hidden w-[50%] lg:block mr-10 ">
                    <div className="block bg-white p-10 rounded-t-lg ">
                        <p className="text-sm">INFO</p>
                        <div className="flex flex-col items-center mt-6 tracking-wider">
                        <img
                            className="mask mask-circle rounded-full lg:w-[80%] lg:h-[80%]"
                            src={data.data[0].url_photo_user}
                        />
                        <p className="font-medium text-lg mt-4 mb-2">{data.data[0].first_name && data.data[0].last_name ? `${data.data[0].first_name} ${data.data[0].last_name}` : ''}</p>
                        <p className="text-sm text-gray-600 ">Moviegoers</p>
                        </div>
                    </div>
                    <div className="block border-t border-gray-300 bg-white py-6 rounded-b-lg">
                        <img src={loyalty} alt="loyalty" className="p-5 my-5" />
                        <button onClick={goLogout} className="block bg-primary h-11 w-40 text-white tracking-wider text-sm mx-auto rounded-lg hover:opacity-50 active:opacity-100 active:bg-white active:text-primary border active:border-primary">
                        Logout
                        </button>
                    </div>
                </section>
                <div className="lg:w-[100%]">
                    <section>
                        <div className="hidden mb-10  bg-white lg:block pt-1 rounded-lg ">
                            <div className="flex justify-start pt-3 tracking-wider max-w-lg">
                                <Link
                                to="/profile"
                                className="pb-6 lg:mx-6 lg:mr-10 text-gray-300 hover:opacity-60 hover:bg-gray-50 active:opacity-20 text-sm"
                                >
                                Account Settings
                                </Link>
                                <Link
                                to="order_history"
                                className=" border-b-4 border-primary hover:opacity-60 hover:bg-gray-50 active:opacity-20 text-sm"
                                >
                                Order History
                                </Link>
                            </div>
                        </div>
                        { order ? (
                            order.map((v) => {
                                return (
                                    <Cards_order
                                    title_movie={v.title_movie}
                                    image={v.cinema_logo_url}
                                    time={v.watch_time}
                                    seats={v.seats_booking}
                                    date={v.watch_date}
                                    total={v.totals_price_booking}   
                                    />
                                );
                            })
                            ) : (
                                <h1 className="text-center">Data not found</h1>
                        )}
                    </section>
                    <section className="lg:hidden w-full">
                        <div className="block bg-white p-6 rounded-t-lg ">
                        <p className="text-sm">INFO</p>
                        <div className="flex flex-col items-center mt-6 tracking-wider">
                            <img
                            className="mask mask-circle rounded-full w-[50%] h-[50%]"
                            src={data.data[0].url_photo_user}
                            />
                            <p className="font-medium text-lg mt-4 mb-2">{data.data[0].first_name && data.data[0].last_name ? `${data.data[0].first_name} ${data.data[0].last_name}` : ''}</p>
                            <p className="text-sm text-gray-600 ">Moviegoers</p>
                        </div>
                        </div>
                        <div className="block border-t border-gray-300 bg-white py-6 rounded-b-lg flex flex-col items-center justify-center">
                        <img src={loyalty} alt="loyalty" className="w-[80%] md:w-[40%] p-5 my-5 flex items-center justify-center"/>
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