// possible improvements:
// - input validation
// - more boxes on photo
// - profile pages
// - ranking

import React from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import Rank from '../components/Rank';
import Url from '../components/Url';
import Photo from '../components/Photo';
import Description from '../components/Description';
import Signin from '../components/Signin';
import Register from '../components/Register';

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

const initialState = {
	input: '',
	imageUrl: '',
	box: '',
	photoName: '',
		nameProbability: '',
	age: '',
		ageProbability: '',
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.state = initialState;
		console.log(this.state);
	}
	// componentDidMount() {               //not needed any more, only to check if fetching works
	// 	fetch('http://localhost:3001/')
	// 	.then(response => response.json())
	// 	.then(console.log)  //shorthand for .then(data => console.log(data));
	// }

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
		console.log(this.state);
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
		const clarifaiName = clarifaiResponse.outputs[0].data.regions[0].data.concepts[0].name;
		const clarifaiProbability = clarifaiResponse.outputs[0].data.regions[0].data.concepts[0].value;
		this.setState({photoName: clarifaiName});
		this.setState({nameProbability: clarifaiProbability});
		if (clarifaiProbability > 0.2) {
			document.getElementById('name').style.display = 'flex';
		} else {
			document.getElementById('name').style.display = 'none';
		}
	}

	displayAge = (clarifaiResponse) => {
		const clarifaiAge = clarifaiResponse.outputs[0].data.regions[0].data.concepts[0].name;
		const clarifaiProbability = clarifaiResponse.outputs[0].data.regions[0].data.concepts[0].value;
		this.setState({age: clarifaiAge});
		this.setState({ageProbability: clarifaiProbability});
		document.getElementById('age').style.display = 'flex';
	}

	onInputChange = (event) => {
		// console.log(event.target.value);
		this.setState({input: event.target.value});
	}

	onPhotoSubmit = () => {
		this.setState({imageUrl: this.state.input});
		
		fetch('https://desolate-brook-49357.herokuapp.com/imageAPIcelebrity/', {    // CELEBRITY_MODEL
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})  // => server =>
			.then(clarifaiResponse => clarifaiResponse.json())   // !! when with curly brackets --> must be   RETURN clarifaiRes....
			.then(response => {
				if (response) {
					console.log(response);
					this.displayFaceBox(this.calculateFaceLocation(response)) // this == App (in arrow function)
					this.displayName(response);
					console.log(response.outputs[0].data.regions[0].data.concepts[0].name,
						response.outputs[0].data.regions[0].data.concepts[0].value);
					}
				})
			.catch(err => console.log(err))

		fetch('https://desolate-brook-49357.herokuapp.com/imageAPIdemographics/', {   // DEMOGRAPHICS MODEL
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})  // => server =>
			.then(clarifaiResponse => clarifaiResponse.json())   // !! when with curly brackets --> must be   RETURN clarifaiRes....
			.then(response => {
				if (response) {
					this.displayAge(response);
					// console.log(response);
					console.log(response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name,
						response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].value);
				}
			})
			.catch(err => console.log(err));
			
		fetch('https://desolate-brook-49357.herokuapp.com/imageCount/', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: this.state.user.id
			})
		})  // => server =>
			.then(response => response.json())
			.then(count => {
				this.setState(prevState => ({   //Solution from Andrei not good: this.setState(Object.assign(this.state.user, { entries: count }));  this messes up state, properties of user go step up to main object.
										// explanation: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
										//							https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
					...prevState,
					user: {
						...prevState.user,
						entries: count
					}
				}))
			})
			.catch(console.log)
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({route: route})
		console.log(this.state);
	}
				
		// route === 'home'
			// ? document.getElementById('Navigation').style.display = 'flex'
			// : document.getElementById('Navigation').style.display = 'none';

		// this.state.route === 'signin'             // this is not good solution, clicking on sign out on sign in page brings one to homepage
		// 	? this.setState({route: 'homepage'})
		// 	: this.setState({route: 'signin'});

	render() {
		const { isSignedIn, imageUrl, route, box, photoName,
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
							<Rank name={this.state.user.name}
										entries={this.state.user.entries} />
				      <Url
				      	onInputChange={this.onInputChange}
				      	onPhotoSubmit={this.onPhotoSubmit} />
				      <div id='containerPhotoDescr'>
				      	<Photo imageUrl={imageUrl} box={box} />
				      	<Description photoName={photoName}
				      							 nameProbability={nameProbability}
				      							 age={age}
				      							 ageProbability={ageProbability} />
				    	</div>
				    </div>
				  : (
				  	  route === 'register'
							? <Register onRouteChange={this.onRouteChange}
							loadUser={this.loadUser}
							/>
				  		: <Signin onRouteChange={this.onRouteChange}
												loadUser={this.loadUser}
								/>
				  	)
	      }
	    </div>
	  );
	}
}

export default App;
