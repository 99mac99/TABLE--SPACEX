import { string, number } from 'prop-types';
import React, { Component } from 'react';
import { isThisTypeNode } from 'typescript';
import row from './Row/row';
import Row from './Row/row';

class SpaceRow extends Component {
		props: any;
		flights: string | number | undefined
		id!: number; 
	

	render(): JSX.Element {
		return (
			<tbody>
				{this.props.flights.map((row: any) => (
					<Row  key = {this.props.flights.id} {...Row} />
				))}
			</tbody>
		);
				}
	
}

// const  SpaceRow = (props:{flights: any[]}) => {
// }

export default SpaceRow;
