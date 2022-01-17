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
import { GET_MISSION } from './getMission';
import styles from './headers.module.css';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ILaunch {
	index: number;
	id: string;
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	description: string[];
}

interface IMission {
	index: number;
	id: string;
	description: string[];
}
interface MyState {
	index: number;
	id: string;
	launches: ILaunch[];
	missions: IMission[];
}

interface IState extends ILaunch {
	index: number;
	id: string;
	missions: (IMission | undefined)[];
}

function App(): JSX.Element {
	const [state, setState] = useState<IState[]>([]);
	const [sortKey, setSortKey] = useState<SortKeys>('id');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);
	const [check, setCheck] = useState(new Array(10).fill(false));

	const sortedData = useCallback(
		() =>
			sortData({ tableData: state, sortKey, reverse: sortOrder === 'desc' }),
		[state, sortKey, sortOrder]
	);

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

	type Data = typeof state;
	type SortKeys = keyof Data[0];
	type SortOrder = 'ascn' | 'desc';

	const headers: { key: SortKeys; label: string }[] = [
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
			<Button
				className={`${styles.button} bi bi-arrow-down-up btn-sm`}
				onClick={onClick}
			></Button>
		);
	}

	function changeSort(key: SortKeys) {
		setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
		setSortKey(key);
	}

	const handleOnChange = (position: number | string) => {
		const updatedCheckedState = check.map((item, index) =>
			index === position ? !item : item
		);
		setCheck(updatedCheckedState);
		console.log(updatedCheckedState);

		// const addDataIntoCache = updatedCheckedState.filter(( item, index) => item === true ? position : index


		// )
		// 	console.log(addDataIntoCache)
		// 	setCheck(addDataIntoCache)
		
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th className={`${styles.headers}`}>Ulubione</th>
					{headers.map((roww) => {
						return (
							<th key={roww.key}>
								{roww.label}{' '}
								<SortButton
									columnKey={roww.key}
									onClick={() => changeSort(roww.key)}
									{...{ sortOrder, sortKey }}
								/>
							</th>
						);
					})}
					<th className={`${styles.headers}`}>Opis</th>
				</tr>
			</thead>
			<tbody>
				{loading ? (
					<h1>loading...</h1>
				) : (
					sortedData().map(
						(
							{ launch_date_utc, mission_name, mission_id, description, id },
							index
						) => (
							<tr>
								<td>
									<div className={`${styles.headers}`}>
										<input
											// id={`custom-checkbox-${index}`}
											type='checkbox'
											checked={check[index]}
											onChange={() => handleOnChange(index)}

											// onChange={() => addDataIntoCache( 'cache') }
										></input>
									</div>
								</td>
								<td>{mission_name}</td>
								<td>{launch_date_utc}</td>
								<td>{description}</td>
							</tr>
						)
					)
				)}
			</tbody>
		</Table>
	);
}

export default App;


