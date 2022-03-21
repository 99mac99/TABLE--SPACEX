import Moment from 'react-moment';

function Date({launch_date_utc} : {launch_date_utc : number } ) {
	return (
		<>
			<td>
				<Moment  date={launch_date_utc} format='dd MM yyyy, HH:mm' />
			</td>
		</>
	);
}

export default Date;
