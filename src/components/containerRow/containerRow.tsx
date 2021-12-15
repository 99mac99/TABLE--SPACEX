import React from 'react';
import { isThisTypeNode } from 'typescript';
import Row from './Row/row';


const  SpaceRow = (props:{flights: any[]}) => {
	return (
		<tbody>
            {props.flights.map((row: any) => <Row key={Row.id} {...Row} /> )}
			<Row />
		</tbody>
	);
}

export default SpaceRow;
