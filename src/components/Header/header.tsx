import React from 'react';
import Date from './Date/Date';
import NameMission from './NameMission/nameMission';

function Header() {
	return (
		<thead>
			<tr>
				<th>Ulubiony</th>
				<th>< NameMission /></th>
				<th><Date /></th>
				<th>Opis</th>
			</tr>
		</thead>
	);
}

export default Header;




// function Header() {
// 	return (
// 		<thead>
// 			<tr>
// 				<th>Ulubiony</th>
// 				<th><Date /></th>
// 				<th>< NameMission /></th>
// 				<th>Opis</th>
// 			</tr>
// 		</thead>
// 	);
// }

// export default Header;