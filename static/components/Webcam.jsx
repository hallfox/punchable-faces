import React from 'react';
import Button from './Button.jsx';

class Webcam extends React.Component {

	constructor() {
		super();
		this.state = {
			isPunchable: null,
			animating: false
		};
	}

	displayVideo(stream) {
		this.src = window.URL.createObjectURL(stream);
	}

	videoError() {
		console.log("Failed to create webcam stream");
	}

	fadeOut(canvas) {
		var audio = new Audio("/audio/Camera_Click.mp3");
		audio.play();
		canvas.addEventListener("transitionend", this.fadeIn.bind(this, canvas));
		canvas.classList.toggle("faded");
	}

	fadeIn(canvas) {
		if (!this.state.animating) {
			return;
		}
		canvas.classList.toggle("faded");
		this.setState({animating: false});
	}

	captureImage(event) {
		event.preventDefault();
		this.setState({isPunchable: false});
		var canvas = document.querySelector('#photo-canvas');
		var video = document.querySelector('#webcam-area');
		var context = canvas.getContext('2d');
		canvas.width = 640;
		canvas.height = 480;
		context.drawImage(video, 0, 0, 640, 480);
		var data = canvas.toDataURL('image/png');
		/*
		$.ajax({
			url: 'http://localhost:5000/punch',
			dataType: 'json',
			data: {image: data},
			cache: false,
			success: (response) => {
				console.log(response);
				this.setState({
					isPunchable: response.Punchability,
					animating: false
				});
			},
			error: (xhr, status, error) => {
				console.log("Punchability fetch failed!");
				this.setState({animating: false});
			}
		});
		*/
	 	this.setState({animating: true});
	 	setTimeout(this.fadeOut.bind(this, canvas), 1);
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
				{video: { width: 640, height: 480 }},
				this.displayVideo.bind(player),
				this.videoError
			);
		}
	}

	render() {
		return(
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<video
						hidden={this.state.animating}
						id="webcam-area" 
						autoPlay="false" />
					<div
						className="canvas-container"
						hidden={!this.state.animating} >
						<canvas 
							id="photo-canvas" />
					</div>
				</div>
				<Button clickCallback={this.captureImage.bind(this)} />
			</div>
		);
	}

};

export default Webcam;
