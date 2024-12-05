import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import ProductDetails from './components/ProductDetails/ProductDetails'
import SavedVouchers from './pages/SavedVouchers/SavedVouchers'
import CustomerInfo from './pages/CustomerInfo/CustomerInfo'; 
import ChangePassword from './pages/ChangePassword/ChangePassword'
const App = () => {
   const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
     <Navbar setShowLogin={setShowLogin}/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Cart' element={<Cart/>} />
      <Route path='/order' element={<PlaceOrder/>} />
      <Route path='/Verify' element={<Verify/>} />
      <Route path='/myorders' element={<MyOrders/>} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path='/voucher-list-user' element={<SavedVouchers/>} />
      <Route path="/customerinfo" element={<CustomerInfo />}/>
      <Route path="/changepassword" element={<ChangePassword/>}/>
     </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App