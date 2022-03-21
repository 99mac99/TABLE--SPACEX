import FavoriteHeader from './favoriteHeader/favoriteHeader';
import DescriptionHeader from './descriptionHeader/descriptionHeader';
import DateHeader from './dateHeader/DateHeader';
import NameHeader from './nameHeader/nameHeader';

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

	return (
		<>
			<tr>
				<th>
					<FavoriteHeader />
				</th>
				<th>
					<NameHeader />
				</th>
				<th>
					<DateHeader />
				</th>
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
