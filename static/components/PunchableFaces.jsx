import React from 'react';
import Webcam from './Webcam.jsx';

class PunchableFaces extends React.Component {

	checkPunchability(event) {
		console.log("Checking punchability");
	}

	captureImage(image) {

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
			</div>
		);
	}

};

export default PunchableFaces;
