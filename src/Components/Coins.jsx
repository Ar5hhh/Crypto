import React, { useEffect, useState } from 'react'
import "./coin.css"
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Coindisplay from './Coindisplay';
import Loading from './Loading';
import Coin from '../Routes/Coin';
import { AiOutlineToTop } from 'react-icons/ai';




const Coins = ({ data }) => {
    let [search, setsearch] = useState("")
    const [isPresent, setIsPresent] = useState(true);
    useEffect(() => {
        if (search)
            setIsPresent(data.filter(coins => coins.name.toLowerCase().includes(search.toLowerCase())).length !== 0);
        else setIsPresent(true);
    }, [search, data]);
    return (
        // <div>{JSON.stringify(data)}</div>
        data ? <div className='main-container'>
            <form className='search' onSubmit={(e) => {
                e.preventDefault()
            }}>
                <div>
                    <input type="text" placeholder='Search' value={search} onChange={({ target: { value } }) => {
                        setsearch(value)
                    }} />
                    <button type="submit" className="butt" onClick={() => {
                        setsearch("")
                    }}> <BsFillTrashFill /> </button>
                </div>
            </form>
            <button className='bu' onClick={() => {
                window.scrollTo(0, 0)
            }}><AiOutlineToTop className='angle' /></button>
            <div className='coin-container'>
                {
                    isPresent ? data.map((coins) => {
                        if (coins.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <Link to={`/coins/${coins.id}`} element={<Coin />} key={coins.id} style={{ textDecoration: 'none' }}>
                                    <Coindisplay id={coins.id} name={coins.name} symbol={coins.symbol} image={coins.image} price={coins.current_price} percentage={coins.price_change_percentage_24h} />
                                </Link>

                            )
                        }
                        else return null
                    }) : <h1>No data</h1>
                }
            </div>
        </div> : <Loading />
    )
}

export default Coins