import React from 'react';

class Webcam extends React.Component {

	constructor() {
		super();
	}

	displayVideo(stream) {
		this.src = window.URL.createObjectURL(stream);
	}

	videoError() {
		console.log("Failed to create webcam stream");
	}

	componentDidMount() {
		var player = document.querySelector('#webcam-area');
		navigator.getUserMedia = navigator.getUserMedia 
			|| navigator.webkitGetUserMedia 
			|| navigator.mozGetUserMedia
			|| navigator.msGetUserMedia
			|| navigator.oGetUserMedia;
		
		if (navigator.getUserMedia) {
			navigator.getUserMedia(
				{video: true},
				this.displayVideo.bind(player),
				this.videoError
			);
		}
	}

	render() {
		return(
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<video id="webcam-area" autoPlay="false" />
				</div>
			</div>
		);
	}

};

export default Webcam;
