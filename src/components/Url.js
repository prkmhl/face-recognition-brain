import React from 'react';
import './Url.css';

const Url = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className='Url'>
			<div>
				<input id='urlinput' type='search' placeholder='enter an image URL'
					onChange={onInputChange}/>
				<button onClick={onButtonSubmit}
				>Detect</button>
			</div>
		</div>
	)
}

export default Url;