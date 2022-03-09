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

function Description({ missions }: IState) {
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
