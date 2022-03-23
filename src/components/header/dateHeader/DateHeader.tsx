import styles from '../headers.module.css';
import { Button } from 'react-bootstrap';

function DateHeader({sort}) {
	return (
		<>
					<th>
						<div className={`${styles.headersBox}`}>
							<p className={`${styles.headers}`}>Data</p>
							<Button
								onClick={() => sort('launch_date_utc')}
								className={`${styles.button} bi bi-arrow-down-up btn-sm`}
							></Button>
						</div>
					</th>
		</>
	);
}

export default DateHeader;
