import { string, number } from 'prop-types';
import React, { Component } from 'react';
import { isThisTypeNode } from 'typescript';
import row from './Row/row';
import Row from './Row/row';


class SpaceRow extends Component {
		id!: number;
		flights?: {
			id: number;
			date: number;
			nameMission: string;
			description: string;
			}  | any[] ;
		props: string | number | undefined | any


	render() {
		return (
			<tbody>
				{this.props.flights.map((Low: any) => (
					<Row  key = {this.props.flights.id} {...Low} />
				))}
			</tbody>
		);
				}
	
}

export default SpaceRow;
// const  SpaceRow = (props:{flights: any[]}) => {
// }


