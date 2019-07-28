import React from 'react';

class Register extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: ''
		}
	}
	
	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}

	onSubmitRegister = () => {
		fetch('https://desolate-brook-49357.herokuapp.com/register/', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			// 'Access-Control-Allow-Origin': 'http://localhost:3000'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		});
	}
	
	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											type="text"
											name="nameRegister"
											id="nameRegister"
											onChange={this.onNameChange}
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											type="email"
											name="email-address"
											id="email-address"
											autoComplete='username email'
											onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											type="password"
											name="password" 
											id="password"
											autoComplete='current-password'
											onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
										type="submit"
										value="Register"
										onClick={this.onSubmitRegister} />
						</div>
						<div className="lh-copy mt3">
							<p className="f6 link dim black db pointer"
								onClick={() => this.props.onRouteChange('signin')}>Sign in</p>
						</div>
					</div>
				</main>
			</article>
		)
	}
}

export default Register;