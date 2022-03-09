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
	description: string;
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

function App() {
	const [state, setState] = useState<IState[]>([]);
	const [sortKey, setSortKey] = useState<SortKeys>('id');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
	const { data, loading, error } = useQuery<MyState, {}>(GET_MISSION);

	const sortedData = useCallback(() =>
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

		const sortedState = state;

		const sortedData = sortedState.sort((a, b) => {
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

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<FavoriteHeader />
					{headers.map((roww) => {
						return (
							<th key={roww.key}>
								{roww.label}
								<SortButton
									columnKey={roww.key}
									onClick={() => changeSort(roww.key)}
									{...{ sortOrder, sortKey }}
								/>
							</th>
						);
					})}
					<DescriptionHeader />
				</tr>
			</thead>
			<tbody>
				{loading ? (
					<LoadingIcon />
				) : (
					sortedData().map(({ launch_date_utc, mission_name, missions}) => (
						<Body
							launch_date_utc={launch_date_utc}
							mission_name={mission_name}
							missions={missions}
							index={0}
							id={''}
							mission_id={[]}
							description={[]}
						/>
					))
				)}
			</tbody>
		</Table>
	);
}

export default App;
