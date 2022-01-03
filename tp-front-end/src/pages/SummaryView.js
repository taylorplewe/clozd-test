import React from 'react';
import PersonSummaryItem from '../components/PersonSummaryItem.js';
import {Outlet, Link} from 'react-router-dom';
import './SummaryView.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

class SummaryView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentChar: 'A'
		};
	}

	scrollToLetter(letter) {
		document.getElementById(letter).scrollIntoView();
	}

	letterClick(letter) {
		if (this.props.totalEmps < 500)
			this.scrollToLetter(letter);
		this.setState({
			currentChar: letter
		});
	}

	sortByLastName(emp1, emp2) {
		return emp1.name.last < emp2.name.last ? -1 : 1;
	}

	render() {
		return (
			<div>
				<h1>Employees</h1>
				<div className="alphList">
					{Object.keys(this.props.emps).sort().map((letter) => 
						<div className="button" onClick={() => {this.letterClick(letter)}}>{letter}</div>
					)}
				</div>
				{this.props.totalEmps < 500 ?
					// if total number of employees is under 500, display them all together.
					<div>
						{Object.keys(this.props.emps).sort().map((letter) =>
							<div>
								<h2 className="letter" id={letter}>{letter}</h2>
								<div className="summaryList">
									{this.props.emps[letter].sort((emp1, emp2) => {return emp1.name.last < emp2.name.last ? -1 : 1}).map((emp) =>
										<Link to={`/details?employee=${emp.login.salt}`}>
											<PersonSummaryItem
												key={emp.login.salt}
												name={emp.name}
												email={emp.email}
												location={emp.location}/>
										</Link>
									)}
								</div>
							</div>
						)}
					</div>
					: // otherwise, display only one letter page at a time.
					<div>
						<h2 className="letter" id={this.state.currentChar}>{this.state.currentChar}</h2>
						<div className="summaryList">
							{this.props.emps[this.state.currentChar].sort((emp1, emp2) => {return emp1.name.last < emp2.name.last ? -1 : 1}).map((emp) =>
								<Link to={`/details?employee=${emp.login.salt}`}><PersonSummaryItem
								key={emp.login.salt}
								name={emp.name}
								email={emp.email}
								location={emp.location}/></Link>
							)}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default SummaryView;