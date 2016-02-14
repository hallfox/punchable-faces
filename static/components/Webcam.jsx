import React from 'react';
import Button from './Button.jsx';

class Webcam extends React.Component {

	constructor() {
		super();
		this.state = {
			shouldFadeIn: true,
			punchability: null,
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
		var audio = new Audio("http://localhost:5000/static/Camera_Click.mp3");
		audio.play();
		canvas.addEventListener("transitionend", this.fadeIn.bind(this, canvas));
		canvas.classList.toggle("faded");
		this.setState({shouldFadeIn: true});
	}

	fadeIn(canvas) {
		if (!this.state.shouldFadeIn) {
			return;
		}
		canvas.classList.toggle("faded");
		this.setState({shouldFadeIn: false});
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
		$.ajax({
			url: 'http://localhost:5000/punch',
      method: 'POST',
			dataType: 'json',
			data: {image: data},
			cache: false,
			success: (response) => {
				console.log(response);
				alert(response.punchability);
				this.setState({punchability: response.punchability});
			},
			error: (xhr, status, error) => {
				console.log("Punchability fetch failed!");
				this.setState({animating: false});
				this.setState({punchability: null});
			}
		});
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
				<div className="row punchability">
					<div className="col-md-12 centering">
						{this.state.punchability}
					</div>
				</div>
			</div>
		);
	}

};

export default Webcam;
