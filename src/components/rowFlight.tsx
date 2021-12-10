import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type MyComponents = {
	Name: React.ReactNode;
	Date: React.ReactNode;
	Description: React.ReactNode;
	Favourite: React.ReactNode;
};

class RowFlight extends React.Component<{}, MyComponents> {
	constructor(props: MyComponents) {
		super(props);
	}

	render() {
		return (
			<>

			</>
		);
	}
}

export default RowFlight;
