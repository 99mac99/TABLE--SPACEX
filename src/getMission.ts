import { gql } from '@apollo/client';

export const GET_MISSION = gql`
	 {
		launches(limit: 10) {
			mission_id
			launch_date_utc
			mission_name
		}
		missions {
			id
			description
		}
	}
`;


