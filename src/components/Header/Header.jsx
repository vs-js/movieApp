import React from 'react';
import heroImg from '../../assets/images/hero.png';

function Header() {
  return (
    <div className='wrapper'>
        <header>
          <img src= {heroImg} alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span>You'll Enjoy Without the Hassle</h1>
        </header>
    </div>
  )
}

export default Header