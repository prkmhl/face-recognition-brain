import React from 'react';
import './Url.css';

const Url = ({ onInputChange, onPhotoSubmit }) => {
	return (
		<div className='Url'>
			<div>
				<input id='urlinput' type='search' placeholder='enter an image URL'
					onChange={onInputChange}/>
				<button onClick={onPhotoSubmit}
				>Detect</button>
			</div>
		</div>
	)
}

export default Url;