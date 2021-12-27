import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { gql, MissingFieldError, useQuery } from '@apollo/client';
import Header from './components/Header/header';
import SpaceRow from './components/containerRow/containerRow';
import { GET_MISSION } from './getMission';

type MyProps = {
	flights?:
		| {
				id: number;
				date: number;
				nameMission: string;
				description: string;
		  }
		| any[]
		| undefined;
};

interface MyState {
	flights: {
		id: number;
		date: number;
		nameMission: string;
		description: string;
	}[];
	description: string;
	date: number;
	name: string;
	results: string;
	characters: string;
	launches: {
		mission_id: string[];
		launch_date_utc: number;
		mission_name: string;
		description: string;

		id: number;
	}[];
	missions: { id: string; description: string }[];
	loading: string;
	data: {
		missions: { id: string; description: string }[];
		launch: { mission_id: string[] }[];
	};
	// | any[]
	// | undefined;
}

function App(MyState: any): JSX.Element {
	const [state, setState] = useState();

	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);
	console.log('bycz', data);
	useEffect(() => {
		if (data) {
			console.log('bycz', data);
			const normalizedData = data.launches.map((launch) => {
				console.log('-----', launch);

				const found = data.missions.find((mission: { id: string }) =>
					launch.mission_id.includes(mission.id)
				);

				return { ...launch };
			});

			console.log(normalizedData);
			//setState(normalizedData);
		}
	}, [data]);
	if (error) return <h1>error</h1>;

	return (
		<Table striped bordered hover>
			<Header />
			{loading ? (
				<p>loading...</p>
			) : (
				data!.launches.map(
					({ launch_date_utc, mission_name, description, mission_id, id }) => (
						<SpaceRow
							launch_date_utc={launch_date_utc}
							mission_name={mission_name}
							description={description}
							mission_id={mission_id}
							id={id}
						/>
					)
				)
			)}
		</Table>
	);
}

export default App;

function find(): (value: never, index: number, array: never[]) => unknown {
	throw new Error('Function not implemented.');
}
// [x: string]: any;
// constructor(props: MyState) {
// 	super(props);
// 	this.state = {
// 		flights: [
// 			{
// 				id: 1,
// 				date: 2137,
// 				nameMission: 'Lot na marsa',
// 				description: 'Super lot',
// 			},
// 			{
// 				id: 2,
// 				date: 2138,
// 				nameMission: 'Sot na marsa',
// 				description: 'Super odlot',
// 			},
// 			{
// 				id: 3,
// 				date: 2139,
// 				nameMission: 'Bot na marsa',
// 				description: 'Super lot',
// 			},
// 			{
// 				id: 4,
// 				date: 2131,
// 				nameMission: 'Aot na marsa',
// 				description: 'Super lot',
// 			},
// 			{
// 				id: 5,
// 				date: 2136,
// 				nameMission: 'Cot na marsa',
// 				description: 'Super lot',
// 			},
// 		],
// 	};
// }

// GET_MISSION = gql`
// 	{
// 		missions {
// 			description
// 		}
// 		launches {
// 			mission_name
// 		}
// 	}
// `;

//  newNameMission: string[] = [...this.state.flights?.nameMission]

// filtrHandler(letters: any) {
// 	const flights = this.state.flights[2].nameMission.sort(function (
// 		a: { nameMission: string },
// 		b: { nameMission: string }
// 	) {
// 		if (a.nameMission.toLowerCase() < b.nameMission.toLowerCase()) return -1;
// 		if (a.nameMission.toLowerCase() > b.nameMission.toLowerCase()) return 1;
// 		return 0;
// 	}).map;
// }

// const spaceFlights = {
// 	flights: this.state.flights
// }

// interface propsApp {
// 	description: string;
// 	date: number;
// 	name: string;
// 	results: string;
// 	characters: string;
// 	launches: [];
// 	missions: string;
// }
// const GET_MISSION = gql`
// 	{
// 		missions {
// 			description
// 		}
// 		launches {
// 			launch_date_utc
// 			mission_name
// 		}
// 	}
// `;

// type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

// const App = React.forwardRef<HTMLButtonElement, Props>({props: propsApp}) =>

// const App = (props: propsApp): JSX.Element => {
// 	const { data, loading, error } = useQuery<propsApp, {}>(GET_MISSION);
// 	if (error) return <h1>error</h1>;

// 	return (
// 		<div className='mainContainer'>
// 			<Table striped bordered hover variant='dark'>
// 				<thead>
// 					<tr>
// 						<th className='rowHead'>Nazwa misji</th>
// 						<th className='rowHead'>Data</th>
// 						<th className='rowHead'>Opis</th>
// 						<th className='rowHead'>Ulubiony</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{loading ? (
// 						<p>loading...</p>
// 					) : (
// 						data!.launches.map(
// 							({
// 								launch_date_utc,
// 								mission_name,
// 								description,
// 							}:{launch_date_utc: number, mission_name: string, description: string}) => (
// 								<SpaceRow
// 									launch_date_utc={launch_date_utc}
// 									mission_name={mission_name}
// 									description={description}
// 								/>
// 							)
// 						)
// 					)}
// 				</tbody>
// 			</Table>
// 		</div>
// 	);
// };
