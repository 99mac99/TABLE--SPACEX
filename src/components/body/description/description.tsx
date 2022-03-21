interface ILaunch {
	id: string;
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	description: string[];
}

interface IMission {
	id: string;
	description: string;
}

interface IState extends ILaunch {
	id: string;
	missions: (IMission | undefined)[];
}

interface IDescription {
	missions: (IMission | undefined)[];
}

function Description({ missions }: IDescription) {
	return (
		<>
			<td width='50%'>
				{missions.map((rocket: any) => (
					<a>{rocket.description}</a>
				))}
			</td>
		</>
	);
}

export default Description;
