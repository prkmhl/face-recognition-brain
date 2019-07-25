import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
  	return ( 
      <div className='Navigation'>
        <p onClick={() => onRouteChange('signout')}> Sign out </p>
      </div>
  	);
  } else {
   	return (
      <div className='Navigation'>
        <p onClick={() => onRouteChange('signin')}> Sign in </p>
        <p onClick={() => onRouteChange('register')}> Register </p>
      </div>   		
   	);
  }
}

export default Navigation;