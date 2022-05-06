import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  
  const location = useLocation()
  
  return (
    <>
      <footer>Ryan Murphy, Copyright &copy; 2022 </footer>
      {location.pathname === '/game-of-life' && <Link to='/How-To-Play'><span>What is this?</span></Link>}
    </>
  )
}

export default Footer