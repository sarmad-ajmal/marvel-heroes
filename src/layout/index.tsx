import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.scss'
const Layout = (props: any) => {


  return (<>
    <header className='nav' id='nav'>
      <Link to='/'>
        <img src='/images/png/logo.png' alt='logo' />
      </Link>
    </header>
    <Outlet />
  </>
  )
}

export default Layout
