import React, { ButtonHTMLAttributes, Component } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RowFlight from './components/rowFlight';
import './index.css';
import { gql, useQuery } from '@apollo/client';
import SpaceRow from './components/spaceRow';

interface propsApp {
	description: string;
	date: number;
	name: string;
	results: string;
	characters: string;
	launches: string;
	missions: string;
	map: string;
}
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
`;

// type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

// const App = React.forwardRef<HTMLButtonElement, Props>({props: propsApp}) =>

const App = (props: propsApp,): JSX.Element => {
	const { data, loading, error } = useQuery<propsApp>(GET_MISSION);
	if (error) return <h1>error</h1>;


	return (
		<div className='mainContainer'>
			<Table striped bordered hover variant='dark'>
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
						data!.launches.map(
							({
								launch_date_utc,
								mission_name,
								description,
							}: {
								launch_date_utc: number;
								mission_name: string;
								description: string;
							}) => (
								<SpaceRow
									launch_date_utc={launch_date_utc}
									mission_name={mission_name}
									description={description}
								/>
							)
						)
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default App;
