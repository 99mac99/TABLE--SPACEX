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
import Moment from 'react-moment';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

// import 'moment-timezone';

interface ILaunch {
	i: string  | number ;
	item: string[] | boolean | number;
	index: number;
	id: string;
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	description: string[];
}

interface IMission {
	i: string  | number ;
	rocket: any;
	item: string[] | boolean | number;
	index: number;
	id: string;
	description: string;
}
interface MyState {
	i: string  | number ;
	item: string[] | boolean | number;
	index: number;
	id: string;
	launches: ILaunch[];
	missions: IMission[];
}

interface IState extends ILaunch {
	i: string  | number ;
	item: string[] | boolean | number;
	index: number;
	id: string;
	missions: (IMission | undefined)[];
}

function App(): JSX.Element {
	const [state, setState] = useState<IState[]>([]);
	const [sortKey, setSortKey] = useState<SortKeys>('id');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);
	const [favorites, setFavorites] = useState([] as Array<number>);

	const sortedData = useCallback(
		() =>
			sortData({ tableData: state, sortKey, reverse: sortOrder === 'desc' }),
		[state, sortKey, sortOrder]
	);

	const getArray = JSON.parse(localStorage.getItem('favorites') || '0');
	useEffect(() => {
		if (getArray !== 0) {
			setFavorites([...getArray]);
		}
	}, []);

	useEffect(() => {
		if (data) {
			const normalizedData = data.launches.map((launch) => {
				const missions = launch.mission_id.map((id) =>
					data.missions.find((mission) => mission.id === id)
				);

				return { ...launch, missions };
			});
			setState(normalizedData);
			// console.log(normalizedData);
		}
	}, [data]);

	if (error) return <h1>error</h1>;

	type Data = typeof state;
	type SortKeys = keyof Data[0];
	type SortOrder = 'ascn' | 'desc';

	const headers: { key: SortKeys; label: string }[] = [
		{ key: 'mission_name', label: 'Nazwa' },
		{ key: 'launch_date_utc', label: 'Data' },
		// { key: 'i', label: 'Ulubione' },
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

	const addFav = (props: any) => {
		let array = favorites;
		let addArray = true;
		array.map((item: any, key: number) => {
			if (item === props.i) {
				array.splice(key, 1);
				addArray = false;
			}
		});
		if (addArray) {
			array.push(props.i);
		}
		setFavorites([...array]);
		localStorage.setItem('favorites', JSON.stringify(favorites));
		let storage = localStorage.getItem('favItem' + props.i || '0');
		if (storage === null) {
			localStorage.setItem('favItem' + props.i, JSON.stringify(props.items));
		} else {
			localStorage.removeItem('favItem' + props.i);
		}
		console.log(props.items);
		console.log(favorites);
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
							{
								launch_date_utc,
								mission_name,
								mission_id,
								description,
								id,
								missions,
							},
							i,
							items
						) => (
							<tr>
								<td>
									<div className={`${styles.headers}`}>
										{favorites.includes(i) ? (
											<IoIosHeart
												onClick={() => addFav({ items, i })}
												style={{ color: 'blue' }}
											/>
										) : (
											<IoIosHeartEmpty
												onClick={() => addFav({ items, i })}
												style={{ color: 'blue' }}
											/>
										)}
									</div>
								</td>
								<td>{mission_name}</td>
								<td>
									<Moment date={launch_date_utc} format='dd MM yyyy, HH:mm' />
								</td>
								<td width='50%'>
									{missions.map((rocket: any) => (
										<a>{rocket.description}</a>
									))}
								</td>
							</tr>
						)
					)
				)}
			</tbody>
		</Table>
	);
}

export default App;
