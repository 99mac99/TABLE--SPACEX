import React, {
	useEffect,
	useState,
	useCallback,
	MouseEventHandler,
} from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { gql, useQuery } from '@apollo/client';
import Header from './components/Header/header';
import { GET_MISSION } from './getMission';
import SpaceRow from './components/containerRow/Row/row';
import IconRow from './components/containerRow/Row/IconRow/IconRow';
import styles from'./headers.module.css';
import { Button } from 'react-bootstrap';

interface ILaunch {
	id: string;
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	description: string[];
}

interface MyState {
	id: string;
	launches: ILaunch[];
	missions: { id: string; description: string[] }[];
}

interface IState extends ILaunch {
	id: string;
	description: string[];
}

function App(): JSX.Element {
	const [state, setState] = useState<IState[]>([]);
	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);
	const [sortKey, setSortKey] = useState<SortKeys>('id');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
	const sortedData = useCallback(
		() =>
			sortData({tableData: state, sortKey, reverse: sortOrder === 'desc' }),
		[state, sortKey, sortOrder]
	);

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
	
	type Data = typeof state;
	type SortKeys = keyof Data[0];
	type SortOrder = 'ascn' | 'desc';

	const headers: {key: SortKeys, label: string}[] = [
		{ key: 'mission_name', label: 'Nazwa' },
		{ key: 'launch_date_utc', label: 'Data' },
		// { key: 'description', label: 'Opis' },
	];
	
	function sortData({
		tableData,
		sortKey,
		reverse,
	}: {
		tableData: Data;
		sortKey: SortKeys;
		reverse: boolean;
	}) {
		if (!sortKey) return tableData;

		const sortedData = state.sort((a, b) => {
			return a[sortKey] > b[sortKey] ? 1 : -1;
		});

		if (reverse) {
			return sortedData.reverse();
		}

		return sortedData;
	}

	function SortButton({
		sortOrder,
		columnKey,
		sortKey,
		onClick,
	}: {
		sortOrder: SortOrder;
		columnKey: SortKeys;
		sortKey: SortKeys;
		onClick: MouseEventHandler<HTMLButtonElement>;
	}): JSX.Element {
		return (
			<Button className={`${styles.button} bi bi-arrow-down-up btn-sm`} onClick={onClick}></Button>

		);
	}

	function changeSort(key: SortKeys) {
			setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn')
			setSortKey(key);
	}

	
	return (
		<Table striped bordered hover>
			<thead >
				<tr >
					<th className = {`${styles.headers}`}>Ulubione</th>
					{headers.map((roww) => {
						return <th key={roww.key}  >{roww.label} <SortButton columnKey={roww.key}  onClick={() => changeSort(roww.key)} {...{sortOrder, sortKey}} /></th>;
					})}
					<th className = {`${styles.headers}`}>Opis</th>
				</tr>
			</thead>
			{loading ? (
				<h1>loading...</h1>
			) : (
				sortedData().map(
					({ launch_date_utc, mission_name, mission_id, description, id }) => (
						<tbody>
							<tr>
								<td>
									<IconRow />
								</td>
								<td>{mission_name}</td>
								<td>{launch_date_utc}</td>
								<td>{description}</td>
							</tr>
						</tbody>
					)
				)
			)}
		</Table>
	);
}

export default App;

{
	/* <SpaceRow
key={id}
launch_date_utc={launch_date_utc}
mission_name={mission_name}
description={description}
mission_id={mission_id}
id={id}
/> */
}

