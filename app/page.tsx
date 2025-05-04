'use client';
import React, { useEffect } from 'react'
import NavBar from './components/NavBar'
import LandingContent from './components/LandingContent'
import Footer from './components/Footer'

const Landing = () => {

  useEffect(() => {
    const token = localStorage.getItem('token')
    const expiry = Number(localStorage.getItem('expiry'))
    const current = Math.floor(Date.now() / 1000)

    if (token && expiry && expiry > current) {
      location.href = '/home';
    }
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <LandingContent></LandingContent>
      <Footer></Footer>
    </>
  )
}

export default Landing