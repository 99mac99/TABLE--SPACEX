import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import styles from '../../header/headers.module.css';

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

function Favorites({ mission_name }: { mission_name: string }) {
	const [favorites, setFavorites] = useState([] as Array<string>);

	const getArray = JSON.parse(localStorage.getItem('favorites') || '0');

	useEffect(() => {
		if (getArray !== 0) {
			setFavorites([...getArray]);
		}
	}, []);

	const addFav = (id: string, isChecked: boolean = false) => {
		if (isChecked) {
			setFavorites([...favorites, id]);
			localStorage.setItem('favorites', JSON.stringify([...favorites, id]));
		} else {
			const filtered = favorites.filter((item) => item !== id);
			setFavorites(filtered);
			localStorage.setItem('favorites', JSON.stringify(filtered));
		}
	};

	return (
		<>
			<td>
				<div className={`${styles.headers}`}>
					{favorites.includes(mission_name) ? (
						<IoIosHeart
							onClick={() => addFav(mission_name)}
							style={{ color: 'blue' }}
						/>
					) : (
						<IoIosHeartEmpty
							onClick={() => addFav(mission_name, true)}
							style={{ color: 'blue' }}
						/>
					)}
				</div>
			</td>
		</>
	);
}

export default Favorites;
