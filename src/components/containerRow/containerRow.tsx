import React from 'react';
import { isThisTypeNode } from 'typescript';
import Row from './Row/row';


const  SpaceRow = (props:{flights: any[]}) => {
	return (
		<tbody>
            {props.flights.map((row: any) => <Row  {...Row} /> )}
			<Row />
		</tbody>
	);
}

export default SpaceRow;
