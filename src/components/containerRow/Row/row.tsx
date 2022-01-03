import React from 'react';
import IconRow from './IconRow/IconRow';

function SpaceRow(props: any) {
	return (
		<>
			<tbody >
				<tr >
					<td>
						<IconRow />
					</td>
					<td>{props.launch_date_utc}</td>
					<td>{props.mission_name}</td>
					<td>{props.description}</td>
				</tr>
			</tbody>
		</>
	);
}

export default SpaceRow;
