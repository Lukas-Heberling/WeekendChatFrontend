import React from 'react';
import { Outlet } from 'react-router-dom';

const styles = {
  mainDiv: {
    height: '100vh',
    width: '100%',
    display: 'flex', 
    justifyContent: 'center',
  }
}

const Layout = () => (
  <div style={styles.mainDiv}>
    <Outlet />
  </div>
);

export default Layout;