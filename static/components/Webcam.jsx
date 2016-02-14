import React from 'react';
import Button from './Button.jsx';

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

	captureImage() {
		var canvas = document.querySelector('#photo-canvas');
		var video = document.querySelector('#webcam-area');
		var photo = document.querySelector('#photo');
		var context = canvas.getContext('2d');
		canvas.width = 640;
		canvas.height = 480;
		context.drawImage(video, 0, 0, 640, 480);
		var data = canvas.toDataURL('image/png');
		$.ajax({
			url: 'http://localhost:5000/punch/',
			dataType: 'json',
			data: {image: data},
			cache: false,
			success: (response) => {
				console.log(response);
			},
			error: (xhr, status, error) => {
				console.error("shit broke");
			}
		});
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
					<canvas hidden="true" id="photo-canvas" />
				</div>
				<Button clickCallback={this.captureImage.bind(this)} />
			</div>
		);
	}

};

export default Webcam;
