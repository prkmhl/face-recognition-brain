import React from 'react';
import './Logo.css';
import logo from './Logo.png'

const Logo = () => {
	return (
		<div className='Logo'>
			<p>FaceRecoBrain</p><br/>
			<img src={logo} alt='brainImg' />
		</div>
	)
}

export default Logo;