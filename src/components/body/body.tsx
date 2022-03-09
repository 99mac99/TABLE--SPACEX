
import Favorites from './favorites/favorites';
import MissionName from './missionName/missionName';
import Date from './date/date';
import Description from './description/description';

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

interface IState extends ILaunch {
	index: number;
	id: string;
	missions: (IMission | undefined)[];
}


function Body({
	launch_date_utc,
	mission_name,
	missions,
}: IState    
) {
	return (
		<>
			<tr>
				<Favorites mission_name={mission_name} />
				<MissionName mission_name={mission_name} />
				<Date launch_date_utc={launch_date_utc} />
                <Description missions={missions} index={0} id={''} mission_id={[]} launch_date_utc={0} mission_name={''} description={[]} />
			</tr>
		</>
	);
}

export default Body;
