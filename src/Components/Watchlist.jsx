import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';
import "./watchlist.css"
import { RemoveFromwatchlist } from '../Redux/Action';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const Watchlist = () => {
    let remove = useDispatch(null)
    let state = useSelector(state => state.Reducer)
    return (
        <div className='watch-cont'>
            {
                state.length > 0 ? <div className='wsub-cont container-fluid'>
                    <div className='wlist'>
                        <h4 className='text-center p-1 heading'>WATCH-LIST</h4>
                        {console.log(state)}
                        {

                            <div className='watchlist-items'>
                                {
                                    state.map((item) => {
                                        return <div className='solo-items' key={item.id}>
                                            <div className='wimage'>
                                                <img src={item.image.large} alt="" />
                                            </div>
                                            <div className='wdetail-cont'>
                                                <div className='witem-detail'>
                                                    <h2 className='text-white'>{item.id.toUpperCase()} <span> <sup> rank-{item.market_data.market_cap_rank}</sup></span></h2>
                                                    <h3 className='text-primary'> $ {item.market_data.current_price.usd}</h3>
                                                    {
                                                        item.market_data.price_change_percentage_24h > 0 ? <h4 className='text-secondary'>Price Change in 24h: <span className='text-success p-2'><FaAngleDoubleUp className='angle' />{item.market_data.price_change_percentage_24h} %</span></h4> : <h4 className='text-secondary'>Price Change in 24h: <span className='text-danger p-2'><FaAngleDoubleDown className='angle' />{item.market_data.price_change_percentage_24h} %</span></h4>
                                                    }
                                                </div>
                                                <div className='del'>
                                                    <button class="noselect" onClick={() => {
                                                        remove(RemoveFromwatchlist(item))
                                                        toast.error('REMOVED TO WATCHLIST', {
                                                            position: "top-center",
                                                            autoClose: 1000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "dark",
                                                        });
                                                    }}><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        }
                    </div>
                    <div className='buy'>
                        <h4 className='text-center p-1 text-white heading'>CHECK-OUT</h4>
                        <div>
                            <h6 className='p-3 text-secondary' >WATCH-LIST ITEMS : </h6>
                            {
                                state.map((item) => {
                                    return <div className='buy-cont' key={item.id}>
                                        <div className='buy-detail'>
                                            <img src={item.image.small} alt="" />
                                            <h5 className='text-white'>{item.id.toUpperCase()}</h5>
                                        </div>
                                        <div className='buy-price'>
                                            <h5 className='text-primary'> $ {item.market_data.current_price.usd}</h5>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className='container-fluid p-2 py-4 check-cont'>
                            <button className='checkout'>
                                <span>Continue</span>
                                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                    : <div><div className="animation">ADD SOMETHING</div></div>
            }
        </div>
    )
}
