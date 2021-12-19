import React from 'react';

function Row(props: string | number | any) {
	return (
		<>
			<tr>
				<td>1</td>
				<td>{props.date}</td>
				<td>{props.nameMission}</td>
				<td>{props.description}</td>
			</tr>
		</>
	);
}

export default Row;