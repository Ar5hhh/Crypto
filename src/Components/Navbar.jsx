import React from 'react'
import { FaMoneyCheckAlt } from 'react-icons/fa';
import image from "../Assests/bino.jpg";
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='container-fluid bg-black text-light p-2  px-4 text-center nav'>
            <Link to="/"><h3><FaMoneyCheckAlt /></h3></Link>
            <Link to="/watchlist"><img src={image} alt="" className='bino' /></Link>
        </div>
    )
}

export default Navbar