import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SummaryView from './pages/SummaryView.js';
import DetailsView from './pages/DetailsView.js';

class App extends React.Component {
	errorMessage = 
	"Error ocurred while fetching user data.\n\nThe server might not be running, or you might be sending too many requests to the RandomUser.me API.";

	constructor() {
		super();
		this.state = {
			loading: true,
			waitText: "Fetching employee data...",
			alphEmps: {}, // organized by first letter of last name
			idEmps: {}, // key = id
			totalEmps: 0
		}
		this.getEmployees()
			.then(res => {
				this.setState({
					loading: true,
					waitText: "Organizing employee data..."
				});
				this.organizeEmployees(res);
			})
			.catch(res => {
				this.setState({
					loading: true,
					waitText: this.errorMessage
				})
			});
		
	}

	async getEmployees() {
		let res = await fetch("/api/getEmployees");
		return res.json();
	}

	organizeEmployees(emps) {
		let alphEmps = {};
		let idEmps = {};

		emps.forEach(emp => {
			// add it to the alphabetized list
			if (!alphEmps[emp.name.last[0]])
				alphEmps[emp.name.last[0]] = [];
			alphEmps[emp.name.last[0]].push(emp);

			// as well as the id'd one
			idEmps[emp.login.salt] = emp;
		});

		this.setState({
			loading: false,
			waitText: "",
			alphEmps: alphEmps,
			idEmps: idEmps,
			totalEmps: Object.keys(idEmps).length
		})
	}

	render() {
		return (
			<div className="main">
				{this.state.loading &&
					<div>
						<h2>{this.state.waitText}</h2>
					</div>
				}
				{!this.state.loading &&
					<BrowserRouter>
						<Routes>
							<Route index element={
								<SummaryView
									emps={this.state.alphEmps}
									totalEmps={this.state.totalEmps}/>
							}/>
							<Route path="details" element={
								<DetailsView
									emps={this.state.idEmps}/>
							}/>
						</Routes>
					</BrowserRouter>
				}
			</div>
		);
	}
}

export default App;
