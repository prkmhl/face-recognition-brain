import React from 'react';
import './Photo.css';

const Photo = ({ imageUrl, box }) => {
	// let src ='https://upload.wikimedia.org/wikipedia/commons/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg'
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