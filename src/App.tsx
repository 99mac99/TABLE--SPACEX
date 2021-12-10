import React, { Component } from 'react';
import  {Col, Row, Table}  from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import RowFlight from './components/rowFlight';
import './index.css';
import { gql, useQuery } from '@apollo/client';
import SpaceRow from './components/spaceRow';
import { string } from 'prop-types';

const GET_MISSION = gql`
{
	missions {
	  description
	}
	launches {
	  launch_date_utc
	  mission_name
	}
  }
`

 const App =(prop: { launch_date_utc: number; mission_name: string; description: string; }) => {

	const { data, loading, error } = useQuery(GET_MISSION);
	if (error)
		return <h1>error</h1>;


	return (
		<div className='mainContainer'>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th className='rowHead'>Nazwa misji</th>
						<th className='rowHead'>Data</th>
						<th className='rowHead'>Opis</th>
						<th className='rowHead'>Ulubiony</th>
					</tr>
				</thead>
				<tbody>

					{loading ? (
						<p>loading...</p>
					) : (
						data.characters.results.map(({launch_date_utc, mission_name, description  }) => (
							<SpaceRow
								date={prop.launch_date_utc}
								name={prop.mission_name}
								description={prop.description} />
						))
					)}

				</tbody>
			</Table>
		</div>
	);

}


export default App;
