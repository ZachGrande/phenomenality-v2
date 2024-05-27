import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation.js';

function HomeLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
