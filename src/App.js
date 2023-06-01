import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Coins from './Components/Coins';
import { Route, Routes } from 'react-router-dom';
import Coin from './Routes/Coin';
import Footer from './Components/Footer';
import Intro from './Components/Intro';
import Store from './Redux/Store';
import { Provider } from 'react-redux';
import { Watchlist } from './Components/Watchlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  let [data, setdata] = useState([])

  useEffect(() => {
    setTimeout(() => {
      if (data.length === 0) fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false")
        .then(res => res.json())
        .then(res => {
          setdata(res)
          console.log(res)
        })
        .catch(err => console.log(err))
    }, 1000);
  }, [data.length])

  return (
    data.length > 0 ? <div className="App" >
      <Provider store={Store}>
        <Navbar />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
        <Routes>
          <Route path='/' element={<>
            {/* <Coins data={data.slice(0, 5)} /> */}
            {/* <Coins data={data.slice(5)} /> */}
            <Coins data={data} />
          </>} />
          <Route path='/coins' element={<Coin />}>
            <Route path=':coinId' element={<Coin />} />
          </Route>

          <Route path='/watchlist' element={<Watchlist />}>
          </Route>
        </Routes>
        <Footer />
      </Provider>
    </div> : <Intro />
  );
}

export default App;
