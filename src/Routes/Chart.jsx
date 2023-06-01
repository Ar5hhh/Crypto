
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


const Chart = ({ id }) => {
    let [response, setresponse] = useState()

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
            .then(res => res.json())
            .then(res => {
                setresponse(res)
                // console.log(res)
            })
            .catch(err => console.log(err))


    }, [id])

    if (!response) {
        return (
            <motion.div className="px-4" transition={{ delay: 0.6 }}>LOADING...</motion.div>
        )
    }
    const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

    const options = {
        responsive: true
    }
    const data = {
        labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
        datasets: [
            {
                fill: true,
                label: id,
                data: coinChartData.map(val => val.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'black',

            }
        ]
    }

    return (
        <div className='container p-3'>
            <Line options={options} data={data} />
        </div>
    )
}

export default Chart