import React from 'react';
import { isThisTypeNode } from 'typescript';
import Row from './Row/row';


const  SpaceRow = () => {
	return (
		<tbody>
            {this.props.flights.map((row: any) => <Row  {...Row} /> )}
			<Row />
		</tbody>
	);
}

export default SpaceRow;
