import { gql, useQuery } from '@apollo/client';

export const GET_MISSION = gql`
	 {
		launches(limit: 10) {
			launch_date_utc
			mission_name
			mission_id
		}
		missions {
			id
			description
		}
	}
`;
