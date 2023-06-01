import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./style.css"
import Loading from "../Components/Loading"
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Chart from './Chart';
import { AddToWatchlist } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Coin = () => {
    const desc = useRef(null)
    const cap = useRef(null)
    let [coin, setcoin] = useState()
    let { coinId } = useParams()
    const navigate = useNavigate()
    const cartList = useSelector((state) => state.Reducer)
    let dispatch = useDispatch(null)
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
            .then(res => res.json())
            .then(res => {
                setcoin(res)
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [coinId])
    useEffect(() => {

        if (coin?.description?.en && desc?.current) {
            desc.current.innerHTML = coin?.description?.en ? coin.description.en.replaceAll('href', "target='_blank' href") : "";
        }
    }, [coin])

    return (
        coin ? <div className='coin-cont'>
            <button className='back' onClick={() => {
                navigate("/")
            }}><IoReturnUpBackSharp className='angle' /></button>
            <div className='box-coin'>
                <motion.h1 className='text-center p-3 text-white' animate={{ x: 100, opacity: 1, scale: 1.1 }}
                    transition={{ delay: 0.1 }} >{coin.name.toUpperCase()}</motion.h1>
                <div className='info'>
                    <div className='money'>
                        <motion.h2 animate={{ x: 100, opacity: 1 }}
                            transition={{ delay: 0.2 }} className='text-secondary'>Market Rank: <span className='text-white' style={{ fontSize: "40px" }}>{coin.market_data.market_cap_rank}</span></motion.h2>
                        <motion.h4 animate={{ x: 100, opacity: 1 }}
                            transition={{ delay: 0.3 }} className='text-secondary'>Symbol: <span className='text-warning'>{coin.symbol}</span></motion.h4>
                        <motion.h4 animate={{ x: 100, opacity: 1 }}
                            transition={{ delay: 0.4 }} className='text-secondary'>Price: <span className='text-primary'>$ {coin.market_data.current_price.usd}</span></motion.h4>
                        {
                            coin.market_data.price_change_percentage_24h > 0 ? <h4 className='text-secondary'>Price Change in 24h: <span className='text-success p-2'><FaAngleDoubleUp className='angle' />{coin.market_data.price_change_percentage_24h} %</span></h4> : <h4 className='text-secondary'>Price Change in 24h: <span className='text-danger p-2'><FaAngleDoubleDown className='angle' />{coin.market_data.price_change_percentage_24h} %</span></h4>
                        }

                    </div>
                    <motion.div initial={{ opacity: 0, scale: 1.4 }} transition={{ delay: 0.5, duration: .6 }} animate={{ opacity: 1, scale: 1 }} className='image'>
                        <img src={coin.image.large} alt="" />
                    </motion.div>
                </div>
                <div className='cap'>
                    <motion.h4 initial={{ opacity: 0, x: -200 }} transition={{ delay: 0.6, duration: .3 }} animate={{ opacity: 1, x: 0 }} className='text-secondary' >Market Cap</motion.h4>
                    <motion.h5 initial={{ opacity: 0, scale: 1.7 }} transition={{ delay: 0.6, duration: 1 }} animate={{ opacity: 1, scale: 1.3 }} className='text-success scale' ref={cap} >$ {coin.market_data.market_cap.usd}</motion.h5>
                </div>

                <div className='container text-center p-3 butt-cont'>
                    <motion.button initial={{ opacity: 0 }} transition={{ delay: 0.7 }} animate={{ opacity: 1, scale: 1.2 }} className='button' onClick={() => {
                        if (cartList.find(cartcoin => cartcoin.id === coin.id)) {
                            toast.warning('ALREADY IN  WATCHLIST', {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                            return;
                        }
                        dispatch(AddToWatchlist(coin))
                        toast.success('ADDED TO WATCHLIST', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }}><span class="button__text">WATCHLIST</span>
                        <span class="button__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart svg"
                                viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg></span></motion.button>
                </div>

                <div>
                    <motion.h5 initial={{ opacity: 0, x: -100 }} transition={{ delay: 0.7 }} animate={{ opacity: 1, x: 0 }} className=' text-secondary p-3 px-5 text-end'>PAST 7 DAYS</motion.h5>
                    <Chart id={coinId} />
                </div>

                <div className='about p-3'>
                    <motion.h4 initial={{ opacity: 0 }} transition={{ delay: 0.7 }} animate={{ opacity: 1 }} className='text-white px-3'>About {coin.name}</motion.h4>
                    {
                        coin.description.en.split("").length > 5 ? <motion.p initial={{ opacity: 0 }} transition={{ delay: 0.8 }} animate={{ opacity: 1 }} className='text-secondary p-3' ref={desc}></motion.p> : <p>We apologize for the inconvenience, but we are currently unable to retrieve the information you requested. Our team is working diligently to find a solution and obtain the information you need as soon as possible. In the meantime, we would like to offer our assistance in any way we can. If you could provide us with more details about your inquiry, we may be able to offer alternative resources or suggestions that could help you. We appreciate your patience and understanding as we work to resolve the issue. Please let us know if there is anything else we can do to assist you. Rest assured that we are doing everything we can to resolve the issue and obtain the information you need. Thank you for bringing this matter to our attention.</p>
                    }
                </div>


            </div>
        </div> : <Loading />

    )
}

export default Coin