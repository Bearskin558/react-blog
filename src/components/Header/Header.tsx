import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';

import { logout, selectIsAuthentificated } from '../../features/user/UserSlice';
import { useAppDispatch } from '../../app/hooks';
import { CiLogout } from 'react-icons/ci';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAuthentificated = useSelector(selectIsAuthentificated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('auth');
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/">
          <p className="font-bold text-inherit">Network Social</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === 'light' ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthentificated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout />
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
