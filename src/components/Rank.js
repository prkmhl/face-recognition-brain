import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
	return (
		<div className='Rank'>
			<p>Hello <span className='f2 red'>{`${name}`}</span>, you've recognized so far <span className='f2 red'>{`${entries}`}</span> faces.<br />
					Thank you for using our app. Have fun!</p>
			<p>This Magic Brain will recognize faces in your pictures. Give it a try!</p>
		</div>
	)
}

export default Rank;