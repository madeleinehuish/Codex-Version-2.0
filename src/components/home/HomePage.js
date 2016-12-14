import React from 'react';
import { link } from 'react-router';

class HomePage extends React.component {
	render() {
		return (
			<div className="jumbotron">
				<h1>Pluralsight Administration</h1>
				<p>React, redux, and react router....</p>
				<Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
			</div>
		);
	}
}

export default HomePage;
