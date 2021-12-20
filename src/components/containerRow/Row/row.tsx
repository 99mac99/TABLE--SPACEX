import React from 'react';
import IconRow from './IconRow/IconRow';
import * as Icon from 'react-bootstrap-icons';



function Row(props: string | number | any) {
	return (
		<>
			<tr> 
				<td><IconRow /></td>
				<td>{props.date}</td>
				<td>{props.nameMission}</td>
				<td>{props.description}</td>
			</tr>
		</>
	);
}

export default Row;