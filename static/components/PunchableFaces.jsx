import React from 'react';
import Webcam from './Webcam.jsx';
import Button from './Button.jsx';

class PunchableFaces extends React.Component {

	checkPunchability(event) {
		console.log("Checking punchability");
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12 centering">
						<h1>Is My Face Punchable?</h1>
					</div>
				</div>
				<Webcam />
				<Button clickCallback={this.checkPunchability.bind(this)} />
			</div>
		);
	}

};

export default PunchableFaces;
