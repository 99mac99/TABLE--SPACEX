import React, { Component } from 'react';
import  {Table}  from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
	render() {
		return (
			<div className='mainContainer'>
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Nazwa misji</th>
							<th>Data</th>
							<th>Opis</th>
							<th>Ulubiony</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

export default App;
