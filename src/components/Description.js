import React from 'react';
import './Description.css';

const Description = ({ name, nameProbability, age, ageProbability }) => {
	return (
		<div id='description'>
			<p id='name'>{`Name: ${name}`}<br/>
				{`Probability: ${nameProbability}`}</p>
			<p id='age'>{`Age appearance: ${age}`}<br/>
				{`Probability: ${ageProbability}`}</p>
		</div>
	)
}

export default Description;