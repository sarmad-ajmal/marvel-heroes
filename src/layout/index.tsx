import * as React from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss'
const Layout = (props: any) => {


  return (<>
    <header className='nav' id='nav'>
      <img src='/images/png/logo.png' alt='logo'/>
    </header>
    <Outlet />
  </>
  )
}

export default Layout
