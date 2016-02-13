import React from 'react';

class Button extends React.Component {

	render() {
		return (
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<button
						type="button"
						className="btn btn-primary is-it-button"
						onClick={this.props.clickCallback} >
						Well... is it?
					</button>
				</div>
			</div>
		);
	}

};

export default Button;
