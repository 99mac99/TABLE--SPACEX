import FavoriteHeader from './favoriteHeader/favoriteHeader';
import DescriptionHeader from './descriptionHeader/descriptionHeader';
import DateHeader from './dateHeader/DateHeader';
import NameHeader from './nameHeader/nameHeader';
import styles from './headers.module.css';
import { Button } from 'react-bootstrap';
import {useState,MouseEventHandler} from 'react'

interface ILaunch {
	id: string;
	mission_id: string;
	launch_date_utc: number;
	mission_name: string;
	description: string;
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

function Headers() {
	 
	const headers = [
		{key:'mission_name' , label: 'Nazwa'},
		{key: 'launch_date_utc' , label: 'data'}
	]

	return (
		<>
			<tr>
				<th>
					<FavoriteHeader />
				</th>
				{headers.map((row) => {
					return (
						<th key={row.key}>
							<div className={`${styles.headersBox}`}>
								<p className={`${styles.headers}`}></p>
								<Button 
									className={`${styles.button} bi bi-arrow-down-up btn-sm`}
								></Button>
							</div>
						</th>
					);
				})}
				<th>
					<DescriptionHeader />
				</th>
			</tr>
		</>
	);
}

export default Headers;

// <th><FavoriteHeader /><th/>
// <th><DateHeader /><th/>
// <th><DescriptionHeader /><th/>
