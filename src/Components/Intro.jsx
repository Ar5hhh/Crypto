import React from 'react'
import { motion } from 'framer-motion'

const Intro = () => {
    return (
        <div className="wrap">
            <motion.h1 initial={{ opacity: 0, scale: 1.7, y: -200 }} transition={{ delay: 0.6, duration: 1 }} animate={{ opacity: 1, scale: 1.3, y: -50 }} >CRYPTO</motion.h1>
            <div className="intro">
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
            </div>
        </div>
    )
}

export default Intro