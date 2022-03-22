import Favorites from './favorites/favorites';
import MissionName from './missionName/missionName';
import Date from './date/date';
import Description from './description/description';

interface ILaunch {
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	missions: (IMission | undefined)[];
}

interface IMission {
	id: string;
	description: string;
}

interface IState extends ILaunch {
	id: string;
	missions: (IMission | undefined)[];
}

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
