import React from 'react';
import './Photo.css';

const Photo = ({ imageUrl, box }) => {
	return (
		<div className='Photo'>
			<div className='container'>
				<img id='inputImage' src={imageUrl} alt='' width='350px' height='auto'/>
				<div id='bounding-box' style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}></div>
			</div>
		</div>
	)
}

export default Photo;