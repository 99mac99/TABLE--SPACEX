import React, {
	useEffect,
	useState,
	useCallback,
	MouseEventHandler,
} from 'react';
import { Table, Button } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { useQuery } from '@apollo/client';
import { GET_MISSION } from './getMission';
import styles from './components/header/headers.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Body from './components/body/body';
import FavoriteHeader from './components/header/favoriteHeader/favoriteHeader';
import DescriptionHeader from './components/header/descriptionHeader/descriptionHeader';
import LoadingIcon from './components/body/loadingIcon/loadingIcon';
import Headers from './components/header/header';
import Description from './components/body/description/description';

interface ILaunch {
	id: string;
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	missions: (IMission | undefined)[];
}

interface IMission {
	id: string;
	description: string;
}
interface MyState {
	id: string | [];
	launches: ILaunch[];
	missions: IMission[];
}

interface IState extends ILaunch {
	id: string;
	missions: (IMission | undefined)[];
}

function NewApp() {
	const [state, setState] = useState<IState[]>([]);
	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);

	// useEffect ( () => {
	// 	if (data) {
	// 		const normalizedData = data.launches.map((launch) => {
	// 			const missions = launch.mission_id.map((id) =>
	// 				data.missions.find((mission) => mission.id === id)
	// 				);
	// 				return { ...launch, missions };
	// 			});
	// 			setState(normalizedData);

	// }, [data]);
	console.log('dane', state);

	useEffect(() => {
		if (data) {
			const normalizedData = data.launches.map((launch) => {
				const missions = launch.mission_id.map((id) =>
					data.missions.find((mission) => mission.id === id)
				);
				return { ...launch, missions };
			});
			setState(normalizedData);
		}
	}, [data]);

	if (error) return <h1>error</h1>;

	return (
		<Table striped bordered hover>
			<thead>
					<Headers	/>
			</thead>
			{loading ? (
				<LoadingIcon />
			) : (
				state.map(({ mission_id, launch_date_utc, mission_name, missions }) => (
					<tbody>
						<Body
							missions={missions}
							mission_id={mission_id}
							launch_date_utc={launch_date_utc}
							mission_name={mission_name}
						/>
					</tbody>
				))
			)}
		</Table>
	);
}

export default NewApp;
