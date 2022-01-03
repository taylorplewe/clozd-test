import React from 'react';
import "./DetailsView.css";
import {Outlet, Link} from 'react-router-dom';

class SummaryView extends React.Component {
	id = "";
	emp = {};
	dob = "";
	addr = "";

	constructor(props) {
		super(props);

		// get employee from ID in URL
		this.id = window.location.href.split("?employee=")[1];
		console.log(this.props.emps);
		console.log(this.id);
		// organize employee info
		this.emp = this.props.emps[this.id];
		let dob = new Date(this.emp.dob.date);
		this.dob = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;
		this.addr = `${this.emp.location.street.number} ${this.emp.location.street.name}, ${this.emp.location.city}, ${this.emp.location.country}`;
	}

	render() {
		return (
			<div>
				<h1>{this.emp.name.first} {this.emp.name.last}</h1>
				<img src={this.emp.picture.large}/>
				<div className="detailsGrid">
					<p>Email</p>
					<p>{this.emp.email}</p>
					<p>Address</p>
					<p>{this.addr}</p>
					<p>Phone number</p>
					<p>{this.emp.phone}</p>
					<p>Date of birth</p>
					<p>{this.dob}</p>
				</div>
				<Link to="/"><div className="button">Back</div></Link>
			</div>
		);
	}
}

export default SummaryView;