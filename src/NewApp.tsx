import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/client';
import { GET_MISSION } from './getMission';
import styles from './components/header/headers.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Body from './components/body/body';
import LoadingIcon from './components/body/loadingIcon/loadingIcon';
import FavoriteHeader from './components/header/favoriteHeader/favoriteHeader';
import DescriptionHeader from './components/header/descriptionHeader/descriptionHeader';
import { ISort, IState, MyState } from './components/interfaces/interfaces';

function NewApp() {
	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);
	const [state, setState] = useState<IState[]>([]);
	const [order, setOrder] = useState('ASC');

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

	const sortBy = (key: ' ' | keyof ISort) => {
		if (order === 'ASC') {
			const sorted = [...state].sort((a, b) => (a[key] > b[key] ? 1 : -1));
			setState(sorted);
			setOrder('DSC');
		}
		if (order === 'DSC') {
			const sorted = [...state].sort((a, b) => (a[key] < b[key] ? 1 : -1));
			setState(sorted);
			setOrder('ASC');
		}
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<FavoriteHeader />
					<th>
						<div className={`${styles.headersBox}`}>
							<p className={`${styles.headers}`}>Nazwa</p>
							<Button
								onClick={() => sortBy('mission_name')}
								className={`${styles.button} bi bi-arrow-down-up btn-sm`}
							></Button>
						</div>
					</th>
					<th>
						<div className={`${styles.headersBox}`}>
							<p className={`${styles.headers}`}>Data</p>
							<Button
								onClick={() => sortBy('launch_date_utc')}
								className={`${styles.button} bi bi-arrow-down-up btn-sm`}
							></Button>
						</div>
					</th>
					<DescriptionHeader />
				</tr>
			</thead>
			<tbody>
				{loading ? (
					<LoadingIcon />
				) : (
					state.map(
						({ mission_id, launch_date_utc, mission_name, missions, id }) => (
							<Body
								id={id}
								missions={missions}
								mission_id={mission_id}
								launch_date_utc={launch_date_utc}
								mission_name={mission_name}
							/>
						)
					)
				)}
			</tbody>
		</Table>
	);
}

export default NewApp;
