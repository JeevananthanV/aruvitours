import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from '../common/SmoothScroll';

const Layout = ({ children }) => {
  return (
    <SmoothScroll>
      <div className="app-layout-wrapper">
        <Navbar />
        <main className="app-main-content">
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Layout;
