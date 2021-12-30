import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { gql, useQuery } from '@apollo/client';
import Header from './components/Header/header';
import { GET_MISSION } from './getMission';
import SpaceRow from './components/containerRow/Row/row';

interface MyState {
	prevState: null;
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
}

function App(): JSX.Element {

	const [state, setState] = useState< null | any>([])

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
			setState(normalizedData);
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
					({  launch_date_utc, mission_name,  mission_id, description,id }) => (
						<SpaceRow
							key={id}
							launch_date_utc={launch_date_utc}
							mission_name={mission_name}
							description={description}
							mission_id={mission_id}
							id={id} />
					)
				)
			)}
		</Table>
	);
}

export default App;
