import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CheckoutPage from './pages/Checkout/Checkout'
import LandingPage from './pages/LandingPage/LandingPage'
import Dashboard from './pages/Dashboard/Dashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import OrderConf from './pages/OrderConf/OrderConf'
import SignupPage from './pages/SignupPage/SignupPage'

class AppRouter extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Routes>
            <Route path = "/" element = {<LandingPage />} exact = {true} />
            <Route path = "/checkout" element = {<CheckoutPage />} />
            <Route path = "/dashboard" element = {<Dashboard />} />
            <Route path = "/login" element = {<LoginPage />} />
            <Route path = "/orderconf" element = {<OrderConf />} />
            <Route path = "/signup" element = {<SignupPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter
