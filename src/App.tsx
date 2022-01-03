import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { gql, useQuery } from '@apollo/client';
import Header from './components/Header/header';
import { GET_MISSION } from './getMission';
import SpaceRow from './components/containerRow/Row/row';

interface ILaunch {
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	description: string[];
	id: number;
	found: boolean[];
}

interface MyState {
	launches: ILaunch[];
	missions: { id: string; description: string[] }[];
	found: boolean[];
}
// description: string

interface IState extends ILaunch {
	description: string[];
	found: boolean[];
}

function App(): JSX.Element {
	const [state, setState] = useState<IState[]>([]);

	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);

	useEffect(() => {
		if (data) {
			const normalizedData = data.launches.map((launch) => {
				const found = data.missions.map((mission: { id: string }) =>
					launch.mission_id.includes(mission.id)
					);
					// setState(found)
					return { ...launch };
				});
			setState(normalizedData);
		}
	}, [data]);

	if (error) return <h1>error</h1>;

	return (
		<Table striped bordered hover>
			<Header />
			{loading ? (
				<h1>loading...</h1>
			) : (
				data!.launches.map(
					({ launch_date_utc, mission_name, mission_id, description, id }) => (
						<SpaceRow
							key={id}
							launch_date_utc={launch_date_utc}
							mission_name={mission_name}
							description={description}
							mission_id={mission_id}
							id={id}
						/>
					)
				)
			)}
			)
		</Table>
	);
}

export default App;
