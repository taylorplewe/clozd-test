import React from 'react';
import "./PersonSummaryItem.css";

class PersonSummaryItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="summaryMain button" onClick={this.props.onClick}>
				<h2>{this.props.name.last}, {this.props.name.first}</h2>
				<p>{this.props.email}</p>
				<p>{this.props.location.city}, {this.props.location.country}</p>
			</div>
		);
	}
}

export default PersonSummaryItem;