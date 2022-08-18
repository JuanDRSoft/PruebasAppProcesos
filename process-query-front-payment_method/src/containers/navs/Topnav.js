/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale
} from 'redux/actions';

import {
  searchPath,
  isDarkSwitchActive,
  adminRoot
} from 'constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from 'components/svg';

/* import TopnavEasyAccess from './Topnav.EasyAccess'; */
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';

const TopNav = ({
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,

  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  authUser
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const handleLogout = () => {
    logoutUserAction(history);
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  const { currentUser } = authUser;

  const nameUser = currentUser?.title || '';

  return (
    <nav className='navbar fixed-top'>
      <div className='d-flex align-items-center navbar-left'>
        <NavLink
          to='#'
          location={{}}
          className='menu-button d-none d-md-block'
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to='#'
          location={{}}
          className='menu-button-mobile d-xs-block d-sm-block d-md-none'
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>
      </div>
      <NavLink className='navbar-logo' to={adminRoot}>
        <span className='logo d-none d-xs-block' />
        <span className='logo-mobile d-block d-xs-none' />
      </NavLink>

      <div className='navbar-right'>
        {isDarkSwitchActive && <TopnavDarkSwitch />}
        <div className='header-icons d-inline-block align-middle'>
          <TopnavNotifications />
        </div>
        <div className='user d-inline-block'>
          <UncontrolledDropdown className='dropdown-menu-right'>
            <DropdownToggle className='p-0' color='empty'>
              <span className='name mr-1'>{nameUser}</span>
            </DropdownToggle>
            <DropdownMenu className='mt-3' right>
              <DropdownItem
                onClick={() => {
                  window.location.href = '/app/blank-page';
                }}
              >
                Mi Cuenta
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings, authUser }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    authUser
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale
  })(TopNav)
);
