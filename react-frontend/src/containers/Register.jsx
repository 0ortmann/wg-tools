import React, { Component } from 'react';
import { connect } from 'react-redux'

import RegisterForm from '../components/login/RegisterForm.jsx';

import './LoginRegister.scss';

import { register } from '../actions/LoginRegisterActionCreators.jsx';


export class Register extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		const { register, registerError } = this.props;

		let error = registerError? 'conflict' : undefined;
		return (
			<div className='register'>
				<RegisterForm error={error} registerCallback={register} />
			</div>
		);
	}
}

Register.propTypes = {
	registerError: React.PropTypes.bool.isRequired,
	register: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return { 
		registerError: state.session.registerError
	};
}


export default connect(mapStateToProps, { register } )(Register)