import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { authActions } from '../../state/ducks/auth';

import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import DomainIcon from 'mdi-react/DomainIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import HospitalIcon from 'mdi-react/HospitalIcon';
import LogoutVariantIcon from 'mdi-react/LogoutVariantIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import { Container } from '../kits';

const MenuContainer = styled(Container)`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.lighter};
  z-index: 50;

  .mobile-header {
    background-color: ${({ theme }) => theme.colors.primary};
    height: 60px;
    line-height; 60px;
    padding: 0 24px;
    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: space-between;

    a {
      color: white;
    }

    .menu-button {
      color: white;
      border: 1px solid white;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    height: calc(100vh - 60px);
    list-style: none;
    position: relative;
    background: white;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'block' : 'none')};
  }
`;

const MenuItem = styled.li`
  a {
    text-decoration: none;
    display: flex;
    height: 60px;
    line-height: 60px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
    border-bottom: ${({ theme }) => theme.borders.primary};
    color: ${({ theme }) => theme.colors.primary};

    &:active,
    &:focus {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  a,
  span {
    .menu-mdi {
      margin-top: 16px;
      margin-right: 8px;
    }
  }

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      a {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.lighter};
      }
    `};
  ${({ variant }) =>
    variant === 'bottom-item' &&
    css`
      position: absolute;
      bottom: 0;
      width: 100%;

      span {
        cursor: pointer;
        display: flex;
        height: 60px;
        line-height: 60px;
        padding: 0 24px;
        font-size: ${({ theme }) => theme.typography.caption.fontSize};
        color: ${({ theme }) => theme.colors.primary};
        border-top: ${({ theme }) => theme.borders.primary};
      }
    `};
`;

const MobileMenu = ({ logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MenuContainer
      display={['block', 'none', 'none', 'none']}
      isMenuOpen={isMenuOpen}
    >
      <div className="mobile-header">
        <NavLink to="/">BRF Database</NavLink>
        <span
          className="menu-button"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          &#9776;
        </span>
      </div>
      <ul>
        <MenuItem>
          <NavLink to="/feeds">
            <HomeIcon className="menu-mdi" /> Home
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/search">
            <MagnifyIcon className="menu-mdi" /> Search
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/add-user">
            <AccountPlusIcon className="menu-mdi" /> Add User
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/blood-requests">
            <HospitalIcon className="menu-mdi" /> Blood Requests
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/communities">
            <DomainIcon className="menu-mdi" /> Communities
          </NavLink>
        </MenuItem>
        <MenuItem variant="bottom-item" onClick={logout}>
          <span>
            <LogoutVariantIcon className="menu-mdi" />
            Logout
          </span>
        </MenuItem>
      </ul>
    </MenuContainer>
  );
};

const mapActionsToProps = {
  logout: authActions.logout,
};

export default connect(null, mapActionsToProps)(MobileMenu);
