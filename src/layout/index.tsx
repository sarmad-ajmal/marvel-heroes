import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ToggleDarkTheme from '../common/components/toggle';
import './index.scss'
const Layout = (props: any) => {


  return (<>
    <header className='nav' id='nav'>
      <Link to='/'>
        <img src='/images/png/logo.png' alt='logo' />
      </Link>
      <ToggleDarkTheme />
    </header>
    <Outlet />
  </>
  )
}

export default Layout
