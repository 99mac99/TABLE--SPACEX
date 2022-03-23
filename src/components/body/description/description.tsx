
import { IDescription } from '../../interfaces/interfaces'


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
