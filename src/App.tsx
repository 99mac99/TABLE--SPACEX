import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class App extends Component {
	render() {
		return (
			<div className = 'mainContainer'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Ulubiony</th>
							<th>Data</th>
							<th>Nazwa misji</th>
							<th>Opis</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<td>3</td>
							<td colSpan={2}>Larry the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

export default App;
