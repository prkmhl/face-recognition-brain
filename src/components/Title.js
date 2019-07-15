import React from 'react';
import './Title.css';

const Title = () => {
	let user = 'Marcy';
	let rank = 3;
	return (
		<div className='Title'>
			<p>Hello {`${user}, you are ranked `}
				<span className='f1 '>{`#${rank}`}</span>
				<br/>based on your activity on this site</p>
			<p>This Magic Brain will recognize faces in your pictures. Give it a try!</p>
		</div>
	)
}

export default Title;