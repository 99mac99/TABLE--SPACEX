import { useState, useEffect } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import styles from '../../header/headers.module.css';


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
