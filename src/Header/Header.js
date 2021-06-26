import React from 'react'
import SearchIcon from '@material-ui/icons/Search'

import {Link} from 'react-router-dom'

import './Header.css'

import ECSIcon from './../Icon/ECSIcon.png'
import { ShoppingBasket } from '@material-ui/icons'

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

function Header(){
    return[
        <nav className="header">
            <img className="header__logo" alt = "logo" src={ECSIcon}/>
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <Link to="/" className="header__link">
                <div className="header__option">
                    <span className="header__optionLineOne">Register</span>
                </div>
            </Link>
            {/*basket icon with number of items*/}
            <Link to="/checkout" className="header__link">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon/>
                    <span className="header__basketCount">2</span>
                </div>
            
            </Link>
        </nav>
    ]
}

export default Header;