import React from 'react'
import { Redirect } from 'react-router-dom'

const LoginPage = ({ isLoggedIn, onLogin }) => {

	if (isLoggedIn) {
		return <Redirect to="/" />
	}
	
	return (
		<div className="jumbotron text-center">
			<h2>Login to see Secret Page: </h2>
			<button 
				className="btn btn-primary"
				onClick={onLogin}
			>
				Login
			</button>
		</div>
	)
}

export default LoginPage
