import Favorites from './favorites/favorites';
import MissionName from './missionName/missionName';
import Date from './date/date';
import Description from './description/description';
import { ILaunch } from '../interfaces/interfaces'


function Body({ launch_date_utc, mission_name, missions}: ILaunch) {
	return (
		<>
			<tr>
				<Favorites mission_name={mission_name}  />
				<MissionName mission_name={mission_name}  />
				<Date launch_date_utc={launch_date_utc} />
				<Description  missions={missions} />
			</tr>
		</>
	);
}

export default Body;
