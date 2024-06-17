import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import NavBar from '../Navbar';
import {
  selectIsAuthentificated,
  selectUser,
} from '../../features/user/UserSlice';
import Profile from '../Profile';
import Header from '../Header';
import Container from '../Container';

const Layout = () => {
  const isAuthentificated = useSelector(selectIsAuthentificated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentificated) {
      navigate('/auth');
    }
  }, []);
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  );
};

export default Layout;
