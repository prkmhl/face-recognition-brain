import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Url from '../components/Url';
import Photo from '../components/Photo';
import Description from '../components/Description';
import Signin from '../components/Signin';
import Register from '../components/Register';

const app = new Clarifai.App({
 apiKey: 'e108712b85dd4d89afb81c64de341a71'
});

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 400
			}
		}
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: '',
			name: '',
				nameProbability: '',
			age: '',
				ageProbability: '',
			route: 'signin',
			isSignedIn: false,
		}
	}

	calculateFaceLocation = (clarifaiResponse) => {
		const clarifaiFace = clarifaiResponse.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height),
		}
	}

	displayFaceBox = (box) => {
		document.getElementById('bounding-box').style.display = 'flex';
		// document.getElementById('description').style.display = 'flex';
		this.setState({box: box}); // in ES6 could be only this.setState({box});
	}

	displayName = (clarifaiResponse) => {
		const clarifaiName = clarifaiResponse.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
		const clarifaiProbability = clarifaiResponse.outputs[0].data.regions[0].data.face.identity.concepts[0].value;
		this.setState({name: clarifaiName});
		this.setState({nameProbability: clarifaiProbability});
		if (clarifaiProbability > 0.2) {
			document.getElementById('name').style.display = 'flex';
		} else {
			document.getElementById('name').style.display = 'none';
		}
	}

	displayAge = (clarifaiResponse) => {
		const clarifaiAge = clarifaiResponse.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name;
		const clarifaiProbability = clarifaiResponse.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].value;
		this.setState({age: clarifaiAge});
		this.setState({ageProbability: clarifaiProbability});
		document.getElementById('age').style.display = 'flex';
	}

	onInputChange = (event) => {
		// console.log(event.target.value);
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		
		app.models
			.predict(
				'e466caa0619f444ab97497640cefc4dc',  // CELEBRITY_MODEL
				this.state.input) // !!! must be .input, not .imageUrl --> explanation Lesson 230
			.then(response => {
				this.displayFaceBox(this.calculateFaceLocation(response)) // this == App (in arrow function)
				this.displayName(response);
				console.log(response.outputs[0].data.regions[0].data.face.identity.concepts[0].name,
					response.outputs[0].data.regions[0].data.face.identity.concepts[0].value);
			})
			.catch(err => console.log(err));

			app.models
			.predict(
				'c0c0ac362b03416da06ab3fa36fb58e3',  // DEMOGRAPHICS_MODEL
				this.state.input) // !!! must be .input, not .imageUrl --> explanation Lesson 230
			.then(response => {
				this.displayAge(response);
				// console.log(response);
				console.log(response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name,
					response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].value);
			})
			.catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		route === 'home'
			? this.setState({isSignedIn: true})
			: this.setState({isSignedIn: false});
		this.setState({route: route});


		// route === 'home'
			// ? document.getElementById('Navigation').style.display = 'flex'
			// : document.getElementById('Navigation').style.display = 'none';

		// this.state.route === 'signin'             // this is not good solution, clicking on sign out on sign in page brings one to homepage
		// 	? this.setState({route: 'homepage'})
		// 	: this.setState({route: 'signin'});
	}

	render() {
		const { isSignedIn, imageUrl, route, box, name,
			nameProbability, age, ageProbability } = this.state;
	  return (
	    <div className="App">
	      <Particles className='particles'
	      	params={particlesOptions}
	      />
      	<div id='containerLogoSign'>
	      	<Logo />
	      	<Navigation isSignedIn={isSignedIn}
	      							onRouteChange={this.onRouteChange} />
	      </div>
	      { route === 'home'
	      	? <div>
				      <Title />
				      <Url
				      	onInputChange={this.onInputChange}
				      	onButtonSubmit={this.onButtonSubmit} />
				      <div id='containerPhotoDescr'>
				      	<Photo imageUrl={imageUrl} box={box} />
				      	<Description name={name}
				      							 nameProbability={nameProbability}
				      							 age={age}
				      							 ageProbability={ageProbability} />
				    	</div>
				    </div>
				  : (
				  	  route === 'signin'
				  		? <Signin onRouteChange={this.onRouteChange} />
				  		: <Register onRouteChange={this.onRouteChange} />
				  	)
	      }
	    </div>
	  );
	}
}

export default App;
