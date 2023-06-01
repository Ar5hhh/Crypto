import React from 'react'
import "./coin.css"
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Coindisplay = ({ id, name, symbol, price, percentage, image }) => {
    return (
        <motion.div className='coin-box' key={id} initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}>


            <div style={{ display: "flex", padding: "20px", width: "inherit", justifyContent: "center", gap: "10px" }}><h3>{name}</h3><sub className='text-warning'>{symbol}</sub></div>
            <img src={image} alt="" />
            <h6 className='text-primary'>$ {price}</h6>
            {
                percentage > 0 ? <div className='text-success per p-2'>< FaAngleDoubleUp className='angle' /><h5>{percentage}</h5></div> : <div className='text-danger per p-2'><FaAngleDoubleDown className='angle' /><h5>{percentage}</h5></div>
            }
        </motion.div >
    )
}

export default Coindisplay